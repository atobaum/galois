import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Input } from "@material-ui/core";
import { EditorCompoenentInput } from "./@types";
import TagList from "../TagList";

const TagInputCss = css``;

const TagInput: EditorCompoenentInput<
  "register" | "setValue" | "watch",
  { defaultValue?: string[] }
> = ({ register, setValue, watch, defaultValue = [] }) => {
  const [input, setInput] = useState("");
  const tags: string[] = watch("tags", [] as string[]);
  const handleTagOnKeypress: React.KeyboardEventHandler<HTMLInputElement> = (
    evt
  ) => {
    if (evt.key === "Enter" || evt.which === 13) {
      evt.preventDefault();
      const tag = input.trim();
      if (tag.length > 0 && !tags.includes(tag))
        setValue("tags", [...tags, tag]);
      setInput("");
    }
  };

  useEffect(() => {
    register("tags");
    setValue("tags", defaultValue);
  }, []);

  const onTagClick = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag)
    );
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
