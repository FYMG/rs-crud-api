import { IncomingMessage, ServerResponse } from 'http';

export interface HandleRequestArgs {
  req: IncomingMessage;
  res: ServerResponse;
  pathname: string;
  method: string;
}

type HandleRequest = (args: HandleRequestArgs) => void;

export default HandleRequest;
