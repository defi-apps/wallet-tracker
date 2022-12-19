import {RequestBuilder} from '../../../lib/request-builder';
import {XDCBaseExplorer, XDCTokenBalance} from './xdc-base.explorer';

type AccountDetailsResponse = {
  minedBlock: number;
  rewardCount: number;
  logCount: number;
  transactionCount: number;
  transactionFromCount: number;
  transactionToCount: number;
  status: boolean;
  _id: string;
  hash: string;
  balance: string;
  balanceNumber: number;
  code: string;
  createdAt: string;
  isToken: false;
  updatedAt: string;
  fromTxn?: string;
  token?: string;
  contract?: string;
  hasXrc20: false;
  hasNft1155: false;
  hasXrc721: false;
  accountName?: string;
};

type TokenHoldersRequest = {
  total: number;
  perPage: number;
  currentPage: number;
  pages: number;
  items: [];
};

export class BlockScanExplorer extends XDCBaseExplorer {
  constructor() {
    super();
  }

  get endpoint() {
    return `https://xdc.blocksscan.io/api`;
  }

  async getBalance(address: string): Promise<string> {
    const data = await new RequestBuilder()
      .url(this.endpoint)
      .resource('accounts')
      .param(address)
      .header('Accept-Encoding', '*')
      .get<AccountDetailsResponse>();

    return data.balanceNumber.toString();
  }

  async getTokens(address: string): Promise<XDCTokenBalance[]> {
    const data = await new RequestBuilder()
      .url(this.endpoint)
      .resource('token-holders')
      .query('hash', address)
      .get<TokenHoldersRequest>();

    return data.items;
  }
}
