import React from "react";

import { act, fireEvent, render, waitFor } from "@testing-library/react";
import "mutationobserver-shim";

import { useForm } from "react-hook-form";
import ContentEditor from "../ContentInput";

describe("<ContentEditor />", () => {
  function renderComponent(onSubmit: any, defaultValue?: string) {
    const Component = () => {
      const { register, handleSubmit, errors } = useForm();
      return (
        <div>
          <ContentEditor register={register} defaultValue={defaultValue} />
          <button onClick={handleSubmit(onSubmit)}>submit</button>
          <div>{errors.meta?.url && "error"}</div>
        </div>
      );
    };

    return render(<Component />);
  }
  it("registers defaultValue", async () => {
    const onSubmit = jest.fn();
    const { getByText } = renderComponent(onSubmit, "default content");

    fireEvent.click(getByText("submit"));

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith(
        expect.objectContaining({
          content: "default content",
          meta: { renderer: "PLAIN" },
        }),
        expect.any(Object)
      );
    });
  });

  it("sets content", async () => {
    //given
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = renderComponent(onSubmit);
    const input = getByPlaceholderText("Type content...");

    //when
    act(() => {
      fireEvent.keyPress(input, { target: { value: "new content" } });
    });

    //then
    fireEvent.click(getByText("submit"));
    return waitFor(
      () => {
        expect(onSubmit).toBeCalledWith(
          expect.objectContaining({ content: "new content" }),
          expect.any(Object)
        );
      },
      {
        timeout: 1000,
      }
    );
  });
});
