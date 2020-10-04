import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux";
import { closeToast } from "../redux/modules/toast";

const ToastCss = css`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  background: yellow;
  width: 200px;
  height: 100px;
  padding: 1rem;
  border-radius: 1rem;

  display: grid;
  grid-template-rows: min-content 1fr;
  transition: transform 0.5s ease-in-out;

  button {
    justify-self: flex-end;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const Toast: React.FC = () => {
  const state = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();
  return (
    <div
      css={css`
        ${ToastCss}
        transform: translateY(${state.visible ? "0" : "200px"});
      `}
    >
      <button onClick={() => dispatch(closeToast())}>X</button>
      <section>{state.message}</section>
    </div>
  );
};

export default Toast;
