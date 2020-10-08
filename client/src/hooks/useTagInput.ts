import { useState } from "react";

// tag의 목록과 input을 관리한다.
export default function useTagInput(
  initialTags: string[] = []
): {
  tags: string[];
  tagInputValue: string;
  setTagInputValue: (value: string) => void;
  addTag: () => void;
  removeTag: (name: string) => void;
} {
  const [tags, setTags] = useState(initialTags);
  const [input, setInputValue] = useState("");

  const addTag = () => {
    const tag = input.trim();
    if (tag !== "") setTags([...tags, tag]);
    setInputValue("");
  };

  const removeTag = (name: string) => {
    setTags(tags.filter((t) => t !== name.trim()));
  };

  return {
    tags,
    tagInputValue: input,
    setTagInputValue: setInputValue,
    addTag,
    removeTag,
  };
  throw new Error();
}
