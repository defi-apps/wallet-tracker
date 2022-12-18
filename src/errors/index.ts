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

export class AccountIdNotSet extends GeneralError {
  currency: string;
  constructor(currency: string) {
    super('Cannot create tracker, account_id not provided', 'ERR_3');
    this.currency = currency;
  }
}

export class InvalidRequestURLError extends GeneralError {
  constructor() {
    super('Invalid url', 'ERR_4');
  }
}

export class InvalidRequestBodyError extends GeneralError {
  constructor() {
    super('Invalid payload', 'ERR_5');
  }
}

export class APIKeyNotSetError extends GeneralError {
  currency: string;
  explorer: string;
  constructor(currency: string, explorer: string) {
    super(
      `API key was not set, '${currency}' tracker requires API key in order to fetch ${explorer} data`,
      'ERR_6'
    );
    this.currency = currency;
    this.explorer = explorer;
  }
}

export class BlockExplorerRequestError extends GeneralError {
  currency: string;
  explorer: string;
  reason: string;
  constructor(currency: string, explorer: string, reason: string) {
    super(
      `Block explorer '${explorer}' for '${currency}' request failed, reason - '${reason}'`,
      'ERR_7'
    );
    this.currency = currency;
    this.explorer = explorer;
    this.reason = reason;
  }
}

export class InternalServerError extends GeneralError {
  constructor(reason: string) {
    super(reason, 'ERR_8');
  }
}

export class RequestBuilderError extends GeneralError {
  constructor(reason: string) {
    super(reason, 'ERR_9');
  }
}
