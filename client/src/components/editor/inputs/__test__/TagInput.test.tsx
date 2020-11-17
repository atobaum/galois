import React from "react";

import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "mutationobserver-shim";

import { useForm } from "react-hook-form";
import TagInput from "../TagInput";
describe("<TagInput />", () => {
  function renderComponent(onSubmit: any, tags?: string[]) {
    const Component = () => {
      const { register, setValue, watch, handleSubmit, errors } = useForm();
      return (
        <div>
          <TagInput
            register={register}
            setValue={setValue}
            watch={watch}
            defaultValue={tags}
          />
          <button onClick={handleSubmit(onSubmit)}>submit</button>
          <div>{errors.tags && "error"}</div>
        </div>
      );
    };

    return render(<Component />);
  }

  it("renders tags", () => {
    const onSubmit = jest.fn();
    const tags = ["t1", "t2"];
    const { getByText } = renderComponent(onSubmit, tags);

    getByText("#t1");
    getByText("#t2");
  });

  it("adds tag", () => {
    //given
    const onSubmit = jest.fn();
    const tags = ["t1", "t2"];
    const { getByPlaceholderText, getByText } = renderComponent(onSubmit, tags);
    const input = getByPlaceholderText("add tag...");

    //when
    act(() => {
      fireEvent.change(input, { target: { value: "newtag" } });
    });
    act(() => {
      fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    });

    //then
    fireEvent.click(getByText("submit"));
    return waitFor(
      () => {
        expect(onSubmit).toBeCalledWith(
          expect.objectContaining({ tags: [...tags, "newtag"] }),
          expect.any(Object)
        );
      },
      {
        timeout: 1000,
      }
    );
  });

  it("remove tag when tag clicked", () => {
    //given
    const onSubmit = jest.fn();
    const tags = ["t1", "t2"];
    const { getByText, queryByText } = renderComponent(onSubmit, tags);
    const tag = getByText("#t1");

    //when
    act(() => {
      fireEvent.click(tag);
    });

    //then
    expect(queryByText("#t1")).toBeNull();

    fireEvent.click(getByText("submit"));
    return waitFor(() => {
      expect(onSubmit).toBeCalledWith(
        expect.objectContaining({ tags: tags.filter((t) => t !== "t1") }),
        expect.any(Object)
      );
    });
  });
});
