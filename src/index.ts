import { MrError } from 'mr-error';

// have to define interface because declaration option is true
export interface MrUseCaseInterface<T, R> {
  new (params: T): {
    request: T;
    response: R;
    errors: MrError;
    validate(): Promise<void>;
  };
  call(...params: T extends object ? [T] : [undefined?]): Promise<R>;
}

export function MrUseCase<T extends object | null, R extends object | null>(
  { errorsBuilder }: { errorsBuilder: typeof MrError } = {
    errorsBuilder: MrError,
  },
): MrUseCaseInterface<T, R> {
  return class BaseUseCase {
    request: T = null as T;
    response: R = null as R;
    errors: MrError;

    constructor(params: T = {} as T) {
      this.request = params;
    }

    static call(params: T = {} as T) {
      const response = new this(params).call();

      return response;
    }

    // private

    // have to find out the way keep the function protected with declaration: true option
    async validate() {
      await this.checks();

      if (!this.isValid()) {
        throw this.errors;
      }
    }

    private async call() {
      this.errors = new errorsBuilder({
        localePath: this.buildLocalePath(),
      });

      await this.process();

      return this.response;
    }

    private buildLocalePath() {
      const className = this.constructor.name;
      const formattedClassName =
        className[0].toLowerCase() + className.slice(1);

      return `useCases.${formattedClassName}`;
    }

    private isValid() {
      return Object.keys(this.errors.errors).length === 0;
    }

    protected async checks() {}
    protected async process() {}
  };
}
