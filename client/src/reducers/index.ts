import { combineReducers } from "redux";
import coreReducer from "./coreReducer";
import modalReducer from "./modalReducer";
import zettelReducer from "./zettelReducer";

const rootReducer = combineReducers({
  core: coreReducer,
  modal: modalReducer,
  zettel: zettelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
