import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import preval from "preval.macro";
import { Helmet } from "react-helmet";

const AboutCss = css``;
const buildDate = preval`module.exports = new Date().toISOString();`;

const AboutPage: React.FC = () => {
  return (
    <div css={AboutCss}>
      <Helmet>
        <title>About - Galois</title>
      </Helmet>
      <div>Version: {process.env.REACT_APP_VERSION}</div>
      <div>Build Date: {buildDate}</div>
    </div>
  );
};

export default AboutPage;
