import { refCount } from "rxjs/operators";
import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ZettelType from "../../../../types/zettel-type";
import BookmarkEditor from "./BookmarkEditor";

const ArticleEditor: React.FC<{
  type: ZettelType;
  content: string;
  meta: any;
}> = ({ type }) => {
  let TypeEditor;
  switch (type) {
    case ZettelType.BOOKMARK:
      TypeEditor = BookmarkEditor;
      break;
    default:
      TypeEditor = BookmarkEditor;
  }
  return <div></div>;
  // return <TypeEditor></TypeEditor>;
};

export default ArticleEditor;
