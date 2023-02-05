import {RequestBuilder} from '../../../lib/request-builder';
import BTCUnitConverter from '../btc-unit-converter';
import {BTCBaseExplorer} from './btc-base.explorer';

type BalanceResponse = {
  [address: string]: {
    final_balance: number;
    n_tx: number;
    total_received: number;
  };
};

export class BlockchainComExplorer extends BTCBaseExplorer {
  constructor() {
    super();
  }

  get endpoint() {
    return `https://blockchain.info/`;
  }

  async getBalance(address: string): Promise<string> {
    const data = await new RequestBuilder()
      .url(this.endpoint)
      .resource('balance')
      .query('active', address)
      .header('Accept-Encoding', '*')
      .get<BalanceResponse>();
    const balance = data[address].final_balance;
    const num = BTCUnitConverter.toBitcoin(balance);
    console.log({
      balance,
      num,
    });
    return num.toString();
  }
}
