import {NotImplementedError} from '../errors';
import StringBuilder from '../lib/string-builder';

export type TrackerOptions = {
  host: string;
  port: string;
  method: 'wss' | 'https';
  address: string;
  accountId: string;
};

export default class BaseTracker {
  options: TrackerOptions;

  get hasPort() {
    return !!this.options.port;
  }

  get url(): string {
    return new StringBuilder()
      .add(this.options.method)
      .add('://')
      .add(this.options.host)
      .addIf(this.hasPort, ':')
      .addIf(this.hasPort, this.options.port)
      .text();
  }

  constructor(options: TrackerOptions) {
    this.options = options;
  }

  async checkBalance(): Promise<string> {
    throw new NotImplementedError();
  }
}
