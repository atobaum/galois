import { RootState } from "../redux";
import { rootReducer } from "../redux/modules/root";

export const initZettels = [
  {
    id: "70b02434-53be-4bf7-a25f-a44952362688",
    number: 5,
    version: 3,
    title: "제목",
    content: `
## 소제목
- list1
`,
    tags: ["태그1", "태그2"],
    createdAt: new Date("2020"),
    updatedAt: new Date(),
  },
  {
    id: "70b02434-53be-4bf7-a25f-a44952362688",
    number: 6,
    version: 2,
    title: "두번째 제텔",
    content: `
## 두번째
**bold**
`,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
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
