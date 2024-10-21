import ServerDataNeedError from "../errors/ServerDataNeedError";
import { t } from "../loc";
import ServerInvalidJSONFormatError from "../errors/ServerInvalidJSONFormatError";

function parseRequest<T>(data: string): T {
  try {
    return JSON.parse(data);
  } catch (error: unknown) {
    if (!data) {
      throw new ServerDataNeedError(t("server-data-not-provided"));
    }
    throw new ServerInvalidJSONFormatError(t("server-invalid-json-format"));
  }
}

export default parseRequest;
