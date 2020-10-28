import RefreshTokenORM from "../../../typeorm/RefreshTokenORM";
import { getManager } from "typeorm";
import TypeormRefreshTokenRepository from "../TypeormRefreshTokenRepository";
import RefreshToken from "../entity/RefreshToken";
import postgrasqlLoader from "../../../loaders/postgresqlLoader";
import "@src/test/custom-matcher";
import initState from "../../../test/initState";

let id: number;
beforeAll(async () => {
  await postgrasqlLoader();
  const token = new RefreshTokenORM();
  token.fk_user_id = initState.user.id;

  const manager = getManager();
  await manager.save(token);
  id = token.id;
});

describe("TypeormRefreshTokenRepository", () => {
  const repo = new TypeormRefreshTokenRepository();
  it("findById", async (done) => {
    const token = await repo.findById(id);

    expect(token).toBeRight();
    expect(token.getRight().id).toBe(id);

    done();
  });

  it("save new token", async (done) => {
    const userId = initState.user.id;
    const token = RefreshToken.generate(userId);

    const id = await repo.save(token);
    expect(id).toBeRight();

    const savedToken = await repo.findById(id.getRight());
    expect(savedToken).toBeRight();
    expect(savedToken.getRight().id).toBe(id.getRight());
    expect(
      savedToken.flatMap((token) => token.validateUser(userId))
    ).toBeRight();

    done();
  });

  it("save changed token", async (done) => {
    const token = await repo.findById(id);

    done();
  });
});
