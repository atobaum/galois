import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useDispatch } from "react-redux";
import { createZettelAction } from "../../../redux/modules/zettel-grid";
import TagInput from "../TagInput";
import { Button, Container, TextField } from "@material-ui/core";
import ZettelTypeSelect from "../ZettelTypeSelect";
import ZettelType from "../../../types/zettel-type";
import BookmarkEditor from "./ArticleEditor/BookmarkEditor";
import ContentEditor from "./ArticleEditor/ContentEditor";

const SmallEditorCss = css`
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
    & > * {
      margin: 0.2rem 0;
    }
  }
`;

type SmallEditorProps = {};

const SmallEditor: React.FC<SmallEditorProps> = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState({});
  const [zettelType, setZettelType] = useState<ZettelType>(ZettelType.NOTE);
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useDispatch();

  const submitHandler = (evt: any) => {
    evt.preventDefault();
    if (content.trim().length === 0) return;
    dispatch(
      createZettelAction({
        title,
        content,
        type: zettelType,
        tags,
        meta,
      })
    );
    setContent("");
  };

  let TypeEditor;
  switch (zettelType) {
    case ZettelType.BOOKMARK:
      TypeEditor = BookmarkEditor;
      break;
    default:
      TypeEditor = ContentEditor;
  }

  return (
    <Container css={SmallEditorCss}>
      <form>
        <TextField
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TypeEditor
          content={content}
          setContent={setContent}
          meta={meta}
          setMeta={setMeta}
        />
        <div>
          <TagInput tags={tags} onChange={setTags} />
          <ZettelTypeSelect onChange={setZettelType} zettelType={zettelType} />
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SmallEditor;
