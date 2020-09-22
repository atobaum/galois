// eslint-disable-next-line
import React from "react";
import ZettelList from "../components/ZettelList";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const ZettelTagFilterPageCss = css`
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
`;

function ZettelTagFilterPage({ match }: any) {
  const tag = match.params.tag;
  return (
    <div css={ZettelTagFilterPageCss}>
      <ZettelList filter={{ tag }} />
    </div>
  );
}

export default ZettelTagFilterPage;
