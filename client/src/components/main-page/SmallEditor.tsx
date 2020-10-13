import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useDispatch } from "react-redux";
import { createZettelAction } from "../../redux/modules/zettel-grid";
import TagInput from "../common/TagInput";
import { Button, Container, TextField } from "@material-ui/core";
import ContentType from "../../types/content-type";

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
  const [type, setType] = useState<ContentType>(ContentType.MARKDOWN);
  const [tags, setTags] = useState<string[]>([]);
  const dispatch = useDispatch();

  const submitHandler = (evt: any) => {
    evt.preventDefault();
    if (content.trim().length === 0) return;
    dispatch(
      createZettelAction({
        title,
        content,
        contentType: type,
        tags,
      })
    );
    setContent("");
  };

  return (
    <Container css={SmallEditorCss}>
      <form>
        <TextField
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextField
          label="Content"
          multiline
          rowsMax={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div>
          <TagInput tags={tags} onChange={setTags} />
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SmallEditor;
