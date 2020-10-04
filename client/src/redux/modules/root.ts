import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import coreReducer from "./coreReducer";
import modalReducer from "./modalReducer";
import zettelReducer from "./zettelReducer";
import editorReducer from "./editorReducer";

export const rootEpic = combineEpics();

export const rootReducer = combineReducers({
  core: coreReducer,
  modal: modalReducer,
  zettel: zettelReducer,
  editor: editorReducer,
});
