import { IntegerSquareCase } from './samples/square.case';

describe('MrUseCase', () => {
  test('works', async () => {
    const value = 3;
    const { valueSquared } = await IntegerSquareCase.call({ value });

    expect(valueSquared).toEqual(value * value);
  });

  describe('when value is not integer', () => {
    it('reject with password confirmation error', async () => {
      const value = 3.2;

      const casePromise = IntegerSquareCase.call({ value });

      await expect(casePromise).rejects.toMatchObject({
        errors: { value: ['format'] },
      });
    });
  });
});
