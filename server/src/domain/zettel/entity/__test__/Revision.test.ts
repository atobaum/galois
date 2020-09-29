import Revision, { ContentType } from "../Revision";

describe("Revision", () => {
  const newRevision = {
    content: "te",
    type: "md" as ContentType,
    createdAt: new Date("2020-08-08"),
  };

  it("getDTO()", () => {
    const revision = new Revision(newRevision);

    expect(revision.toDTO()).toMatchObject(newRevision);
  });

  it("checks uuid and version", () => {
    expect(() => {
      new Revision({ ...newRevision, uuid: "123" });
    }).toThrow();
    expect(() => {
      new Revision({ ...newRevision, version: 123 });
    }).toThrow();
  });
});
