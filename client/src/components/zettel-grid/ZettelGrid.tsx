import React, { useCallback, useEffect } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import PendingZettelCard from "./PendingZettelCard";
import ZettelCard from "./ZettelCard";
import { useHistory } from "react-router-dom";
import { getZettels } from "../../api/zettelApi";
import { setZettelsToGrid } from "../../redux/modules/zettel-grid";
import useCurrentUser from "../../hooks/useCurrentUser";

const ZettelGridCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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
