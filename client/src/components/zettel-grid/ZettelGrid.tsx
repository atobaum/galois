import React, { useCallback } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import PendingZettelCard from "./PendingZettelCard";
import ZettelCard from "./ZettelCard";
import { useHistory } from "react-router-dom";

const ZettelGridCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  width: 100%;
  grid-gap: 0.7rem;
`;

// container
const ZettelGrid: React.FC = () => {
  const { pendings, zettels } = useSelector(
    (state: RootState) => state.zettelGrid
  );
  const history = useHistory();

  const onClickZettel = useCallback(
    (id) => {
      history.push("/zettel/" + id);
    },
    [history]
  );

  return (
    <div css={ZettelGridCss}>
      {pendings.map((z, idx) => (
        <PendingZettelCard key={idx} loading={z.loading} zettel={z.zettel} />
      ))}
      {zettels.map((z) => (
        <ZettelCard key={z.id} {...z} onClick={onClickZettel} />
      ))}
    </div>
  );
};

export default ZettelGrid;
