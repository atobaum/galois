import React, { useCallback, useEffect } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ZettelCard from "./ZettelCard";
import { getZettels } from "../../api/zettelApi";
import { RootState } from "../../redux";
import { setZettelsToGrid } from "../../redux/modules/zettel-grid";
import useCurrentUser from "../../hooks/useCurrentUser";

const ZettelGridCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 500px));
  width: 100%;
  grid-gap: 0.7rem;
`;

// container
const ZettelGrid: React.FC = () => {
  const history = useHistory();
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const { pendings, zettels } = useSelector(
    (state: RootState) => state.zettelGrid
  );

  useEffect(() => {
    if (user)
      getZettels().then((data) => {
        dispatch(setZettelsToGrid(data));
      });
  }, [dispatch, user]);

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
    </div>
  );
};

export default ZettelGrid;
