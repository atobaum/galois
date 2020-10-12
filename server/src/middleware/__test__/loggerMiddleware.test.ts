import koaLogger from "../loggerMiddleware";

describe("loggerMiddleware", () => {
  const logger = {
    log: jest.fn(),
  };
  const middleware = koaLogger(logger);
  const next = jest.fn();

  beforeEach(() => {
    logger.log.mockReset();
    next.mockReset();
  });

  it("500번대 error log", async (done) => {
    const ctx: any = { status: 501, originalUrl: "/testurl", method: "GET" };
    await middleware(ctx, next);

    expect(logger.log).toBeCalledWith(
      "error",
      expect.stringMatching(/originalUrl/)
    );
    done();
  });

  it("400번대 error log", async (done) => {
    const ctx: any = { status: 401, originalUrl: "/testurl", method: "GET" };
    await middleware(ctx, next);

    expect(logger.log).toBeCalledWith("warn", expect.stringMatching(/GET/));
    done();
  });

  it("200번대 error log", async (done) => {
    const ctx: any = { status: 200, originalUrl: "/testurl", method: "GET" };
    await middleware(ctx, next);

    expect(logger.log).toBeCalledWith("info", expect.stringMatching(/GET/));
    done();
  });
});
