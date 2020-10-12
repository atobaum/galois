import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../redux/modules/coreReducer";

export default function useSetTitle(title: string) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTitle(title));
  }, [title, dispatch]);
}
