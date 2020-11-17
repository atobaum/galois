import React from "react";

import { fireEvent, render, waitFor } from "@testing-library/react";
import "mutationobserver-shim";

import { useForm } from "react-hook-form";
import UrlInput from "../UrlInput";

describe("<UrlInput />", () => {
  function renderComponent(onSubmit: any) {
    const Component = () => {
      const { register, handleSubmit, errors } = useForm();
      return (
        <div>
          <UrlInput register={register} />
          <button onClick={handleSubmit(onSubmit)}>submit</button>
          <div>{errors.meta?.url && "error"}</div>
        </div>
      );
    };

    return render(<Component />);
  }
  it("registers meta.url", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = renderComponent(onSubmit);

    fireEvent.change(getByPlaceholderText("URL..."), {
      target: { value: "sample url" },
    });
    fireEvent.click(getByText("submit"));

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith(
        expect.objectContaining({ meta: { url: "sample url" } }),
        expect.any(Object)
      );
    });
  });

  it("it not nullable", async () => {
    const onSubmit = jest.fn();
    const { getByText } = renderComponent(onSubmit);

    fireEvent.click(getByText("submit"));

    await waitFor(() => {
      expect(onSubmit).not.toBeCalled();
      getByText("error");
    });
  });
});
