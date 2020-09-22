// eslint-disable-next-line
import React from "react";
import ZettelCard from "../ZettelCard";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { deleteZettel } from "../../api/zettelApi";
import { deleteZettelAction } from "../../reducers/zettelReducer";
import ZettelListItem from "./ZettelListItem";

const ZettelListCss = css`
  display: flex;
  flex-direction: column;
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
    <div css={ZettelListCss} className="zettel-list">
      {zettels
        .filter((zettel) => {
          return filter.tag ? zettel.tags.includes(filter.tag!) : true;
        })
        .map((note) => (
          <ZettelListItem key={note.id} {...note} onDelete={onDeleteZettel} />
        ))}
    </div>
  );
}

export default ZettelList;
