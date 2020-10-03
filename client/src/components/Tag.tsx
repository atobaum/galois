/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { MouseEventHandler } from "react";

const TagCss = css`
  color: gray;
`;

const Pointer = css`
  ${TagCss}
  cursor: pointer;
`;

type TagProps = {
  onClick?: MouseEventHandler;
  name: string;
};

function Tag({ onClick, name }: TagProps) {
  return (
    <span css={onClick ? Pointer : TagCss} onClick={onClick}>
      #{name}
    </span>
  );
}

export default Tag;
