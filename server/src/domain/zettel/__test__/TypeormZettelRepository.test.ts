import postgrasqlLoader from "../../../loaders/postgresqlLoader";
import initState from "../../../test/initState";
import TypeormZettelRepository from "../TypeormZettelRepository";
import "@src/test/custom-matcher";
import Zettel, { ZettelType } from "../entity/Zettle";

const existedZettel = initState.zettel;
const existedUser = initState.user;

beforeAll(async () => {
  await postgrasqlLoader();
});

describe("TypeormZettelRepository", () => {
  const repo = new TypeormZettelRepository();

  it("findById", async () => {
    const zettel = await repo.findById(existedZettel.id);

    expect(zettel).toBeRight();
    expect(zettel.getRight().id).toBe(existedZettel.id);
    expect(zettel.getRight().toDTO()).toMatchObject({
      content: existedZettel.content,
    });
  });

  it("findAll", async () => {
    const zettelsOrFail = await repo.findAll({ userId: 1, limit: 10 });
    expect(zettelsOrFail).toBeRight();

    const colelction = zettelsOrFail.getRight();
    expect(colelction.data.length).toBeLessThanOrEqual(10);
  });

  it("creates new zettel", async () => {
    const created = new Date("2020-08-08T12:03:02");
    const zettelOrFail = Zettel.create({
      title: "new zettel",
      userId: existedUser.id,
      createdAt: created,
      content: "enw zettel content",
      type: ZettelType.NOTE,
      tags: [],
      meta: { draft: true },
    });

    expect(zettelOrFail.getRight());
    const zettel = zettelOrFail.getRight();

    const result = await repo.save(zettel);
    expect(result).toBeRight();

    const id = result.getRight();
    const getZettelOrFail = await repo.findById(id);
    expect(getZettelOrFail).toBeRight();
    const dto = getZettelOrFail.getRight().toDTO();
    expect(dto.title).toBe("new zettel");
    expect(dto.meta).toMatchObject({ draft: true });
  });

  it("update content", async (done) => {
    // given
    const zettel = (await repo.findById(existedZettel.id)).getRight();
    const updatedAt = zettel.toDTO().updatedAt;

    // when
    zettel.updateContent("new content content");
    let result: any = await repo.save(zettel);

    // then
    expect(result).toBeRight();
    expect(zettel.toDTO().updatedAt).not.toEqual(updatedAt);

    result = await repo.findById(existedZettel.id);
    expect(result).toBeRight();

    const updatedZettel: Zettel = result.getRight();
    const newDto = updatedZettel.toDTO();
    expect(updatedZettel.equals(zettel)).toBe(true);
    expect(newDto.content).toBe("new content content");

    done();
  });

  it("update tags", async (done) => {
    const zettel = (await repo.findById(existedZettel.id)).getRight();
    const updatedAt = zettel.toDTO().updatedAt;

    zettel.addTag("newt1");
    zettel.removeTag("t1");
    zettel.addTag("newt2");
    let result: any = await repo.save(zettel);

    expect(result).toBeRight();
    expect(zettel.toDTO().tags).toContain("newt1");
    expect(zettel.toDTO().tags).not.toContain("t1");
    expect(zettel.toDTO().tags).toContain("newt2");

    result = await repo.findById(existedZettel.id);
    expect(result).toBeRight();

    const updatedZettel: Zettel = result.getRight();
    const newDto = updatedZettel.toDTO();
    expect(updatedZettel.equals(zettel)).toBe(true);
    expect(newDto.tags).toContain("newt1");
    expect(newDto.tags).not.toContain("t1");
    expect(newDto.tags).toContain("newt2");

    done();
  });

  it("update meta data", async (done) => {
    const zettel = (await repo.findById(existedZettel.id)).getRight();

    zettel.setMeta("newMeta", 123);
    let result: any = await repo.save(zettel);

    result = await repo.findById(existedZettel.id);
    expect(result).toBeRight();

    const updatedZettel: Zettel = result.getRight();
    const newDto = updatedZettel.toDTO();
    expect(updatedZettel.getMeta("newMeta")).toBe(123);

    done();
  });
});
//   findByTag(tag: string): Promise<Zettel[]> {
//     throw new Error("Method not implemented.");
//   }
//   delete(id: number): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
