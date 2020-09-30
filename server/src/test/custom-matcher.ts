import Either from "../lib/Either";
expect.extend({
  toBeRight(received) {
    if (!(received instanceof Either))
      return {
        pass: false,
        message: () => "Expected value to be Either type",
      };
    if (received.isRight)
      return { pass: true, message: () => `Expected value to be Left` };
    else return { pass: false, message: () => `Expected value to be Right` };
  },

  toBeLeft(received) {
    if (!(received instanceof Either))
      return {
        pass: false,
        message: () => "Expected value to be Either type",
      };
    if (received.isLeft)
      return { pass: true, message: () => `Expected value to be Right` };
    else return { pass: false, message: () => `Expected value to be Left` };
  },
});
