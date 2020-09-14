import ZettelDAO from "./ZettelDAO";
import LinkDAO from "./LinkDAO";
import TagDAO from "./TagDAO";
import UserDAO from "./UserDAO";
import RefreshToken from "./RefreshTokenDAO";
import Revision from "./RevisionDAO";
import SocialAccount from "./SocialAccountDAO";

const entities = [
  UserDAO,
  SocialAccount,
  RefreshToken,
  LinkDAO,
  ZettelDAO,
  Revision,
  TagDAO,
];
export default entities;
