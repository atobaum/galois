import { ActionsObservable } from "redux-observable";
import { closeToast, showToast, toastEpic, toastReducer } from "../toast";
import { fakeSchedulers } from "rxjs-marbles/jest";

describe("toast reducer", () => {
  it("init", () => {
    const state = toastReducer(undefined, {} as any);
    expect(state.visible).toBe(false);
  });

  it("shows toast", () => {
    const state = toastReducer(undefined, showToast("testmsg"));

    expect(state.visible).toBe(true);
    expect(state.message).toBe("testmsg");
  });

  it("closes toast", () => {
    let state = toastReducer(undefined, showToast("testmsg"));
    state = toastReducer(state, closeToast());

    expect(state.visible).toBe(false);
  });
});

const closeAction = { type: "toast/CLOSE_TOAST" };
describe("toast epic", () => {
  beforeEach(() => jest.useFakeTimers());
  it("타이머 설정 안함", () => {
    const showAction$ = ActionsObservable.of(showToast("testing"));

    const spy = jest.fn();
    toastEpic(showAction$, {} as any, {}).subscribe(spy);
    expect(spy).not.toBeCalled();
  });

  it(
    "타이머 설정",
    fakeSchedulers((advance) => {
      const showAction$ = ActionsObservable.of(showToast("test", 400));

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
