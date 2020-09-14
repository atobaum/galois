import { useState } from "react";

export default function useLocalStorage(key: string) {
  const storage = window.localStorage;
  const [state, setState] = useState<any>(storage.getItem(key));
  return [
    state,
    (value: any) => {
      if (!value) {
        storage.removeItem(key);
        setState(value);
      } else {
        storage.setItem(key, value);
        setState(value);
      }
    },
  ];
}
