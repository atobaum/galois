import React, { useEffect } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ContentEditor from "./ContentEditor";
import ContentType from "../../../../types/content-type";
import { TextField } from "@material-ui/core";

const BookmarkEditorCss = css``;

type EditorProps = {
  content: string;
  setContent: (content: string) => void;
  meta: { renderer?: ContentType; url?: string };
  setMeta: (meta: any) => void;
};

const BookmarkEditor: React.FC<EditorProps> = ({
  content,
  setContent,
  meta,
  setMeta,
}) => {
  useEffect(() => {
    setMeta({ url: "", renderer: ContentType.PLAIN, ...meta });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.warn("BookmarkEdotor is deprecated");
  }, []);

  return (
    <div css={BookmarkEditorCss}>
      <TextField
        label="Url"
        required={true}
        value={meta.url}
        onChange={(e) => setMeta({ ...meta, url: e.target.value })}
      />
      <ContentEditor
        content={content}
        setContent={setContent}
        meta={meta}
        setMeta={setMeta}
      />
    </div>
  );
};

export default BookmarkEditor;
