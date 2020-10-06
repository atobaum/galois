import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import coreReducer from "./coreReducer";
import modalReducer from "./modalReducer";
import zettelReducer from "./zettelReducer";
import editorReducer from "./editorReducer";
import { toastEpic, toastReducer } from "./toast";
import { zettelGridEpic, zettelGridReducer } from "./zettel-grid";

export const rootEpic = combineEpics(toastEpic, zettelGridEpic);

export const rootReducer = combineReducers({
  core: coreReducer,
  modal: modalReducer,
  zettel: zettelReducer,
  editor: editorReducer,
  toast: toastReducer,
  zettelGrid: zettelGridReducer,
});
