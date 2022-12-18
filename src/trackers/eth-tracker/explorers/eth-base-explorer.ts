import {NotImplementedError} from '../../../errors';

export type ETHExplorerOptions = {};

/**
 * Ethereum blockchain explorer base
 */
export class ETHBaseExplorer {
  private opts: ETHExplorerOptions;
  constructor(opts: ETHBaseExplorer) {
    this.opts = opts;
  }

  /**
   * Get balance of eth address
   * @param address
   */
  async getBalance(address: string) {
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
