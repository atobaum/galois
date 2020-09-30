import Revision, { ContentType } from "../Revision";

describe("Revision", () => {
  const newRevision = {
    content: "te",
    version: 1,
    type: "md" as ContentType,
    createdAt: new Date("2020-08-08"),
  };

  it("getDTO()", () => {
    const revision = new Revision(newRevision);

    expect(revision.toDTO()).toMatchObject(newRevision);
  });
});
