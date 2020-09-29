import IUserRepository from "../domain/user/IUserRepository";
import MemoryUserRepository from "../domain/user/MemoryUserRepository";
import IZettelRepository from "../domain/zettel/IZettelRepository";
import ZettelRepositoryTypeORMImpl from "../domain/zettel/ZettelRepositoryTypeORMImpl";
import UserService from "./UserService";
import ZettelService from "./ZettelService";

export const repositories = {
  user: new MemoryUserRepository() as IUserRepository,
  zettel: new ZettelRepositoryTypeORMImpl() as IZettelRepository,
};

export const services = {
  user: new UserService(repositories.user),
  zettel: new ZettelService(),
};
