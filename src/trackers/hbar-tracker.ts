import BaseTracker, {TrackerOptions} from './base-tracker';
import {
  Wallet,
  LocalProvider,
  AccountBalanceQuery,
  Client,
  AccountId,
} from '@hashgraph/sdk';
import {AccountIdNotSet, GetBalanceError} from '../errors';

export class HBARTracker extends BaseTracker {
  constructor(options: TrackerOptions) {
    super(options);
  }

  handleAccountIdNotSet() {
    const accountId = this.options.accountId;
    if (!accountId) {
      throw new AccountIdNotSet(HBARTracker.name);
    }
  }

  async checkBalance(): Promise<string> {
    const client = Client.forMainnet();
    const query = new AccountBalanceQuery();
    query.setAccountId(this.options.accountId);
    const accBalance = await query.execute(client);
    return accBalance.hbars.toBigNumber().toString();
  }
}
