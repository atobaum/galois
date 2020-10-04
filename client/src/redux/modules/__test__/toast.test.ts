import { ActionsObservable } from "redux-observable";
import { toastEpic } from "../toast";
import { fakeSchedulers } from "rxjs-marbles/jest";

const showAction = {
  type: "toast/SHOW_TOAST" as any,
  payload: {
    message: "testmsg",
  },
};
const closeAction = { type: "toast/CLOSE_TOAST" };
describe("toast epic", () => {
  beforeEach(() => jest.useFakeTimers());
  it("타이머 설정 안함", () => {
    const showAction$ = ActionsObservable.of(showAction);

    const spy = jest.fn();
    toastEpic(showAction$, {} as any, {}).subscribe(spy);
    expect(spy).not.toBeCalled();
  });

  it(
    "타이머 설정",
    fakeSchedulers((advance) => {
      const showAction$ = ActionsObservable.of({
        type: "toast/SHOW_TOAST" as any,
        payload: {
          message: "testmsg",
          time: 400,
        },
      });

      const spy = jest.fn();
      toastEpic(showAction$, {} as any, {}).subscribe(spy);
      expect(spy).not.toBeCalled();
      advance(300);
      expect(spy).not.toBeCalled();
      advance(200);
      expect(spy).toBeCalledWith(closeAction);
    })
  );
});
