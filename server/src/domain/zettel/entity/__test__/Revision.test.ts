import Revision from "../Revision";
import { ContentType } from "../Zettle";

describe("Revision", () => {
  const newRevision = {
    content: "te",
    version: 1,
    type: ContentType.MARKDOWN,
    createdAt: new Date("2020-08-08"),
  };

  it("getDTO()", () => {
    const revision = new Revision(newRevision);

    expect(revision.toDTO()).toMatchObject(newRevision);
  });

  it("sets uuid", () => {
    const revision = new Revision(newRevision);
    const uuid = "394f77b0-7a60-487b-8aa1-11876544897d";

    revision.setUUID(uuid);
    expect(revision.isNew()).toBe(false);
    expect(revision.toDTO().uuid).toBe(uuid);
  });
});
