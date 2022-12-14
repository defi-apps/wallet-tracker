import {
  InvalidRequestBodyError,
  InvalidRequestURLError,
  RequestBuilderError,
} from '../errors';

import axios, {RawAxiosRequestHeaders} from 'axios';

/**
 * RequestBuilder allows to easily build minimal requests fast
 */

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RequestOpts = {
  method: RequestMethod;
  data?: Object;
};
export class RequestBuilder {
  constructor() {
    return this;
  }

  private _url = '';
  private _params = '';
  private _sub = '';
  private _headers: RawAxiosRequestHeaders = {};
  private opts: RequestOpts = {
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

  private sanitizeUrl(url: string) {
    const endIndex = url.length - 1;
    return url.endsWith('/') ? url.slice(0, endIndex) : url;
  }

  /**
   * Sets header for request
   * @param header
   * @param value
   */
  header(header: string, value: string) {
    this._headers[header] = value;
    return this;
  }

  /**
   * Extend base path with resource
   * @param name
   * @returns
   */
  resource(name: string) {
    this._sub += !this._sub ? name : `/${name}`;
    return this;
  }

  /**
   * Extend base path with param
   * @param value
   */
  param(value: string | number) {
    this._sub += this._sub.endsWith('/') ? value : `/${value}`;
    return this;
  }

  /**
   * Perform GET request
   * @returns
   */
  async get<ResponseType>() {
    this.opts.method = 'GET';
    return await this.execute<ResponseType>();
  }

  /**
   * Perform POST request
   * @returns
   */
  async post() {
    this.opts.method = 'POST';
    return await this.execute();
  }

  /**
   * Perform PUT request
   * @returns
   */
  async put() {
    this.opts.method = 'PUT';
    return await this.execute();
  }

  /**
   * Perform DELETE request
   * @returns
   */
  async delete() {
    this.opts.method = 'DELETE';
    return await this.execute();
  }

  /**
   * Adds query into request string
   * @param paramName
   * @param paramValue
   */
  query(paramName: string, paramValue: string | number) {
    this._params +=
      this._params.length === 0
        ? `?${paramName}=${paramValue}`
        : `&${paramName}=${paramValue}`;
    return this;
  }

  /**
   * URL must be validated, invalid URL will result in failure
   */
  private validateURL() {
    if (!this._url) throw new InvalidRequestURLError();
  }

  /**
   * POST / PUT request should have request body,
   * it must validated these type of request to ensure they are correct
   * @returns
   */
  private validateData() {
    const isGet = this.opts.method !== 'GET';
    const isDelete = this.opts.method !== 'DELETE';
    if (!isGet || !isDelete) {
      return;
    }
    const isObj = typeof this.opts.data === 'object';
    if (!isObj && !this.opts.data) throw new InvalidRequestBodyError();
  }

  get finalUrl() {
    const e1 = this.sanitizeUrl(this._url);
    const e2 = this.sanitizeUrl(this._sub);
    const e3 = this.sanitizeUrl(`${e1}/${e2}`);
    return `${e3}${this._params}`;
  }

  /**
   * Executes request to target URL
   * @returns
   */
  private async execute<ResponseType>(): Promise<ResponseType> {
    this.validateURL();
    this.validateData();

    const instance = axios.create({});
    try {
      const res = await instance.request<ResponseType>({
        ...this.opts,
        url: this.finalUrl,
        headers: this._headers,
      });
      return res.data;
    } catch (error) {
      const e = error as Error;
      throw new RequestBuilderError(e.message);
    }
  }
}
