import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import TagList from "../common/TagList";
import { useDispatch } from "react-redux";
import { createZettelAction } from "../../redux/modules/zettel-grid";
import useTagInput from "../../hooks/useTagInput";

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
  const {
    tags,
    addTag,
    removeTag,
    tagInputValue,
    setTagInputValue,
  } = useTagInput();
  const dispatch = useDispatch();

  const handleTagOnKeypress: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key === "Enter" || evt.which === 13) {
      evt.preventDefault();
      addTag();
    }
  };
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
          <div className="flex">
            <TagList tags={tags} onTagClick={removeTag} />
            <input
              value={tagInputValue}
              onChange={(e) => setTagInputValue(e.target.value)}
              onKeyPress={handleTagOnKeypress}
              placeholder="Type tag..."
            />
          </div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SmallEditor;
