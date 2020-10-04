import { RootState } from "../redux";
import { rootReducer } from "../redux/modules/root";

export const initZettels = [
  {
    uuid: "1ad8f2j",
    id: 123,
    version: 3,
    title: "제목",
    content: `
## 소제목
- list1
`,
    tags: ["태그1", "태그2"],
    createdAt: new Date("2020"),
  },
  {
    uuid: "2asdfxvzc",
    id: 223,
    version: 2,
    title: "두번째 제텔",
    content: `
## 두번째
**bold**
`,
    tags: [],
    createdAt: new Date(),
  },
];

let state: RootState = (rootReducer as any)(undefined, { type: "init" });
state = {
  ...state,
  zettel: {
    zettels: initZettels,
  },
};

const dispatch = jest.fn((action) => {
  state = rootReducer(state, action);
});

export function useSelector(fn: any) {
  return fn(state);
}

export function useDispatch() {
  return dispatch;
}
