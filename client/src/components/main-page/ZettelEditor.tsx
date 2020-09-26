import React, { forwardRef, useImperativeHandle, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "../Tag";

const ZettelEditorCss = css``;

type ZettelEditorProps = {
  title: string | null;
  content: string | null;
  tags: string[];
  ref: React.Ref<any>;
  onSubmit: (args: any) => void;
};

const ZettelEditor: React.FC<ZettelEditorProps> = forwardRef(
  (
    {
      title: originalTitle,
      content: originalContent,
      tags: originalTags,
      onSubmit,
    },
    ref
  ) => {
    const [title, setTitle] = useState(originalTitle || "");
    const [content, setContent] = useState(originalContent || "");
    const [tags, setTags] = useState(originalTags);
    const [tagInput, setTagInput] = useState("");
    useImperativeHandle(ref, () => ({
      getData(): { title: string; content: string; tags: string[] } {
        return { title: title.trim().replace(/\s/, " "), content, tags };
      },
    }));

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
      <div css={ZettelEditorCss}>
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            if (content.trim().length === 0) return;
            onSubmit({
              content: content.trim(),
              tags,
            });
            setContent("");
          }}
        >
          <input onChange={(e) => setTitle(e.target.value)} value={title} />
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type content..."
            rows={4}
          />
          <div
            css={css`
              display: flex;
              span {
                padding: 0 15px;
              }
              input {
                flex-grow: 1;
              }
            `}
          >
            {tags.map((tag) => (
              <Tag
                key={tag}
                onClick={() => {
                  setTags(tags.filter((t) => t !== tag));
                }}
                name={tag}
              />
            ))}
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagOnKeypress}
              placeholder="Type tag..."
            />
          </div>
        </form>
      </div>
    );
  }
);

export default ZettelEditor;
