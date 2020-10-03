import React, { useMemo, useRef, useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers";
import { Zettel } from "../../models/Zettel";
import ZettelViewer from "./ZettelViewer";
import ZettelEditor from "./ZettelEditor";
import { createZettel } from "../../api/zettelApi";
import { addZetel } from "../../reducers/zettelReducer";
import { setViewer, startEdit } from "../../reducers/editorReducer";

const ZettelViewerPanelCss = css`
  .viewer-panel-header {
    display: flex;
    justify-content: space-between;
  }
`;

const ZettelViewerPanel: React.FC = () => {
  const { zettel, isEditing } = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();

  const editorRef = useRef<{
    getData: () => { title: string; content: string; tags: string[] };
  }>(null);

  const submitHandler = async () => {
    if (!isEditing) dispatch(startEdit(zettel));
    else {
      // Submit
      if (editorRef.current) {
        const data = editorRef.current.getData();
        if (zettel) {
          // edit
          // TODO implement
          console.log("edit: ", data);
          dispatch(setViewer(zettel));
        } else {
          // new
          const createdZettel = await createZettel(data);
          dispatch(addZetel(createdZettel));
        }
      }
    }
  };

  if (zettel) {
    return (
      <div css={ZettelViewerPanelCss}>
        <div className="viewer-panel-header">
          <div>{zettel.id}</div>
          <div>
            <button onClick={submitHandler}>
              {isEditing ? "Submit" : "Edit"}
            </button>
            <button>More</button>
          </div>
        </div>
        {isEditing ? (
          <ZettelEditor
            title={zettel.title}
            content={zettel.content}
            tags={zettel.tags}
            onSubmit={submitHandler}
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
  } else if (isEditing) {
    return (
      <div css={ZettelViewerPanelCss}>
        <div className="viewer-panel-header">
          <div></div>
          <div>
            <button onClick={submitHandler}>Submit</button>
            {/* <button>More</button> */}
          </div>
        </div>
        <ZettelEditor
          title={""}
          content={""}
          tags={[]}
          onSubmit={submitHandler}
          ref={editorRef}
        />
      </div>
    );
  } else {
    // Error
    throw new Error("Inconsistent state: !(isEditing || zettel)");
  }
};

export default ZettelViewerPanel;
