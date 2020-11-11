import "jest-localstorage-mock";
import logout from "../logout";

describe("logout", () => {
  beforeEach(() => {
    location.reload = jest.fn();
    localStorage.clear();
  });

  it("clears localStorage", () => {
    localStorage.setItem("access_token", "expiredAccessToken");
    localStorage.setItem("refresh_token", "refreshToken");

    logout();
    expect(localStorage.length).toBe(0);
  });

  it("reloads if user logged in", () => {
    localStorage.setItem("access_token", "expiredAccessToken");

    logout();
    expect(location.reload).toBeCalled();
  });

  it("does not reload if user not logged in", () => {
    logout();
    expect(location.reload).not.toBeCalled();
  });
});
