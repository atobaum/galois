import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import TagInput from "../common/TagInput";
import ContentTypeSelect from "../common/ContentTypeSelect";
import ContentType from "../../types/content-type";

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
  const [type, setType] = useState<ContentType>(zettel.contentType);

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
      <ContentTypeSelect onChange={setType} contentType={type} />
      <button
        onClick={() => {
          onEdit({
            content,
            tags,
            title,
            contentType: type,
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default BigZettelEditor;
