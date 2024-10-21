import ServerError from "./ServerError";

export default class ServerItemExistError extends ServerError {
  constructor(message: string) {
    super(message);
    this.name = "ServerItemExistError";
  }
}
