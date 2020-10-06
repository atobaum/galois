const SET_VIEWER = "editor/SET_VIEWER" as const;
const START_EDIT = "editor/START_EDIT" as const;

export const setViewer = (zettel: Zettel) => ({
  type: SET_VIEWER,
  payload: zettel,
});

export const startEdit = (zettel: Zettel | null = null) => ({
  type: START_EDIT,
  payload: zettel,
});

type EditorAction = ReturnType<typeof setViewer> | ReturnType<typeof startEdit>;
type EditorState = {
  isEditing: boolean;
  zettel: Zettel | null;
};

const initialState: EditorState = {
  isEditing: true,
  zettel: null,
};

export default function editorReducer(
  state: EditorState = initialState,
  action: EditorAction
): EditorState {
  switch (action.type) {
    case SET_VIEWER:
      return {
        isEditing: false,
        zettel: action.payload,
      };
    case START_EDIT:
      const zettel = action.payload;
      return {
        isEditing: true,
        zettel: zettel,
      };
    default:
      return state;
  }
}
