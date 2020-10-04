import React, { useRef } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux";
import ZettelViewer from "./ZettelViewer";
import ZettelEditor from "./ZettelEditor";
import { createZettel } from "../../api/zettelApi";
import {
  addZetel,
  updateZettelAction,
} from "../../redux/modules/zettelReducer";
import { setViewer, startEdit } from "../../redux/modules/editorReducer";
import { useMutation } from "@apollo/client";
import { updateZettelQuery } from "../../api/zettelQuery";

const ZettelViewerPanelCss = css`
  .viewer-panel-header {
    display: flex;
    justify-content: space-between;
  }
`;

const ZettelViewerPanel: React.FC = () => {
  const { zettel, isEditing } = useSelector((state: RootState) => state.editor);
  const dispatch = useDispatch();
  const [updateZettel] = useMutation(updateZettelQuery);

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
          let variables: any = { id: zettel.id };
          if (zettel.content !== data.content) variables.content = data.content;
          if (zettel.title !== data.title) variables.title = data.title;

          //tags deep compare
          if (listDeepEquals(zettel.tags, data.tags))
            variables.tags = data.tags;

          updateZettel({
            variables,
          });
          dispatch(setViewer({ ...zettel, ...data }));
          dispatch(updateZettelAction({ ...zettel, ...data }));
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

function listDeepEquals(list1: any[], list2: any[]) {
  if (list1.length !== list2.length) return false;
  for (let i = 0; i < list1.length; ++i) {
    if (list1[i] !== list2[i]) return false;
  }
  return true;
}

export default ZettelViewerPanel;
