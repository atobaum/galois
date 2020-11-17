import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const InputWrapperCss = css``;

const InputWrapper: React.FC<{ mandatory?: boolean; name: string }> = ({
  children,
  name,
}) => {
  return (
    <div css={InputWrapperCss}>
      <div>{name}</div>
      {children}
    </div>
  );
};

export default InputWrapper;
