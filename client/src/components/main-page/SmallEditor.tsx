import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import TagList from "../common/TagList";
import { useDispatch } from "react-redux";
import { createZettelAction } from "../../redux/modules/zettel-grid";

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
  const [tagInput, setTagInput] = useState("");
  const dispatch = useDispatch();

  const handleTagOnKeypress: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key === "Enter" || evt.which === 13) {
      evt.preventDefault();
      const tag = tagInput.trim();
      if (tag.length === 0) return;
      setTags([...tags, tag]);
      setTagInput("");
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
            <TagList
              tags={tags}
              onTagClick={(name) => setTags(tags.filter((tag) => tag !== name))}
            />
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
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
