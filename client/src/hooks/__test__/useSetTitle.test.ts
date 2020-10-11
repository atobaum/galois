import { renderHook } from "@testing-library/react-hooks";
import { useDispatch } from "react-redux";
import useSetTitle from "../useSetTitle";

jest.mock("react-redux");

describe("useSetTitle", () => {
  let dispatch = useDispatch();
  beforeEach(() => {
    (dispatch as any).mockReset();
  });
  it("dispatch action", () => {
    const { result, rerender } = renderHook((title) => useSetTitle(title), {
      initialProps: "test",
    });

    expect(dispatch).toBeCalledWith({
      type: "core/SET_TITLE",
      payload: "test",
    });
  });

  it("does not dispatch if title is not changed", () => {
    const { rerender } = renderHook((title) => useSetTitle(title), {
      initialProps: "test",
    });

    rerender("test");

    expect(dispatch).toBeCalledTimes(1);
  });

  it("dispatchss if title is changed", () => {
    const { rerender } = renderHook((title) => useSetTitle(title), {
      initialProps: "test",
    });

    rerender("test1");

    expect(dispatch).toHaveBeenLastCalledWith({
      type: "core/SET_TITLE",
      payload: "test1",
    });
  });
});
