import { MrError } from 'mr-error';

// have to define interface because declaration option is true
interface MrUseCaseInterface<T, R> {
  new (params: T): {
    [key: string]: any;
    request: T;
    response: R;
    errors: MrError;
    validate(): Promise<void>;
  };
  call(params: T): Promise<R>;
}

export function MrUseCase<T, R>(): MrUseCaseInterface<T, R> {
  return class BaseUseCase {
    [key: string]: any;

    request: T;
    response: R;
    errors: MrError;
    protected errorsBuilder = MrError;

    constructor(params: T) {
      if (typeof params != 'object') {
        throw new Error();
      }

      this.request = params;
    }

    static call(params: T) {
      const instance = new this(params).call();

      return instance;
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
      this.errors = new this.errorsBuilder({
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
  };
}
