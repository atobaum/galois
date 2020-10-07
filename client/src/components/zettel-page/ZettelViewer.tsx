import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ZettelCard from "../zettel-grid/ZettelCard";
import { useHistory } from "react-router-dom";
import BigZettelEditor from "./BigZettelEditor";

const ZettelViewerCss = css`
  height: 100%;
`;

const ZettelViewer: React.FC<{ zettel: Zettel | undefined }> = ({ zettel }) => {
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  useEffect(() => setEditing(false), [zettel]);

  return (
    <div css={ZettelViewerCss}>
      <div>
        <button onClick={() => history.go(-1)}>Back</button>
        <button
          onClick={() => {
            setEditing(!editing);
          }}
        >
          Edit
        </button>
        <button onClick={() => {}}>More</button>
      </div>

      {zettel &&
        (editing ? (
          <BigZettelEditor zettel={zettel} onEdit={console.log} />
        ) : (
          <ZettelCard zettel={zettel} />
        ))}
    </div>
  );
};

export default ZettelViewer;
