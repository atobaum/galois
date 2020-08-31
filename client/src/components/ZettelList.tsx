import React from "react";
import ZettelCard from "./ZettelCard";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const ZettelListCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
`;

type NoteListProps = {};
function ZettelList(props: NoteListProps) {
  const zettels = useSelector((state: RootState) => state.zettel.zettels);
  return (
    <div css={ZettelListCss}>
      {zettels.map((note) => (
        <ZettelCard {...note} />
      ))}
    </div>
  );
}

export default ZettelList;
