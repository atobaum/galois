import { ContentType } from "../Revision";
import Zettel from "../Zettle";
import "@src/test/custom-matcher";

describe("Zettel", () => {
  const newZettelData = {
    title: "title1",
    userId: 2,
    createdAt: new Date("2020-02-02"),
    content: "content1",
    contentType: "md" as ContentType,
    tags: ["t1"] as string[],
  };
  const invalidUpdatedAt = new Date("2020-02-01");
  const validUpdatedAt = new Date("2020-02-03");

  it("creates", () => {
    const z1 = Zettel.create(newZettelData);
    const z2 = Zettel.create({
      ...newZettelData,
      id: "ee27cd72-5a65-4aa9-8442-698a042de470",
      number: 1,
      updatedAt: validUpdatedAt,
    });
    const z3 = Zettel.create({
      ...newZettelData,
      id: "7a163fa0-1578-431c-9f8b-315ac0268f50",
      number: 2,
    });
    const z4 = Zettel.create({
      ...newZettelData,
      id: "87064b0a-b8a7-4235-a945-7d80f196cb2f",
      number: 3,
      updatedAt: invalidUpdatedAt,
    });

    expect(z1).toBeRight();
    expect(z2).toBeRight();
    expect(z3).toBeLeft();
    expect(z4).toBeLeft();
  });

  it("edit contents", () => {
    const z1 = Zettel.create(newZettelData).getRight();
    let result = z1.updateContent("new content1", "plain");
    result = z1.updateContent("new content2", "plain");

    expect(result).toBeRight();

    const dto = z1.toDTO();
    expect(dto.content).toBe("new content2");
    expect(dto.contentType).toBe("plain");
    expect(z1.getChanges()).toContainEqual([
      "UPDATE_CONTENT",
      {
        content: newZettelData.content,
        contentType: "md",
      },
    ]);
  });

  it("edit title", () => {
    const z1 = Zettel.create(newZettelData).getRight();
    let result = z1.updateTitle("new title");
    result = z1.updateTitle("new title");

    expect(result).toBeRight();

    const dto = z1.toDTO();
    expect(dto.title).toBe("new title");
    expect(z1.getChanges()).toContainEqual([
      "UPDATE_TITLE",
      newZettelData.title,
    ]);
  });

  it("addTag", () => {
    const z1 = Zettel.create(newZettelData).getRight();

    const z2Fail = z1.addTag("t1");
    expect(z2Fail).toBeLeft();

    let result = z1.addTag("t2");
    expect(result).toBeRight();
    expect(z1.toDTO().tags).toEqual(["t1", "t2"]);
    expect(z1.getChanges()).toContainEqual([
      "ADD_TAG",
      expect.objectContaining({ name: "t2" }),
    ]);

    result = z1.addTag("t2");
    expect(result).toBeLeft();
  });

  it("removeTag", () => {
    const z1 = Zettel.create(newZettelData).getRight();
    let result = z1.removeTag("t2");
    expect(result).toBeLeft();

    result = z1.removeTag("t1");
    expect(result).toBeRight();
    expect(result.getRight().toDTO().tags).toHaveLength(0);
    expect(z1.getChanges()).toContainEqual([
      "REMOVE_TAG",
      expect.objectContaining({ name: "t1" }),
    ]);

    result = z1.removeTag("t1");
    expect(result).toBeLeft();
  });

  it("태그 지웠다 추가하면 안됨", () => {
    const z1 = Zettel.create(newZettelData).getRight();
    z1.removeTag("t1");
    let result = z1.addTag("t1");
    expect(result).toBeLeft();
  });

  it("태그 추가했다 지우면 안됨", () => {
    const z1 = Zettel.create(newZettelData).getRight();
    z1.addTag("t2");
    let result = z1.removeTag("t2");
    expect(result).toBeLeft();
  });

  it("toDTO", () => {
    const zettelOrFail = Zettel.create(newZettelData);
    expect(zettelOrFail.isRight).toBe(true);

    const z = zettelOrFail.getRight();
    z.addTag("t2");

    expect(z.toDTO()).toMatchObject({
      createdAt: newZettelData.createdAt,
      title: newZettelData.title,
      content: newZettelData.content,
      contentType: newZettelData.contentType,
      tags: ["t1", "t2"],
    });
  });
});
