# Mr.UseCase

![Node.js CI Tests](https://github.com/IlyaDonskikh/mr-use-case/actions/workflows/node.js.yml/badge.svg?branch=master)

A perfect way to wrap your business logic fast and properly.

## Introduction

> These use cases orchestrate the flow of data to and from the entities, and direct those entities to use their Critical Business Rules to achieve the goals of the use case.

[📖 Clean Architecture book](http://www.plainionist.net/Clean-Architecture/)

The UseCase layer allows you to achieve significant benefits in the following parts of writing code:

- Make development process clear for all participants
- Speed up the development of production-ready projects
- Avoid complexity
- Reduce coupling

So, developers and use cases have to be friends🤝 forever at least for reasons outlined above.

## Overview

In the section we observe simple use case that give us an information about the structure of the `Mr.UseCase` and its implementation. Let's take a quick look on following example to understand how the module works.

```typescript
import { MrUseCase } from 'mr-use-case';
import { User } from '$path';
import { isEmail } from '$path';

interface Request {
  email: string;
}

interface Response {
  user: User;
}

export class UserCreateCase extends MrUseCase<Request, Response>() {
  private position: UserPosition;

  // process

  async process() {
    await this.assignVariables();

    await this.validate(); // it calls checks section

    const user = await User.create({
      email: this.request.email,
      positionId: this.position.id,
    });

    this.response = { user };
  }

  // private

  protected async checks() {
    if (!this.request.email) {
      this.errors.add('email', 'presence');
    }

    if (!isEmail(this.request.email)) {
      this.errors.add('email', 'format');
    }

    if (!this.position) {
      this.errors.add('email', 'positionFind');
    }
  }

  private async assignVariables() {
    this.position = await findAvailablePosition();
  }

  private async findAvailablePosition() {
    // ...
  }
}
```

As you can see, the code is split into four parts:

1. Assigning a variable area
2. Validation
3. Execution
4. Packing response

Now let's see how we may use it in the positive scenario:

```typescript
const email = 'example@example.com';
const { user } = await UserCreateCase.call({ email });

return user; // => created user
```

However, what happens if the passed value is not an email? Let's change our code and see.

```typescript
const email = 'wrongemail';

try {
  const { user } = await UserCreateCase.call({ email });
} catch (err) {
  if (err instanceof MrError) {
    debug(err.errors.messages());

    return;
  }

  throw err;
}
```

> In this scenario we got an errors which is an instance of the MrError module. You may read more about the module at [MrError page](https://github.com/IlyaDonskikh/mr-error).

Keep in mind that use case must be designed in the way to fullfil only one business purpose. And after the call, give a straight answer about the success of this operation.

Let's make a conclusion.

> ⚠️ At this moment you probably would like to see integration of the module to something more ready to use and specially for the purpose [🐨Mr.Koa boilerplate](https://github.com/IlyaDonskikh/mrkoa) exists.

## Conclusion

The use cases make your work much simpler, structured and efficient. And `Mr.UseCase` pleasantly provide an interface to use the advantages with no headache.

Give it a try!
