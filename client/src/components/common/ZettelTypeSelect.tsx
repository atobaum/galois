import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Select } from "@material-ui/core";
import ZettelType from "../../types/zettel-type";

const ContentTypeSelectCss = css``;

const ZettelTypeSelect: React.FC<{
  register: any;
}> = ({ register }) => {
  return (
    <Select css={ContentTypeSelectCss} native inputRef={register} name="type">
      <option value={ZettelType.NOTE}>note</option>
      <option value={ZettelType.BOOKMARK}>bookmark</option>
      <option value={ZettelType.COLLECTION}>collection</option>
    </Select>
  );
};

export default ZettelTypeSelect;
