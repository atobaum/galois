// eslint-disable-next-line
import React from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import ZettelListItem from "./ZettelListItem";
import { setViewer } from "../../redux/editorReducer";

const ZettelListCss = css`
  display: flex;
  flex-direction: column;
`;

type ZettelListProps = {};

function ZettelList(props: ZettelListProps) {
  const zettels = useSelector((state: RootState) => state.zettel.zettels);
  const dispatch = useDispatch();
  return (
    <div css={ZettelListCss} className="zettel-list">
      {zettels.map((note) => (
        <ZettelListItem
          key={note.id}
          {...note}
          onTagClick={() => {}}
          onClick={() => dispatch(setViewer(note))}
        />
      ))}
    </div>
  );
}

export default ZettelList;
