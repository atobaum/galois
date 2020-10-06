import React, { useState, useEffect } from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Zettel } from "../models/Zettel";
import { getZettel } from "../api/zettelApi";
import ZettelCard from "../components/zettel-grid/ZettelCard";

const ZettelViewPageCss = css`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
`;

function ZettelViewPage({ match }: any): ReturnType<React.FunctionComponent> {
  const [zettel, setZettel] = useState<Zettel | null>(null);
  useEffect(() => {
    let id = Number(match.params.id);
    if (isNaN(id)) id = match.params.id;
    getZettel(id).then((zettel) => {
      setZettel(zettel);
    });
  }, [match.params.id]);
  return (
    <div css={ZettelViewPageCss}>
      {zettel ? <ZettelCard {...zettel} onDelete={() => {}} /> : "Loading"}
    </div>
  );
}

export default ZettelViewPage;
