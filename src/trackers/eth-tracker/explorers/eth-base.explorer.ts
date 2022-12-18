import {NotImplementedError} from '../../../errors';

/**
 * Ethereum blockchain explorer base
 */
export class ETHBaseExplorer {
  /**
   * Get balance of eth address
   * @param address
   */
  async getBalance(address: string): Promise<string> {
    throw new NotImplementedError();
  }

  /**
   * Get tokens of address
   * @param address
   */
  async getTokens(address: string) {
    throw new NotImplementedError();
  }

  /**
   * Get balances of the tokens that is available for target address
   * @param address
   */
  async getTokenBalances(address: string) {
    throw new NotImplementedError();
  }
}
