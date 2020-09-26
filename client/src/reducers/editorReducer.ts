import { Zettel } from "../models/Zettel";

const SET_EDITOR = "editor/SET_EDITOR" as const;
export const setEditor = (zettel: Zettel) => ({
  type: SET_EDITOR,
  payload: zettel,
});

type EditorAction = ReturnType<typeof setEditor>;
type EditorState = {
  isNew: boolean;
  zettel: Zettel | null;
};

const initialState: EditorState = {
  isNew: false,
  zettel: null,
};

export default function editorReducer(
  state: EditorState = initialState,
  action: EditorAction
): EditorState {
  switch (action.type) {
    case SET_EDITOR:
      return {
        ...state,
        isNew: false,
        zettel: action.payload,
      };
    default:
      return state;
  }
}
