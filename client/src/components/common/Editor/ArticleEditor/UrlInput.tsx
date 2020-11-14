import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const UrlInputCss = css``;

const UrlInput: React.FC<{
  register: any;
}> = ({ register }) => {
  return (
    <div css={UrlInputCss}>
      <input
        name="meta.url"
        ref={register({ required: true })}
        placeholder="URL..."
      ></input>
    </div>
  );
};

export default UrlInput;
