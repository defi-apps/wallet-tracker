import BaseTracker, {TrackerOptions} from './base-tracker';
import * as xrpl from 'xrpl';
import {GetBalanceError} from '../errors';

export class XRPTracker extends BaseTracker {
  private readonly client: xrpl.Client;
  constructor(options: TrackerOptions) {
    super(options);
    this.client = new xrpl.Client(this.url, {});
  }

  async checkBalance(): Promise<string> {
    return await this.getXRPBalance();
  }

  async getXRPBalance() {
    await this.client.connect();
    try {
      const balance = await this.client.getXrpBalance(this.options.address);
      await this.client.disconnect();
      return balance;
    } catch (error: any) {
      await this.client.disconnect();
      throw new GetBalanceError(error.message, 'XRP');
    }
  }
}
