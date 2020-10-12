import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Tag from "./Tag";

const TagListCss = css`
  display: flex;
  align-items: center;
  span + span {
    margin-left: 10px;
  }
`;

const TagList: React.FC<{
  tags: string[];
  onTagClick?: (name: string) => void;
}> = ({ tags, onTagClick }) => {
  return (
    <div css={TagListCss}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
          name={tag}
        />
      ))}
    </div>
  );
};

export default TagList;
