import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import TagInput from "../common/TagInput";

const BigZettelEditorCss = css`
  display: flex;
  flex-direction: column;
  & > * {
    margin: 0.3rem;
  }
`;

const BigZettelEditor: React.FC<{
  zettel: Pick<Zettel, "content" | "contentType" | "tags" | "title">;
  onEdit: (data: NewZettel) => void;
}> = ({ zettel, onEdit }) => {
  const [title, setTitle] = useState(zettel.title || "");
  const [tags, setTags] = useState(zettel.tags);
  const [content, setContent] = useState(zettel.content);

  return (
    <div css={BigZettelEditorCss}>
      <input onChange={(e) => setTitle(e.target.value)} value={title}></input>
      <TagInput tags={tags} onChange={setTags} />
      <textarea
        name=""
        rows={4}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button
        onClick={() => {
          onEdit({
            content,
            tags,
            title,
            contentType: zettel.contentType,
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default BigZettelEditor;
