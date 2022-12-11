export default class StringBuilder {
  private t = '';
  add(str: string | number | string[]) {
    this.#concatenate(str);
    return this;
  }

  #concatenate(str: string | number | string[]) {
    this.t += Array.isArray(str) ? str.join(' ') : str;
  }

  addIf(condition: Function | boolean, str: string | number | string[]) {
    const isBoolean = typeof condition === 'boolean';
    const shouldAdd = (isBoolean && condition) || (!isBoolean && condition());
    shouldAdd && this.#concatenate(str);
    return this;
  }
  text() {
    return this.t;
  }
}
