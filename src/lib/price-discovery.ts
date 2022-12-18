import ccxt from 'ccxt';

type PriceTicker = {
  symbol: string;
  timestamp: number;
  datetime: string;
  bid: number;
  ask: number;
};

export class PriceDiscovery {
  exchange: ccxt.binance;
  constructor() {
    this.exchange = new ccxt.binance();
  }

  async getTicker(symbol: string): Promise<PriceTicker> {
    const ticker = await this.exchange.fetchTicker(symbol);
    return {
      symbol: ticker.symbol,
      timestamp: ticker.timestamp,
      datetime: ticker.datetime,
      ask: ticker.ask,
      bid: ticker.bid,
    };
  }
}
