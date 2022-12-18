import BaseTracker, {TrackerOptions} from '../base-tracker';
import {ETHBaseExplorer} from './explorers/eth-base.explorer';

type ETHOptions = {
  explorer: ETHBaseExplorer;
};

export class ETHTracker extends BaseTracker {
  constructor(opts: TrackerOptions, ethOpts: ETHOptions) {
    super(opts);
    this.ethOpts = ethOpts;
  }

  private ethOpts: ETHOptions;

  async checkBalance(): Promise<string> {
    return this.ethOpts.explorer.getBalance(this.options.address);
  }
}
