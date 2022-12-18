import fetch, {RequestInit} from 'node-fetch';
import {InvalidRequestBodyError, InvalidRequestURLError} from '../errors';

/**
 * RequestBuilder allows to easily build minimal requests fast
 */
export class RequestBuilder {
  constructor() {
    return this;
  }

  private _url = '';
  private fetchOpts: RequestInit = {
    method: 'GET',
  };

  /**
   * Set request's URL
   *
   * @param url target to whom make the request
   * @returns
   */
  url(url: string) {
    this._url = url;
    return this;
  }

  /**
   * Perform GET request
   * @returns
   */
  async get() {
    this.fetchOpts.method = 'GET';
    return this.execute();
  }

  /**
   * Perform POST request
   * @returns
   */
  async post() {
    this.fetchOpts.method = 'POST';
    return this.execute();
  }

  /**
   * Perform PUT request
   * @returns
   */
  async put() {
    this.fetchOpts.method = 'PUT';
    return this.execute();
  }

  /**
   * Perform DELETE request
   * @returns
   */
  async delete() {
    this.fetchOpts.method = 'DELETE';
    return this.execute();
  }

  /**
   * URL must be validated, invalid URL will result in failure
   */
  private validateURL() {
    if (!this.url) throw new InvalidRequestURLError();
  }

  /**
   * POST / PUT request should have request body,
   * it must validated these type of request to ensure they are correct
   * @returns
   */
  private validateBody() {
    const isGet = this.fetchOpts.method !== 'GET';
    const isDelete = this.fetchOpts.method !== 'DELETE';
    if (!isGet || !isDelete) {
      return;
    }
    const isObj = typeof this.fetchOpts.body === 'object';
    if (!isObj && !this.fetchOpts.body) throw new InvalidRequestBodyError();
  }

  /**
   * Executes request to target URL
   * @returns
   */
  private async execute() {
    this.validateURL();
    this.validateBody();

    const opts: RequestInit = {};
    return await fetch(this._url, opts);
  }
}
