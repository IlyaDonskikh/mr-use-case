import { MrUseCase } from '../../src';

class Request {
  value: number;
}

class Response {
  valueSquared: number;
}

export class IntegerSquareCase extends MrUseCase<Request, Response>() {
  protected async process() {
    await this.validate();

    const valueSquared = this.squareValue({ value: this.request.value });

    this.response = { valueSquared };
  }

  protected async checks() {
    if (!Number.isInteger(this.request.value)) {
      this.errors.add('value', 'format');
    }
  }

  private squareValue({ value }: { value: number }) {
    return value * value;
  }
}
