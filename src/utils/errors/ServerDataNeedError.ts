export default class ServerDataNeedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerDataNeedError';
  }
}
