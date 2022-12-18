import {BlockExplorerRequestError} from '../../../errors';
import {RequestBuilder} from '../../../lib/request-builder';
import {ETHUnitConverter} from '../eth-unit-converter';
import {ETHBaseExplorer} from './eth-base.explorer';

type BalanceResponse = {
  message: string;
  result: string;
  status: '0' | '1';
};

export class BlockScoutExplorer extends ETHBaseExplorer {
  constructor() {
    super();
  }

  get endpoint() {
    return `https://blockscout.com/eth/mainnet/api`;
  }

  async getBalance(address: string): Promise<string> {
    const data = await new RequestBuilder()
      .url(this.endpoint)
      .param('module', 'account')
      .param('action', 'balance')
      .param('address', address)
      .header('accept', 'application/json')
      .header('Cookie', 'network=mainnet')
      .get<BalanceResponse>();

    this.handleRequestError(data.status, data.message);

    const wei = Number(data.result);
    return ETHUnitConverter.toEther(wei).toString();
  }

  private handleRequestError(status: string, message: string) {
    if (status === '0') {
      throw new BlockExplorerRequestError('eth', 'BlockScout', message);
    }
  }
}
