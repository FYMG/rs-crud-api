import * as http from 'node:http';
import { t } from './utils/loc';
import Router from './routes';

export interface StartServerOptions {
  multiThread: boolean;
  port: number;
}

function startServer({ multiThread, port }: StartServerOptions) {
  console.log(
    t('server-started', {
      port: String(port),
      multiThread: String(multiThread),
    })
  );

  if (multiThread) {
  } else {
    const server = http.createServer((req, res) => {
      Router(req, res);
    });

    server.listen(port);
  }
}

export default startServer;
