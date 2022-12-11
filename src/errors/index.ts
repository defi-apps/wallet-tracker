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

export class GetBalanceError extends GeneralError {
  reason: string;
  currency: string;
  constructor(reason: string, currency: string) {
    super('Failed to retrieve balance', 'ERR_2');
    this.reason = reason;
    this.currency = currency;
  }
}
