import { combineReducers, createStore, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import coreReducer from "./coreReducer";
import editorReducer from "./editorReducer";
import rootEpic from "./epics";
import modalReducer from "./modalReducer";
import zettelReducer from "./zettelReducer";

const rootReducer = combineReducers({
  core: coreReducer,
  modal: modalReducer,
  zettel: zettelReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, composeEnhancers(epicMiddleware));
epicMiddleware.run(rootEpic);

export default store;
