import BaseTracker, {TrackerOptions} from './base-tracker';
import {AccountBalanceQuery, Client} from '@hashgraph/sdk';
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
    try {
      const accBalance = await query.execute(client);
      client.close();
      return accBalance.hbars.toBigNumber().toString();
    } catch (error) {
      const e = error as Error;
      client.close();
      throw new GetBalanceError(e.message, HBARTracker.name);
    }
  }
}
