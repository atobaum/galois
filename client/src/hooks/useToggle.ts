import { useState, useCallback } from "react";

export default function useToggle(initialValue = false): [boolean, () => void] {
  const [state, setState] = useState(initialValue);
  const toggle = useCallback(() => setState(!state), [state]);

  return [state, toggle];
}
