import React, { useRef, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Zettel } from "../../models/Zettel";
import Tag from "../Tag";

const ZettelViewCss = css`
  width: 100%;
`;

type ZettelViewProps = {
  onSubmit: (zettle: Pick<Zettel, "title" | "content" | "tags">) => void;
};
const ZettelView: React.FC<ZettelViewProps> = ({ onSubmit }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

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
    <div css={ZettelViewCss} className="zettel-view">
      {
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            if (content.trim().length === 0) return;
            onSubmit({
              content: content.trim(),
              title: title.trim(),
              tags,
            });
            setContent("");
            setTitle("");
            contentRef.current!.focus();
          }}
        >
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type content..."
            ref={contentRef as any}
            rows={4}
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Type title..."
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
              >
                {tag}
              </Tag>
            ))}
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagOnKeypress}
              placeholder="Type tag..."
            />
          </div>
          <button>Submit</button>
        </form>
      }
    </div>
  );
};

export default ZettelView;
