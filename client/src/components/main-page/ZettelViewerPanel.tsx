import React, { useMemo, useRef, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { Zettel } from "../../models/Zettel";
import ZettelViewer from "./ZettelViewer";
import ZettelEditor from "./ZettelEditor";

const ZettelViewerPanelCss = css``;

const ZettelViewerPanel: React.FC = () => {
  const curState = useSelector((state: RootState) => state.editor);
  const [isEditing, setIsEditing] = useState(false);
  const zettel: Zettel | null = curState.zettel;

  // const onSubmit={async (args: Pick<Zettel, "title" | "content" | "tags">) => {
  //   const createdZettel = await createZettel(args);
  //   dispatch(addZetel(createdZettel));
  // }}

  useMemo(() => {
    setIsEditing(false);
  }, [zettel]);
  const submitHandler = () => {
    if (!isEditing) setIsEditing(true);
    else {
      // Submit
      setIsEditing(false);
    }
  };

  const editorRef = useRef();

  if (zettel) {
    return (
      <div css={ZettelViewerPanelCss}>
        <div>
          <div>{zettel.id}</div>
          <button onClick={submitHandler}>
            {isEditing ? "Submit" : "Edit"}
          </button>
          <button>More</button>
        </div>
        <div>{zettel.title}</div>
        {isEditing ? (
          <ZettelEditor
            content={zettel.content}
            tags={zettel.tags}
            onSubmit={console.log}
            ref={editorRef}
          />
        ) : (
          <ZettelViewer content={zettel.content} tags={zettel.tags} />
        )}
      </div>
    );
  } else {
    return <div css={ZettelViewerPanelCss}></div>;
  }
};

export default ZettelViewerPanel;
