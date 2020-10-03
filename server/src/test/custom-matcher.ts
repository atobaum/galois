import Either from "../lib/Either";
expect.extend({
  toBeRight(received) {
    if (!(received instanceof Either))
      return {
        pass: false,
        message: () =>
          `Expected value to be Either type: ${JSON.stringify(received)}`,
      };
    if (received.isRight)
      return {
        pass: true,
        message: () => `Expected value to be Left: ${JSON.stringify(received)}`,
      };
    else
      return {
        pass: false,
        message: () =>
          `Expected value to be Right: ${JSON.stringify(received)}`,
      };
  },

  toBeLeft(received) {
    if (!(received instanceof Either))
      return {
        pass: false,
        message: () =>
          `Expected value to be Either type: ${JSON.stringify(received)}`,
      };
    if (received.isLeft)
      return {
        pass: true,
        message: () =>
          `Expected value to be Right: ${JSON.stringify(received)}`,
      };
    else
      return {
        pass: false,
        message: () => `Expected value to be Left: ${received}`,
      };
  },
});
