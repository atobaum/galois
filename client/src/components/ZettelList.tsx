import React from "react";
import ZettelCard from "./ZettelCard";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import { deleteZettel } from "../api/zettelApi";
import { deleteZettelAction } from "../reducers/zettelReducer";

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
  const dispatch = useDispatch();
  const onDeleteZettel = async (id: number) => {
    const deleted = await deleteZettel(id);
    if (deleted) dispatch(deleteZettelAction(id));
  };
  return (
    <div css={ZettelListCss}>
      {zettels
        .filter((zettel) => {
          return filter.tag ? zettel.tags.includes(filter.tag!) : true;
        })
        .map((note) => (
          <ZettelCard key={note.id} {...note} onDelete={onDeleteZettel} />
        ))}
    </div>
  );
}

export default ZettelList;
