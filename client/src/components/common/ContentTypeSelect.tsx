import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { MenuItem as option, Select } from "@material-ui/core";
import ContentType from "../../types/content-type";

const ContentTypeSelectCss = css``;

const ContentTypeSelect: React.FC<{
  onChange: (ContentType: ContentType) => void;
  contentType: ContentType;
}> = ({ contentType, onChange }) => {
  return (
    <Select
      css={ContentTypeSelectCss}
      native
      onChange={(e) => onChange(e.target.value as ContentType)}
      value={contentType}
    >
      <option value="MARKDOWN">markdown</option>
      <option value="PLAIN">plain</option>
      {/* <MenuItem value={"BOOKMAKR"}>bookmark</MenuItem> */}
    </Select>
  );
};

export default ContentTypeSelect;
