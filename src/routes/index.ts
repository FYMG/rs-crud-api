import { IncomingMessage, ServerResponse } from "http";
import { parse as urlParse } from "node:url";
import userRoutes from "./user-routes";

function Router(req: IncomingMessage, res: ServerResponse) {
  const url = urlParse(req.url || "", true);
  const pathname = url.pathname || "";
  const method = req.method || "";

  userRoutes({
    req,
    res,
    pathname,
    method,
  });
}

export default Router;
