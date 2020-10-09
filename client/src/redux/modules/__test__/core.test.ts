import coreReducer from "../coreReducer";

describe("core reducer", () => {
  let state: any;
  beforeEach(() => {
    state = coreReducer(undefined, {} as any);
  });

  it("set user", () => {
    const user = { username: "test", email: "asdf" };
    state = coreReducer(state, { type: "core/SET_USER", payload: user });

    expect(state.user).toBe(user);
    expect(state.title).toBe("");
  });

  it("unset user", () => {
    const user = { username: "test", email: "asdf" };
    state = coreReducer(state, { type: "core/SET_USER", payload: user });

    state = coreReducer(state, { type: "core/UNSET_USER" });

    expect(state.user).toBe(null);
    expect(state.title).toBe("");
  });

  it("set title", () => {
    state = coreReducer(state, { type: "core/SET_TITLE", payload: "tiii" });

    expect(state.title).toBe("tiii");
    expect(state.user).toBe(null);
  });
});
