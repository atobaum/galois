import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import TagList from "./TagList";
import { Input } from "@material-ui/core";

const TagInputCss = css`
  display: flex;
  .tag-input {
    margin-left: 1rem;
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
      <Input
        className="tag-input"
        placeholder="add tag..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleTagOnKeypress}
      />
    </div>
  );
};

export default TagInput;
