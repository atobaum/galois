import jwtMiddleware from "../jwtMiddleware";

jest.mock("../../config", () => {
  return {
    jwt: { secret: "test" },
  };
});

describe("jwtMiddleware", () => {
  it("sets user id if token is valid", async (done) => {
    //given

    // exp at 2052.7.12 with id 3
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjAxNzk2OTAzLCJleHAiOjI2MDE4MDA1MDMsInN1YiI6ImFjY2Vzc190b2tlbiJ9.4s-OXQw1PW5eUSDZJmIq0QeZR347Qll5i9RrQQZ1v_o";
    const ctx: any = {
      cookies: {
        get: jest.fn(() => ""),
      },
      request: {
        header: {
          authorization: "Bearer " + token,
        },
      },
      state: {},
    };
    const next = jest.fn();

    // when
    await jwtMiddleware(ctx, next);

    // expect
    expect(ctx.state).toMatchObject({ user: { id: 3 } });
    expect(next).toBeCalled();
    done();
  });

  it("invalid secret", async (done) => {
    //given
    // exp at 2052.7.12 with id 3 , invalid secret(testt)
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjAxNzk2OTAzLCJleHAiOjI2MDE4MDA1MDMsInN1YiI6ImFjY2Vzc190b2tlbiJ9._e5dIHCQhWagBOfY7v4SBV0ewlpHZk8BgZa_40DfnDI";
    const ctx: any = {
      cookies: {
        get: jest.fn(() => ""),
      },
      request: {
        header: {
          authorization: "Bearer " + token,
        },
      },
      state: {},
    };
    const next = jest.fn();

    // when
    await jwtMiddleware(ctx, next);

    // expect
    expect(ctx.status).toBe(401);
    expect(ctx.body).toMatchObject({ code: "INVALID_TOKEN" });
    expect(next).not.toBeCalled();

    done();
  });

  it("malformed jwt", async (done) => {
    //given
    // exp at 2052.7.12 with id 3
    const token = "asdflkjcxvzoi";
    const ctx: any = {
      cookies: {
        get: jest.fn(() => ""),
      },
      request: {
        header: {
          authorization: "Bearer " + token,
        },
      },
      state: {},
    };
    const next = jest.fn();

    // when
    await jwtMiddleware(ctx, next);

    // expect
    expect(ctx.status).toBe(401);
    expect(ctx.body).toMatchObject({ code: "INVALID_TOKEN" });
    expect(next).not.toBeCalled();

    done();
  });

  it("expired token", async (done) => {
    // given
    // exp at 2017
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTAxNzk2OTAzLCJleHAiOjE1MDE3OTY5MDMsInN1YiI6ImFjY2Vzc190b2tlbiJ9.8pJ2HWzVrlOb0jJUY0gJjTSrKqWr4TNuR11wr3so9c0";
    const ctx: any = {
      cookies: {
        get: jest.fn(() => ""),
      },
      request: {
        header: {
          authorization: "Bearer " + token,
        },
      },
      state: {},
    };
    const next = jest.fn();

    // when
    await jwtMiddleware(ctx, next);

    // expect
    expect(ctx.status).toBe(401);
    expect(ctx.body).toMatchObject({ code: "EXPIRED_ACCESS_TOKEN" });
    expect(next).not.toBeCalled();

    done();
  });
});
