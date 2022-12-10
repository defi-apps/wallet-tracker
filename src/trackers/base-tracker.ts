import {NotImplementedError} from '../errors';

type TrackerOptions = {
  host: string;
  port: string;
};

export default class BaseTracker {
  private readonly options: TrackerOptions;

  constructor(options: TrackerOptions) {
    this.options = options;
  }

  async track() {
    throw new NotImplementedError();
  }
}
