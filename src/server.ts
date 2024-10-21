import * as http from "node:http";
import Router from "./routes";
import { t } from "./utils/loc";
import startCluster from "./cluster";

export interface StartServerOptions {
  multiThread: boolean;
  port: number;
}

function startServer({ multiThread, port }: StartServerOptions) {
  if (multiThread) {
    startCluster({
      port,
    });
  } else {
    const server = http.createServer((req, res) => {
      Router(req, res);
    });

    server.listen(port);
    console.log(
      t("server-started", {
        port: String(port),
        multiThread: String(multiThread),
      })
    );
  }
}

export default startServer;
