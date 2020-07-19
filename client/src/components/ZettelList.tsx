import React from "react";
import { Zettel } from "../models/Zettel";
import ZettelCard from "./ZettelCard";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const ZettelListCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
`;

type NoteListProps = {
  notes: Zettel[];
};
function ZettelList({ notes }: NoteListProps) {
  return (
    <div css={ZettelListCss}>
      {notes.map((note) => (
        <ZettelCard {...note} />
      ))}
    </div>
  );
}

export default ZettelList;
