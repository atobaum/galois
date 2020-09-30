import postgrasqlLoader from "../../../loaders/postgresqlLoader";
import initState from "../../../test/initState";
import TypeormZettelRepository from "../TypeormZettelRepository";
import "@src/test/custom-matcher";

const existedZettel = initState.zettel;

beforeAll(async () => {
  await postgrasqlLoader();
});

describe("TypeormZettelRepository", () => {
  const repo = new TypeormZettelRepository();

  it("find", async () => {
    const zettel = await repo.findById(existedZettel.id);
    expect(zettel).toBeRight();
    expect(zettel.getRight().id).toBe(existedZettel.id);
    expect(zettel.getRight().toDTO()).toMatchObject({
      content: existedZettel.content,
      contentType: existedZettel.contentType,
    });
  });
});
//   findAll(args: { userId: number; id?: number | undefined; version?: number | undefined; uuid?: string | undefined; }): Promise<Zettel[]> {
//     throw new Error("Method not implemented.");
//   }
//   findByTag(tag: string): Promise<Zettel[]> {
//     throw new Error("Method not implemented.");
//   }
//   findById(id: number, option?: any): Promise<Zettel | null> {
//     throw new Error("Method not implemented.");
//   }
//   save(entity: Zettel): Promise<number> {
//     throw new Error("Method not implemented.");
//   }
//   delete(id: number): Promise<void> {
//     throw new Error("Method not implemented.");
//   }
