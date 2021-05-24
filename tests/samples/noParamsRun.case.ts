import { MrUseCase } from '../../src';

export class NoParamsRunCase extends MrUseCase<null, null>() {
  protected async process() {}
}
