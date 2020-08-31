/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const TagCss = css`
  color: gray;
`;

type TagProps = {
  onClick?: () => void;
  children: string;
};

function Tag({ onClick, children }: TagProps) {
  return (
    <span css={TagCss} onClick={onClick ? onClick : () => {}}>
      #{children}
    </span>
  );
}

export default Tag;
