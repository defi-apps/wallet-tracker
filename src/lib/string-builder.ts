export default class StringBuilder {
  private t = '';
  add(str: string) {
    this.t += str;
    return this;
  }
  addIf(condition: Function | boolean, str: string) {
    const isBoolean = typeof condition === 'boolean';
    const shouldAdd = (isBoolean && condition) || (!isBoolean && condition());
    if (shouldAdd) {
      this.t += str;
    }
    return this;
  }
  text() {
    return this.t;
  }
}
