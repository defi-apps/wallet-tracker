class BTCUnitConverter {
  static btc = 100_000_000;
  static toBitcoin(sat: number) {
    return sat / BTCUnitConverter.btc;
  }

  static toSat(btc: number) {
    return BTCUnitConverter.btc * btc;
  }
}

export default BTCUnitConverter;
