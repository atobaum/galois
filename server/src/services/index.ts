import TypeormZettelRepository from "@src/domain/zettel/TypeormZettelRepository";
import IUserRepository from "../domain/user/IUserRepository";
import MemoryUserRepository from "../domain/user/MemoryUserRepository";
import IZettelRepository from "../domain/zettel/IZettelRepository";
import UserService from "./UserService";
import ZettelService from "./ZettelService";

export const repositories = {
  user: new MemoryUserRepository() as IUserRepository,
  zettel: new TypeormZettelRepository() as IZettelRepository,
};

export const services = {
  user: new UserService(repositories.user),
  zettel: new ZettelService(),
};
