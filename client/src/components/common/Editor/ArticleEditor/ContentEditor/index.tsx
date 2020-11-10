import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ContentTypeSelect from "../../../ContentTypeSelect";
import ContentType from "../../../../../types/content-type";
import { TextField } from "@material-ui/core";

const ContentEditorCss = css`
  display: flex;
  flex-direction: column;
`;

const ContentEditor: React.FC<{
  content: string;
  setContent: (v: string) => void;
  meta: { renderer?: ContentType };
  setMeta: (meta: any) => void;
}> = ({ content, setContent, meta, setMeta }) => {
  return (
    <div css={ContentEditorCss}>
      <ContentTypeSelect
        contentType={meta.renderer || ContentType.PLAIN}
        onChange={(type) => setMeta({ ...meta, renderer: type })}
      />
      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        label="Content"
        multiline
        rows={3}
        rowsMax={10}
      />
    </div>
  );
};

export default ContentEditor;
