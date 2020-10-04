import { Epic, ofType } from "redux-observable";
import { of, timer } from "rxjs";
import { delayWhen, filter, mapTo } from "rxjs/operators";

const SHOW_TOAST = "toast/SHOW_TOAST" as const;
const CLOSE_TOAST = "toast/CLOSE_TOAST" as const;

export const showToast = (message: string, time?: number) => ({
  type: SHOW_TOAST,
  payload: {
    message,
    time,
  },
});

export const closeToast = () => ({ type: CLOSE_TOAST });

type ToastState = {
  visible: boolean;
  message: string;
};

type ToastAction = ReturnType<typeof showToast> | ReturnType<typeof closeToast>;

export const toastReducer = (
  state: ToastState = { visible: false, message: "" },
  action: ToastAction
) => {
  switch (action.type) {
    case SHOW_TOAST:
      return { visible: true, message: action.payload.message };
    case CLOSE_TOAST:
      return { ...state, visible: false };
    default:
      return state;
  }
};

export const toastEpic: Epic<ToastAction> = ($action) =>
  $action.pipe(
    filter(
      (action) =>
        action.type === "toast/SHOW_TOAST" && action.payload.time !== undefined
    ),
    delayWhen((action: any) => timer(action.payload.time)),
    mapTo({ type: CLOSE_TOAST })
  );
