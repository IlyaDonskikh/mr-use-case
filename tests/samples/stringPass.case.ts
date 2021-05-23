import { MrUseCase } from '../../src';

interface Response {
  valueSquared: number;
}

export class StringPassCase extends MrUseCase<string, Response>() {}
