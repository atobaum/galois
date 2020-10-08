import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useDispatch } from "react-redux";
import { createZettelAction } from "../../redux/modules/zettel-grid";
import TagInput from "../common/TagInput";

const SmallEditorCss = css`
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
    & > * {
      margin: 0.2rem 0;
    }
  }
`;

type SmallEditorProps = {};

const SmallEditor: React.FC<SmallEditorProps> = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useDispatch();

  return (
    <div css={SmallEditorCss}>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          if (content.trim().length === 0) return;
          dispatch(
            createZettelAction({
              title,
              content,
              contentType: "markdown",
              tags,
            })
          );
          setContent("");
        }}
      >
        <input
          placeholder="Type title..."
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type content..."
          rows={4}
        />
        <div>
          <TagInput tags={tags} onChange={setTags} />
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SmallEditor;
