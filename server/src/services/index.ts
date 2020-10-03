import TypeormZettelRepository from "../domain/zettel/TypeormZettelRepository";
import IUserRepository from "../domain/user/IUserRepository";
import IZettelRepository from "../domain/zettel/IZettelRepository";
import UserService from "./UserService";
import ZettelService from "./ZettelService";
import TypeormUserRepositoy from "../domain/user/TypeormUserRepository";

export const repositories = {
  user: new TypeormUserRepositoy() as IUserRepository,
  zettel: new TypeormZettelRepository() as IZettelRepository,
};

export const services = {
  user: new UserService(repositories.user),
  zettel: new ZettelService(repositories.zettel),
};
