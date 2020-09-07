/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const TagCss = css`
  color: gray;
`;

const Pointer = css`
  ${TagCss}
  cursor: pointer;
`;

type TagProps = {
  onClick?: () => void;
  children: string;
};

function Tag({ onClick, children }: TagProps) {
  return (
    <span
      css={onClick ? Pointer : TagCss}
      onClick={onClick ? onClick : undefined}
    >
      #{children}
    </span>
  );
}

export default Tag;
