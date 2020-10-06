import {
  zettelGridReducer,
  createZettelAction,
  saveSuccessed,
  saveFailed,
  setZettelsToGrid,
  appendZettelsToGrid,
} from "../zettel-grid";
describe("zettelGridReducer", () => {
  const newZettel1 = {
    title: "title",
    content: "content",
    tags: ["t1", "t2"],
    createdAt: new Date("2020-08-08"),
  };

  const newZettel2 = {
    title: "title",
    content: "content",
    tags: ["t1", "t2"],
    createdAt: new Date("2020-08-08"),
  };

  const zettels1 = [
    {
      id: 1,
      title: "title",
      content: "content",
      tags: ["t1", "t2"],
      createdAt: new Date("2020-08-08"),
    },
    {
      id: 2,
      title: "title",
      content: "content",
      tags: ["t1", "t2"],
      createdAt: new Date("2020-08-08"),
    },
  ];

  const zettels2 = [
    {
      id: 5,
      title: "title",
      content: "content",
      tags: ["t1", "t2"],
      createdAt: new Date("2020-08-08"),
    },
    {
      id: 4,
      title: "title",
      content: "content",
      tags: ["t1", "t2"],
      createdAt: new Date("2020-08-08"),
    },
  ];

  let state: ReturnType<typeof zettelGridReducer> = null as any;
  beforeEach(() => {
    state = zettelGridReducer(undefined, {} as any);
  });

  it("sets zettels 1", () => {
    state = zettelGridReducer(state, setZettelsToGrid(zettels1));

    expect(state.pendings).toHaveLength(0);
    expect(state.zettels).toEqual(zettels1);
  });

  it("sets zettels 2", () => {
    state = zettelGridReducer(state, setZettelsToGrid(zettels1));
    state = zettelGridReducer(state, setZettelsToGrid(zettels2));

    expect(state.pendings).toHaveLength(0);
    expect(state.zettels).toEqual(zettels2);
  });

  it("append zettels", () => {
    state = zettelGridReducer(state, setZettelsToGrid(zettels1));
    state = zettelGridReducer(state, appendZettelsToGrid(zettels2));

    expect(state.pendings).toHaveLength(0);
    expect(state.zettels).toEqual([...zettels1, ...zettels2]);
  });

  it("adds to pending list if user creates zettel", () => {
    state = zettelGridReducer(state, createZettelAction(newZettel1));
    state = zettelGridReducer(state, createZettelAction(newZettel2));
    expect(state.pendings).toEqual([
      { loading: true, zettel: newZettel2 },
      { loading: true, zettel: newZettel1 },
    ]);
  });

  it("저장 성공", () => {
    //given
    state = zettelGridReducer(state, createZettelAction(newZettel1));
    state = zettelGridReducer(state, createZettelAction(newZettel2));

    //when
    const savedZettel = { ...newZettel1, id: 3 };
    state = zettelGridReducer(state, saveSuccessed(newZettel1, savedZettel));

    //then
    expect(state.pendings).toEqual([{ loading: true, zettel: newZettel2 }]);
    expect(state.zettels).toEqual([savedZettel]);
  });

  it("저장 실패", () => {
    //given
    state = zettelGridReducer(state, createZettelAction(newZettel1));
    state = zettelGridReducer(state, createZettelAction(newZettel2));

    //when
    state = zettelGridReducer(state, saveFailed(newZettel1));

    //then
    expect(state.pendings).toEqual([
      { loading: true, zettel: newZettel2 },
      { loading: false, zettel: newZettel1 },
    ]);
    expect(state.zettels).toEqual([]);
  });
});
