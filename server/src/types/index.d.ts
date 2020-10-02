export {};
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeRight(): R;
      toBeLeft(): R;
    }
  }
}
