import ServerError from './ServerError';

export default class ServerNotFoundError extends ServerError {
  constructor(message: string) {
    super(message);
    this.name = 'ServerNotFoundError';
  }
}
