import React, { useState } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ZettelType from "../../types/zettel-type";

import { useForm } from "react-hook-form";
import { ContentInput, InputWrapper, SourceInput, TagInput } from "./inputs";
import ZettelTypeSelect from "./inputs/ZettelTypeInput";
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
  const [hasSource, setHasSource] = useState(defaultZettel?.meta.source);
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
      <div>
        <span>{defaultZettel ? defaultZettel.number : "New"}</span>
        <label>
          <input
            type="checkbox"
            onChange={(e) => {
              setHasSource(e.target.checked);
            }}
            defaultChecked={hasSource}
          />
          source
        </label>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <TextField label="Title" name="title" inputRef={register} />
        {type === ZettelType.BOOKMARK || hasSource ? (
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
