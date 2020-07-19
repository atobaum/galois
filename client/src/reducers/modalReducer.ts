import { ReactElement } from "react";

const OPEN_MODAL = "modal/OPEN_MODAL" as const;
const CLOSE_MODAL = "modal/CLOSE_MODAL" as const;

export const openModal = (component: ReactElement) => ({
  type: OPEN_MODAL,
  payload: component,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

type ModalAction = ReturnType<typeof openModal> | ReturnType<typeof closeModal>;

type ModalState = {
  visible: boolean;
  component: ReactElement;
};

const initialState: ModalState = {
  visible: false,
  component: null,
};

export default function modalReducer(
  state: ModalState = initialState,
  action: ModalAction
): ModalState {
  switch (action.type) {
    case OPEN_MODAL:
      return { visible: true, component: action.payload };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
}
