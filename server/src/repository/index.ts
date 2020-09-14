import UserRepositoryPostgres, { UserRepository } from "./userRepository";
import ZettelRepositoryPostgresql, {
  ZettelRepository,
} from "./zettelRepository";

export default {
  userRepository: new UserRepositoryPostgres(),
  zettelRepository: new ZettelRepositoryPostgresql(),
} as {
  userRepository: UserRepository;
  zettelRepository: ZettelRepository;
};
