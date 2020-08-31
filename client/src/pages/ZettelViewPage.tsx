import React from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const ZettelViewPageCss = css`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
`;

function ZettelViewPage({ match }: any): ReturnType<React.FunctionComponent> {
  return <div css={ZettelViewPageCss}>zettel view {match.params.id}</div>;
}

export default ZettelViewPage;
