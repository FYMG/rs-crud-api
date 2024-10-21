import * as dotenv from "dotenv";
import startServer from "./server";
import parseArgs from "./utils/helpers/parseArgs";

const args = parseArgs();

dotenv.config();

const PORT = process.env.PORT || 4000;

startServer({
  multiThread: Boolean(args.multiThread),
  port: Number(PORT),
});
