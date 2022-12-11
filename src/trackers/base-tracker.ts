import {NotImplementedError} from '../errors';

export type TrackerOptions = {
  host: string;
  port: string;
  method: 'wss' | 'https';
  address: string;
};

export default class BaseTracker {
  options: TrackerOptions;

  get url() {
    return `${this.options.method}://${this.options.host}:${this.options.port}`;
  }

  constructor(options: TrackerOptions) {
    this.options = options;
  }

  async subscribe() {
    throw new NotImplementedError();
  }

  async checkBalance(): Promise<string> {
    throw new NotImplementedError();
  }
}
