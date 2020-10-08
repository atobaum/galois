import { renderHook, act } from "@testing-library/react-hooks";
import useTagInput from "../useTagInput";

describe("useTagInput", () => {
  it("has initial tags", () => {
    const { result } = renderHook(() => useTagInput(["t1", "t2"]));
    expect(result.current.tags).toEqual(["t1", "t2"]);
  });

  it("sets input value", () => {
    const { result } = renderHook(() => useTagInput());
    act(() => result.current.setTagInputValue("testtag"));
    expect(result.current.tagInputValue).toBe("testtag");
    expect(result.current.tags).toEqual([]);
  });

  it("adds tag", () => {
    //given
    const { result } = renderHook(() => useTagInput(["t1", "t2"]));
    act(() => result.current.setTagInputValue("testtag  "));

    // when
    act(() => result.current.addTag());

    // expect
    expect(result.current.tags).toEqual(["t1", "t2", "testtag"]);
  });

  it("does nothing when add tag if tag input is empty", () => {
    //given
    const { result } = renderHook(() => useTagInput(["t2"]));
    act(() => result.current.setTagInputValue("  "));

    // when
    act(() => result.current.addTag());

    // expect
    expect(result.current.tags).toEqual(["t2"]);
  });

  it("removes tag", () => {
    //given
    const { result } = renderHook(() => useTagInput(["t1", "t2", "t3"]));

    // when
    act(() => result.current.removeTag("t2  "));

    // expect
    expect(result.current.tags).toEqual(["t1", "t3"]);
  });
});
