import { isUUID } from "../utils";

describe("isUUID", () => {
  const valid = [
    "479824fa-3c98-4b8f-bcdb-7ffd4771ba78",
    "c2aec739-6b53-450a-bd37-453fb98d50fa",
    "6d3e0e28-847b-45ad-adc1-ce4569a0fbea",
  ];

  const invalid = [
    "2aec739-6b53-450a-bd37-453fb98d50fa",
    "c2aec739-6b53450a-bd37-453fb98d50fa",
    "asdf",
  ];
  it("valid", () => {
    valid.forEach((uuid) => expect(isUUID(uuid)).toBe(true));
  });

  it("invalid", () => {
    invalid.forEach((uuid) => expect(isUUID(uuid)).toBe(false));
  });
});
