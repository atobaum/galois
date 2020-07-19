import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import useForm from "../useForm";
import { render, fireEvent } from "@testing-library/react";

describe("useForm", () => {
  const initState = {
    a: 1,
    b: 2,
  };
  it("sets initial state", () => {
    const { result } = renderHook(() => useForm(initState));
    expect(result.current.formValues).toEqual({ ...initState });
  });

  it("hangles onChange", () => {
    const { result } = renderHook(() => useForm(initState));
    act(() => {
      result.current.handleChange({
        preventDefault: () => {},
        target: { name: "a", value: "2" },
      });
    });

    act(() => {
      result.current.handleChange({
        preventDefault: () => {},
        target: { name: "c", value: "3" },
      });
    });

    expect(result.current.formValues).toEqual({ ...initState, a: "2", c: "3" });
  });

  it("submits", () => {
    const onSubmit = jest.fn();
    const { result } = renderHook(() => useForm(initState, onSubmit));

    act(() => {
      result.current.handleChange({
        preventDefault: () => {},
        target: { name: "a", value: "2" },
      });
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(onSubmit).toBeCalledWith({ ...initState, a: "2" });
    expect(result.current.formValues).toEqual(initState);
  });
});
