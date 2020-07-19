import { renderHook, act } from "@testing-library/react-hooks";
import useToggle from "../useToggle";

describe("useToggle", () => {
  it("has initial value fase if not provided", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it("toggles", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it("set initial value if provided", () => {
    let initialValue = false;
    let { result } = renderHook(() => useToggle(initialValue));
    expect(result.current[0]).toBe(initialValue);

    initialValue = true;
    result = renderHook(() => useToggle(initialValue)).result;
    expect(result.current[0]).toBe(initialValue);
  });
});
