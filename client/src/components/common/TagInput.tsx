import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import TagList from "./TagList";

const TagInputCss = css`
  display: flex;
  .tag-input {
    border: none;
    padding: 0.2rem;
    margin-left: 1rem;
    box-shadow: 0 0 3px 2px #e3e3e3;
  }

  & * {
    font-size: 1rem;
  }
`;

const TagInput: React.FC<{
  tags?: string[];
  onChange: (tags: string[]) => void;
}> = ({ tags = [], onChange }) => {
  const [input, setInput] = useState("");
  const handleTagOnKeypress: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key === "Enter" || evt.which === 13) {
      evt.preventDefault();
      const tag = input.trim();
      if (tag.length > 0 && !tags.includes(tag)) onChange([...tags, tag]);
      setInput("");
    }
  };

  const onTagClick = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div css={TagInputCss}>
      <TagList tags={tags} onTagClick={onTagClick} />
      <input
        className="tag-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleTagOnKeypress}
        placeholder="Type tag..."
      />
    </div>
  );
};

export default TagInput;
