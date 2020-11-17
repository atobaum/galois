import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { EditorCompoenentInput } from "./@types";
import SourceType from "../../../../types/source-type";

const SourcePlaceholderMap: Record<SourceType, string> = {
  [SourceType.BOOK]: "책 정보...",
  [SourceType.URL]: "URL...",
};

const SourceInputCss = css``;

const SourceInput: EditorCompoenentInput<
  "register" | "watch",
  { defaultSource?: Source }
> = ({ register, watch, defaultSource }) => {
  const type: SourceType = watch(
    "meta.source.type",
    defaultSource?.type || SourceType.URL
  );
  const validator = () => true;

  return (
    <div css={SourceInputCss}>
      <select
        name="meta.source.type"
        ref={register}
        defaultValue={defaultSource?.type || SourceType.URL}
      >
        <option value={SourceType.BOOK}>Book</option>
        <option value={SourceType.URL}>URL</option>
      </select>

      <input
        name="meta.source.data"
        ref={register({ required: true, validate: validator })}
        placeholder={SourcePlaceholderMap[type]}
        defaultValue={defaultSource?.data || ""}
      />
    </div>
  );
};

export default SourceInput;
