import { MrUseCase } from '../../src';

class Request {
  value: number;
}

class Response {
  valueSquare: number;
}

export class IntegerSquareCase extends MrUseCase<Request, Response>() {
  protected async process() {
    await this.validate();

    const value = this.request.value;

    this.response = {
      valueSquare: value * value,
    };
  }

  protected async checks() {
    if (!Number.isInteger(this.request.value)) {
      this.errors.add('value', 'format');
    }
  }
}
