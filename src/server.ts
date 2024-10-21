import { t } from "./utils/loc";

export interface StartServerOptions {
  multiThread: boolean;
  port: number;
}

function startServer({ multiThread, port }: StartServerOptions) {
  console.log(
    t("server-started", {
      port: String(port),
      multiThread: String(multiThread),
    })
  );
}

export default startServer;
