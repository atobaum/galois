import { ContentType } from "../Revision";
import Zettel from "../Zettle";
describe("Zettel", () => {
  const uuid = "394f77b0-7a60-487b-8aa1-11876544897d";
  const newZettelData = {
    title: "title1",
    userId: 2,
    createdAt: new Date("2020-02-02"),
    revision: {
      content: "content1",
      type: "md" as ContentType,
    },
    tags: ["t1"] as string[],
  };

  it("creates", () => {
    const z1 = Zettel.create(newZettelData);
    const z2 = Zettel.create({ ...newZettelData, id: 1 });
    const z3 = Zettel.create({ ...newZettelData, version: 1 });
    const z4 = Zettel.create({ ...newZettelData, id: 1, uuid, version: 3 });

    expect(z1.isRight).toBe(true);
    expect(z2.isLeft).toBe(true);
    expect(z3.isLeft).toBe(true);
    expect(z4.isRight).toBe(true);
  });

  it("addTag", () => {
    const z1OrFail = Zettel.create(newZettelData);
    const z1 = z1OrFail.getRight();
    const z2Fail = z1.addTag("t1");

    expect(z2Fail.isLeft).toBe(true);

    let result = z1.addTag("t2");

    expect(result.isRight).toBe(true);
    expect(z1.toDTO().tags).toEqual(["t1", "t2"]);

    result = z1.addTag("t2");
    expect(result.isLeft);
  });

  it("removeTag", () => {
    const z1 = Zettel.create(newZettelData).getRight();
    let result = z1.removeTag("t2");
    expect(result.isLeft).toBe(true);

    result = z1.removeTag("t1");
    expect(result.isRight).toBe(true);
    expect(result.getRight().toDTO().tags).toHaveLength(0);

    result = z1.removeTag("t1");
    expect(result.isLeft);
  });

  it("태그 지웠다 추가하면 안됨", () => {
    const z1 = Zettel.create(newZettelData).getRight();
    z1.removeTag("t1");
    let result = z1.addTag("t1");
    expect(result.isLeft).toBe(true);
  });

  it("태그 추가했다 지우면 안됨", () => {
    const z1 = Zettel.create(newZettelData).getRight();
    z1.addTag("t2");
    let result = z1.removeTag("t2");
    expect(result.isLeft).toBe(true);
  });

  // TODO 두번 수정 못함
  // it("setRevision", () => {
  //   const z1= Zettel.create(newZettelData).getRight();

  // });

  it("toDTO", () => {
    const zettelOrFail = Zettel.create(newZettelData);
    expect(zettelOrFail.isRight).toBe(true);

    const z = zettelOrFail.getRight();
    z.addTag("t2");

    expect(z.toDTO()).toMatchObject({
      createdAt: newZettelData.createdAt,
      title: newZettelData.title,
      content: newZettelData.revision.content,
      contentType: newZettelData.revision.type,
      tags: ["t1", "t2"],
    });
  });
});
