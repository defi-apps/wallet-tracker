import {NotImplementedError} from '../../../errors';

export type ETHTokenBalance = {
  balance: string;
  name: string;
  symbol: string;
};

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
  async getTokens(address: string): Promise<ETHTokenBalance[]> {
    throw new NotImplementedError();
  }
}
