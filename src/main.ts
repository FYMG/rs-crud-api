import * as console from "node:console";
import * as dotenv from "dotenv";
import startServer from "./server";
import parseArgs from "./utils/helpers/parseArgs";

const args = parseArgs();

dotenv.config();

const PORT = process.env.PORT || 4000;

console.log(args);

startServer({
  multiThread: Boolean(args.multiThread),
  port: Number(PORT),
});
