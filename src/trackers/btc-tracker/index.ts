import BaseTracker, {TrackerOptions} from '../base-tracker';
import {BTCBaseExplorer} from './explorers/btc-base.explorer';

type BTCOptions = {
  explorer: BTCBaseExplorer;
};

export class BTCTracker extends BaseTracker {
  constructor(opts: TrackerOptions, btcOpts: BTCOptions) {
    super(opts);
    this.btcOpts = btcOpts;
  }

  private btcOpts: BTCOptions;

  async checkBalance(): Promise<string> {
    return this.btcOpts.explorer.getBalance(this.options.address);
  }
}
