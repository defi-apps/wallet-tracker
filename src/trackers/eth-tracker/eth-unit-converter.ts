export class ETHUnitConverter {
  static toEther(wei: number) {
    return wei / 1e18;
  }
}
