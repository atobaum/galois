import postgrasqlLoader from "../../../loaders/postgresqlLoader";
import initState from "../../../test/initState";
import TypeormZettelRepository from "../TypeormZettelRepository";
import "@src/test/custom-matcher";
import Zettel from "../entity/Zettle";

const existedZettel = initState.zettel;

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
      contentType: existedZettel.contentType,
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
      userId: 1,
      createdAt: created,
      revision: {
        content: "enw zettel content",
        type: "plain",
      },
      tags: [],
    });

    expect(zettelOrFail.getRight());
    const zettel = zettelOrFail.getRight();

    const result = await repo.save(zettel);
    expect(result).toBeRight();

    const id = result.getRight();
    expect(id).toBeGreaterThan(0);
    const getZettelOrFail = await repo.findById(id);
    expect(getZettelOrFail).toBeRight();
    const createdZettel = getZettelOrFail.getRight();
    expect(createdZettel.toDTO().title).toBe("new zettel");

    //   save(entity: Zettel): Promise<number> {
    //     throw new Error("Method not implemented.");
    //   }
  });
});
//   findByTag(tag: string): Promise<Zettel[]> {
//     throw new Error("Method not implemented.");
//   }
//   delete(id: number): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
