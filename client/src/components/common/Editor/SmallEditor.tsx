import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ZettelType from "../../../types/zettel-type";

import { useForm } from "react-hook-form";
import { ContentInput, InputWrapper, SourceInput, TagInput } from "./inputs";
import ZettelTypeSelect from "../ZettelTypeSelect";
import { Button, Container, TextField } from "@material-ui/core";

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

type SmallEditorProps = {
  defaultZettel?: Zettel;
  onSubmit: (data: any) => void;
};

const SmallEditor: React.FC<SmallEditorProps> = ({
  defaultZettel,
  onSubmit,
}) => {
  const { handleSubmit, register, setValue, reset, watch, errors } = useForm<
    any
  >({
    defaultValues: defaultZettel || {
      type: ZettelType.NOTE,
    },
  });

  const submitHandler = (data: any) => {
    onSubmit(data);
    reset();
  };

  const type = watch("type");

  return (
    <Container css={SmallEditorCss}>
      {defaultZettel ? defaultZettel.number : "New"}
      <form onSubmit={handleSubmit(submitHandler)}>
        <TextField label="Title" name="title" inputRef={register} />
        {/* {type === ZettelType.BOOKMARK ? <UrlInput register={register} /> : null} */}
        {type === ZettelType.BOOKMARK ? (
          <InputWrapper name="Source">
            <SourceInput register={register} watch={watch} />
          </InputWrapper>
        ) : null}
        <ContentInput register={register} />
        <div>
          <TagInput
            register={register}
            setValue={setValue}
            watch={watch}
            defaultValue={defaultZettel?.tags}
          />
          <ZettelTypeSelect register={register} />
          <Button variant="contained" color="primary" type="submit">
            {defaultZettel ? "수정" : "만들기"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SmallEditor;
