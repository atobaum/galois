import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import PendingZettelCard from "./PendingZettelCard";
import ZettelCard from "./ZettelCard";

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
  return (
    <div css={ZettelGridCss}>
      {pendings.map((z) => (
        <PendingZettelCard loading={z.loading} zettel={z.zettel} />
      ))}
      {zettels.map((z) => (
        <ZettelCard
          {...z}
          onClick={() => {
            console.log("zettel clicked: ", z);
          }}
        />
      ))}
    </div>
  );
};

export default ZettelGrid;
