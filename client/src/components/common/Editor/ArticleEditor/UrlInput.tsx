import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { EditorCompoenentInput } from "../@types";

const UrlInputCss = css``;

const UrlInput: EditorCompoenentInput<"register"> = ({ register }) => {
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
