import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ZettelCard from "../renderer/ZettelCard";
import { useHistory } from "react-router-dom";
import { updateZettel } from "../../api/zettelApi";
import SmallEditor from "../editor/SmallEditor";

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
          <SmallEditor
            defaultZettel={zettel}
            onSubmit={(data) => {
              // todo remove
              if (zettel.meta.url) data.meta.url = null;

              setEditing(false);
              updateZettel({ ...zettel, ...data });
            }}
          />
        ) : (
          <ZettelCard zettel={zettel} />
        ))}
    </div>
  );
};

export default ZettelViewer;
