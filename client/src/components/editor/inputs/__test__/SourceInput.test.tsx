import React from "react";

import { fireEvent, render } from "@testing-library/react";
import "mutationobserver-shim";

import { useForm } from "react-hook-form";
import SourceType from "../../../../types/source-type";
import SourceInput from "../SourceInput";

describe("<SourceInput />", () => {
  function renderComponent(Component: React.FC<ReturnType<typeof useForm>>) {
    const onSubmit = jest.fn();

    const Wrapper = () => {
      const result = useForm();
      return (
        <div>
          <Component {...result} />
          <button onClick={result.handleSubmit(onSubmit)}>submit</button>
          <div>{result.errors.meta?.url && "error"}</div>
        </div>
      );
    };

    const result = render(<Wrapper />);
    const submit = () => {
      fireEvent.click(result.getByText("submit"));
    };

    return { ...result, submit, onSubmit };
  }
  it("sets default value", () => {
    renderComponent(({ register, watch }) => (
      <SourceInput
        register={register}
        watch={watch}
        defaultValue={{ type: SourceType.URL, data: "https://example.com" }}
      />
    ));

    expect(document.querySelector("input")!.value).toBe("https://example.com");
  });
});
