import { combineReducers } from "redux";
import coreReducer from "./coreReducer";
import noteReducer from "./notesReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  core: coreReducer,
  inbox: noteReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
