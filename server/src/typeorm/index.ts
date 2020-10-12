import ZettelORM from "./ZettelORM";
import LinkORM from "./LinkORM";
import TagORM from "./TagORM";
import UserORM from "./UserORM";
import RefreshTokenORM from "./RefreshTokenORM";
import SocialAccountORM from "./SocialAccountORM";

const entities = [
  UserORM,
  SocialAccountORM,
  RefreshTokenORM,
  LinkORM,
  ZettelORM,
  TagORM,
];
export default entities;
