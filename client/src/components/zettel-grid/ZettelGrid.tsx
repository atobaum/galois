import React, { useCallback, useEffect } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ZettelCard from "../renderer/ZettelCard";
import { RootState } from "../../redux";
import { setZettelsToGrid } from "../../redux/modules/zettel-grid";
import useZettels from "../../hooks/useZettels";

const ZettelGridCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 500px));
  width: 100%;
  grid-gap: 0.7rem;
`;

// container
const ZettelGrid: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pendings, zettels } = useSelector(
    (state: RootState) => state.zettelGrid
  );

  const { done, fetchMore, zettels: data } = useZettels();

  useEffect(() => {
    if (data) dispatch(setZettelsToGrid(data));
  }, [dispatch, data]);

  const onClickZettel = useCallback(
    (number) => {
      history.push("/zettel/" + number);
    },
    [history]
  );

  return (
    <div css={ZettelGridCss}>
      {pendings.map((z, idx) => (
        <ZettelCard key={idx} loading={z.loading} zettel={z.zettel} />
      ))}
      {zettels.map((z) => (
        <ZettelCard key={z.id} zettel={z} onClick={onClickZettel} />
      ))}
      {!done && <button onClick={fetchMore}>fetch more</button>}
    </div>
  );
};

export default ZettelGrid;
