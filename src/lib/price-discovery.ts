import ccxt from 'ccxt';

type PriceTicker = {
  symbol: string;
  timestamp: number;
  datetime: string;
  bid: number;
  ask: number;
};

type SupportedExchanges = ccxt.binance | ccxt.kucoin;

export class PriceDiscovery {
  exchange: SupportedExchanges;

  constructor(exchange: SupportedExchanges) {
    this.exchange = exchange;
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

  static useBinance() {
    const exchange = new ccxt.binance();
    const instance = new PriceDiscovery(exchange);
    return instance;
  }

  static useKucoin() {
    const exchange = new ccxt.kucoin();
    const instance = new PriceDiscovery(exchange);
    return instance;
  }
}
