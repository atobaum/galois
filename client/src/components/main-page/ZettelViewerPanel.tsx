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
  const editorRef = useRef<{
    getData: () => { title: string; content: string; tags: string[] };
  }>(null);

  useMemo(() => {
    setIsEditing(false);
  }, [zettel]);
  const submitHandler = () => {
    if (!isEditing) setIsEditing(true);
    else {
      // Submit
      if (editorRef.current) {
        const data = editorRef.current.getData();
        console.log(data);
      }
      setIsEditing(false);
    }
  };

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
        {isEditing ? (
          <ZettelEditor
            title={zettel.title}
            content={zettel.content}
            tags={zettel.tags}
            onSubmit={console.log}
            ref={editorRef}
          />
        ) : (
          <ZettelViewer
            title={zettel.title}
            content={zettel.content}
            tags={zettel.tags}
          />
        )}
      </div>
    );
  } else {
    return <div css={ZettelViewerPanelCss}></div>;
  }
};

export default ZettelViewerPanel;
