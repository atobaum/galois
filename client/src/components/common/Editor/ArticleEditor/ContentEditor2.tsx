import React, { useEffect } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ContentType from "../../../../types/content-type";
import { Select, TextField } from "@material-ui/core";
import { EditorCompoenentInput } from "../@types";

const ContentEditorCss = css`
  display: flex;
  flex-direction: column;
`;

const ContentEditor: EditorCompoenentInput<
  "register",
  { defaultValue?: string }
> = ({ register, defaultValue }) => {
  return (
    <div css={ContentEditorCss}>
      <Select native inputRef={register} name="meta.renderer" role="input">
        <option value={ContentType.PLAIN}>plain</option>
        <option value={ContentType.MARKDOWN}>markdown</option>
      </Select>

      <TextField
        defaultValue={defaultValue}
        name="content"
        inputRef={register}
        label="Content"
        multiline
        rows={3}
        rowsMax={10}
        placeholder="Type content..."
      />
    </div>
  );
};

export default ContentEditor;
