import React, { useState, useEffect } from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Zettel } from "../models/Zettel";
import { getZettel } from "../api/zettelApi";
import ZettelCard from "../components/ZettelCard";

const ZettelViewPageCss = css`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
`;

function ZettelViewPage({ match }: any): ReturnType<React.FunctionComponent> {
  const [zettel, setZettel] = useState<Zettel | null>(null);
  useEffect(() => {
    getZettel(match.params.id).then((zettel) => {
      setZettel(zettel);
    });
  }, []);
  return (
    <div css={ZettelViewPageCss}>
      {zettel ? <ZettelCard {...zettel} /> : "Loading"}
    </div>
  );
}

export default ZettelViewPage;
