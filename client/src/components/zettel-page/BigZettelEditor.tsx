import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const BigZettelEditorCss = css``;

const BigZettelEditor: React.FC<{
  zettel: Zettel;
  onEdit: (data: Zettel) => void;
}> = ({ zettel, onEdit }) => {
  const [title, setTitle] = useState(zettel.title || "");
  //   const [tags, setTags] = useState(zettel.tags);
  const [content, setContent] = useState(zettel.content);

  return (
    <div css={BigZettelEditorCss}>
      <input onChange={(e) => setTitle(e.target.value)} value={title}></input>
      <textarea
        name=""
        rows={4}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button
        onClick={() => {
          onEdit(null as any);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default BigZettelEditor;
