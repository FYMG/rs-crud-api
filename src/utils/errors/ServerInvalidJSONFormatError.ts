import ServerError from "./ServerError";

export default class ServerInvalidJSONFormatError extends ServerError {
  constructor(message: string) {
    super(message);
    this.name = "ServerInvalidJSONFormatError";
  }
}
