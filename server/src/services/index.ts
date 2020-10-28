import TypeormZettelRepository from "../domain/zettel/TypeormZettelRepository";
import IUserRepository from "../domain/user/IUserRepository";
import IZettelRepository from "../domain/zettel/IZettelRepository";
import UserService from "./UserService";
import ZettelService from "./ZettelService";
import TypeormUserRepositoy from "../domain/user/TypeormUserRepository";
import TypeormRefreshTokenRepository from "../domain/refreshtoken/TypeormRefreshTokenRepository";
import IRefreshTokenRepository from "../domain/refreshtoken/IRefreshTokenRepository";

export const repositories = {
  user: new TypeormUserRepositoy() as IUserRepository,
  zettel: new TypeormZettelRepository() as IZettelRepository,
  refreshToken: new TypeormRefreshTokenRepository() as IRefreshTokenRepository,
};

export const services = {
  user: new UserService(repositories.user, repositories.refreshToken),
  zettel: new ZettelService(repositories.zettel),
};
