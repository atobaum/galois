import jwtMiddleware from "../jwtMiddleware";

jest.mock("../../config", () => {
  return {
    jwt: { secret: "test" },
  };
});

describe("jwtMiddleware", () => {
  it("sets user id if token is valid", async (done) => {
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

    await jwtMiddleware(ctx, next);

    expect(ctx.state).toMatchObject({ user: { id: 3 } });
    done();
  });

  it("throws error if secret is wrong", async (done) => {
    // exp at 2052.7.12 with id 3 , invalid secret
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjAxNzk2OTAzLCJleHAiOjI2MDE4MDA1MDMsInN1YiI6ImFjY2Vzc190b2tlbiJ9.R9RmEWtbEFwAii-r0ip1OGL5xNZUbfSPWDOSCsnwot0";

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
    await expect(jwtMiddleware(ctx, next)).rejects.toThrow();

    done();
  });

  it("does nothing if token is invalid", async (done) => {
    // exp at 2017
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTAxNzk2OTAzLCJleHAiOjE1MDE3OTY5MDMsInN1YiI6ImFjY2Vzc190b2tlbiJ9.lDAEtDIUa3kEpIzepf89aJmRgLdTyOXlifBDMmCUfNc";

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
    expect(ctx.state.user).toBe(undefined);
    done();
  });
});
