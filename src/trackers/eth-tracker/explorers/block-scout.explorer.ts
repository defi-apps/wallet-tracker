import {BlockExplorerRequestError} from '../../../errors';
import {RequestBuilder} from '../../../lib/request-builder';
import {ETHUnitConverter} from '../eth-unit-converter';
import {ETHBaseExplorer, ETHTokenBalance} from './eth-base.explorer';

type BalanceResponse = {
  message: string;
  result: string;
  status: '0' | '1';
};

type Token = {
  balance: string;
  contractAddress: string;
  decimals: string;
  name: string;
  symbol: string;
  type: string;
};
type TokenListResponse = {
  message: string;
  result: Token[];
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
      .query('module', 'account')
      .query('action', 'balance')
      .query('address', address)
      .get<BalanceResponse>();

    console.log({
      balances: data,
    });
    this.handleRequestError(data.status, data.message);

    const wei = Number(data.result);
    return ETHUnitConverter.toEther(wei).toString();
  }

  async getTokens(address: string): Promise<ETHTokenBalance[]> {
    const data = await new RequestBuilder()
      .url(this.endpoint)
      .query('module', 'account')
      .query('action', 'tokenlist')
      .query('address', address)
      .get<TokenListResponse>();

    console.log({
      tokens: data,
    });

    this.handleRequestError(data.status, data.message);
    return data.result.map(this.mapToETHBalance);
  }

  /**
   * Map properties that only will be needed
   * @param t
   * @returns
   */
  private mapToETHBalance(t: Token): ETHTokenBalance {
    const balance: ETHTokenBalance = {
      balance: ETHUnitConverter.toEther(Number(t.balance)).toString(),
      name: t.name,
      symbol: t.symbol,
    };
    return balance;
  }

  /**
   * Handle request that was returned successful but failed at provider service
   * @param status
   * @param message
   */
  private handleRequestError(status: string, message: string) {
    if (status === '0') {
      throw new BlockExplorerRequestError('eth', 'BlockScout', message);
    }
  }
}
