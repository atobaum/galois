import ZettelORM from "./ZettelORM";
import LinkORM from "./LinkORM";
import TagORM from "./TagORM";
import UserORM from "./UserORM";
import RefreshTokenORM from "./RefreshTokenORM";
import RevisionORM from "./RevisionORM";
import SocialAccountORM from "./SocialAccountORM";

const entities = [
  UserORM,
  SocialAccountORM,
  RefreshTokenORM,
  LinkORM,
  ZettelORM,
  RevisionORM,
  TagORM,
];
export default entities;
