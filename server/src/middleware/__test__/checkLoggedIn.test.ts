import checkLoggedIn from "../checkLoggedIn";

describe("checkLoggedIn", () => {
  it("로그인 했을 때", async (done) => {
    const ctx: any = {
      state: {
        user: {
          id: 1,
        },
      },
    };

    const next = jest.fn();
    await checkLoggedIn(ctx, next);
    expect(next).toBeCalled();

    done();
  });

  it("로그인 안 했을 때", async (done) => {
    const ctx: any = {
      state: {},
    };

    const next = jest.fn();
    await checkLoggedIn(ctx, next);
    expect(next).not.toBeCalled();
    expect(ctx).toMatchObject({ status: 401 });

    done();
  });
});
