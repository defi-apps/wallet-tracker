import {NotImplementedError} from '../../../errors';

/**
 * Ethereum blockchain explorer base
 */
export class BTCBaseExplorer {
  /**
   * Get balance of eth address
   * @param address
   */
  async getBalance(address: string): Promise<string> {
    throw new NotImplementedError();
  }
}
