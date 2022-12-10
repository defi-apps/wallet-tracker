export class GeneralError extends Error {
  errCode: string;
  constructor(message: string, errCode: string) {
    super(message);
    this.errCode = errCode;
  }
}

export class NotImplementedError extends GeneralError {
  constructor() {
    super('Not Implemented', 'ERR_1');
  }
}
