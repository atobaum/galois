import { combineReducers } from "redux";
import coreReducer from "./coreReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  core: coreReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
