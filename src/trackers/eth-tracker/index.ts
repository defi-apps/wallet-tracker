import {APIKeyNotSetError} from '../../errors';
import {RequestBuilder} from '../../lib/request-builder';
import BaseTracker, {TrackerOptions} from '../base-tracker';
import {ETHUnitConverter} from './eth-unit-converter';

type ETHOptions = {
  API_KEY: string;
};

type BalanceResponse = {
  status: '0' | '1';
  message: string;
  result: string;
};

export class ETHTracker extends BaseTracker {
  constructor(opts: TrackerOptions, ethOpts: ETHOptions) {
    super(opts);
    this.ethOpts = ethOpts;
    this.validateETHOpts();
  }

  private validateETHOpts() {
    if (!this.ethOpts.API_KEY) {
      throw new APIKeyNotSetError('eth', 'etherscan.io');
    }
  }

  private ethOpts: ETHOptions;

  async checkBalance(): Promise<string> {
    const data = await new RequestBuilder()
      .url(`https://api.etherscan.io/api`)
      .param('module', 'account')
      .param('action', 'balance')
      .param('address', this.options.address)
      .param('tag', 'latest')
      .param('apikey', this.ethOpts.API_KEY)
      .get<BalanceResponse>();

    const wei = Number(data.result);

    return ETHUnitConverter.toEther(wei).toString();
  }
}
