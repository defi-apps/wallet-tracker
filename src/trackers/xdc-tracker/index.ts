import BaseTracker, {TrackerOptions} from '../base-tracker';
import {XDCBaseExplorer, XDCTokenBalance} from './explorers/xdc-base.explorer';

type XDCOptions = {
  explorer: XDCBaseExplorer;
};

export class XDCTracker extends BaseTracker {
  constructor(opts: TrackerOptions, xdcOpts: XDCOptions) {
    super(opts);
    this.xdcOpts = xdcOpts;
  }

  private xdcOpts: XDCOptions;

  async checkBalance(): Promise<string> {
    return this.xdcOpts.explorer.getBalance(this.options.address);
  }

  async checkTokenBalance(): Promise<XDCTokenBalance[]> {
    return await this.xdcOpts.explorer.getTokens(this.options.address);
  }
}
