import React, { useState } from "react";
import ZettelCard from "./ZettelCard";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const ZettelListCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
`;

type ZettelListProps = {
  filter?: {
    tag?: string;
  };
};
function ZettelList(props: ZettelListProps) {
  const filter = props.filter || {};
  const zettels = useSelector((state: RootState) => state.zettel.zettels);
  return (
    <div css={ZettelListCss}>
      {zettels
        .filter((zettel) => {
          return filter.tag ? zettel.tags.includes(filter.tag!) : true;
        })
        .map((note) => (
          <ZettelCard key={note.id} {...note} />
        ))}
    </div>
  );
}

export default ZettelList;
