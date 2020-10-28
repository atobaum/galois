import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { showToast } from "../redux/modules/toast";
import { useDispatch } from "react-redux";

const LoginPageCss = css`
  display: grid;
  place-content: center;
  height: 100vh;
  grid-gap: 1rem;

  button {
    width: 5rem;
    height: 3rem;
    background-color: #95a89d;
  }
`;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div css={LoginPageCss}>
      <a
        href={
          (process.env.REACT_APP_API_URL || "") + "/api/auth/google/redirect"
        }
      >
        <button>로그인</button>
      </a>
      <button onClick={() => dispatch(showToast("아직 지원하지 않습니다."))}>
        회원가입
      </button>
    </div>
  );
};

export default LoginPage;
