import "jest-localstorage-mock";

import fetchMock from "jest-fetch-mock";
import customFetch from "../customFetch";
import logout from "../logout";

// const
const validAccessToken = "validAccessToken";
const validRefreshToken = "validRefreshToken";
const validAuthorization = "Bearer " + validAccessToken;
const validResponseBody = {
  ok: 1,
};

const expiredAccessTokenResponseBody = {
  code: "EXPIRED_ACCESS_TOKEN",
};

// util function
function setAuthTokensToLocalStorage(
  accessToken: string,
  refreshToken: string
) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

// mock
jest.mock("../refreshTokens", () =>
  jest.fn((refreshToken) => {
    if (refreshToken === "validRefreshToken")
      return Promise.resolve({ accessToken: "newAccessToken", refreshToken });
    else return Promise.resolve(null);
  })
);
jest.mock("../logout", () => jest.fn());

describe("customFetch", () => {
  beforeAll(() => {
    fetchMock.enableMocks();
    fetch.mockResponse((req: any) => {
      const authorization = req.headers.get("authorization");
      if (authorization) {
        if (
          authorization === validAuthorization ||
          authorization === "Bearer newAccessToken"
        )
          return Promise.resolve({ body: JSON.stringify(validResponseBody) });
        else {
          return Promise.resolve({
            body: JSON.stringify(expiredAccessTokenResponseBody),
            init: {
              status: 401,
            },
          });
        }
      } else {
        return Promise.resolve({ body: JSON.stringify(validResponseBody) });
      }
    });
  });

  beforeEach(() => {
    logout.mockClear();
  });

  it("is same as fetch if error is not occured", async () => {
    // when
    const response = await customFetch("http://localhost");

    //then
    expect(response.status).toBe(200);
    expect(response.json()).resolves.toEqual(validResponseBody);
  });

  it("is same as fetch response if statusCode is not 401", async () => {
    // given
    fetch.mockOnce(JSON.stringify(validResponseBody), {
      status: 402,
    });

    // when
    const response = await customFetch("http://localhost");

    //then
    expect(response.status).toBe(402);
    await expect(response.json()).resolves.toEqual(validResponseBody);
  });

  describe("try to refresh token if access token expired", () => {
    it("refetches if success", async () => {
      // given
      setAuthTokensToLocalStorage("invalidAccessToken", validRefreshToken);

      // when
      const response = await customFetch("http://localhost", {
        headers: { authorization: "invalid" },
      });

      //then
      expect(response.status).toBe(200);
      expect(localStorage.getItem("access_token")).toBe("newAccessToken");
      await expect(response.json()).resolves.toEqual(validResponseBody);
    });

    it("calls logout() if failed", async () => {
      // given
      setAuthTokensToLocalStorage("invalidAccessToken", "invalidRefreshToken");

      // when
      const response = await customFetch("http://localhost", {
        headers: {
          authorization: "invalid",
        },
      });

      //then
      expect(response.status).toBe(401);
      await expect(logout).toBeCalled();
    });
  });
});
