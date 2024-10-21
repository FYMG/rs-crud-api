import cluster from "cluster";
import http, { IncomingMessage, ServerResponse } from "http";
import os from "os";
import * as console from "node:console";
import Router from "./routes";
import { t } from "./utils/loc";

interface WorkerInfo {
  pid: number;
  port: number;
  role: string;
}

function startCluster({ port }: { port: number }) {
  const numCPUs = os.cpus().length;
  const workerInfos: WorkerInfo[] = [];

  if (cluster.isPrimary) {
    console.log(
      t("server-started", {
        port: String(port),
        multiThread: String(true),
      })
    );
    workerInfos.push({ pid: process.pid, port, role: "Master" });

    for (let i = 0; i < numCPUs - 1; i = +1) {
      cluster.fork();
    }

    let currentWorker = 0;

    const loadBalancer = http.createServer(
      (req: IncomingMessage, res: ServerResponse) => {
        const workerPort = port + (currentWorker % (numCPUs - 1)) + 1;
        const options = {
          hostname: "localhost",
          port: workerPort,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };

        const proxy = http.request(options, (workerRes) => {
          res.writeHead(workerRes.statusCode!, workerRes.headers);
          workerRes.pipe(res, { end: true });
        });

        req.pipe(proxy, { end: true });
        currentWorker++;
      }
    );

    loadBalancer.listen(port, () => {
      workerInfos.push({ pid: process.pid, port, role: "Load Balancer" });
      console.table(workerInfos);
    });

    cluster.on("exit", () => {
      cluster.fork();
    });

    for (const id in cluster.workers) {
      if (cluster.workers[id]) {
        cluster.workers[id]!.on("message", (message) => {
          if (message.type === "workerInfo") {
            workerInfos.push({
              pid: message.pid,
              port: message.port,
              role: "Worker",
            });
            console.table(workerInfos);
          }
        });
      }
    }
  } else {
    const workerPort = port + cluster.worker!.id;
    const server = http.createServer(
      (req: IncomingMessage, res: ServerResponse) => {
        console.log(
          `Worker ${workerPort} port received request for ${req.url}`
        );
        Router(req, res);
      }
    );

    server.listen(workerPort, () => {
      process.send!({
        type: "workerInfo",
        pid: process.pid,
        port: workerPort,
        role: "Worker",
      });
    });
  }
}

export default startCluster;
