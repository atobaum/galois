import IValueObject from "../../shared/IValueObject";

export type SocialProvider = "google" | "facebook" | "github";

export default class SocialAccount implements IValueObject {
  readonly provider: SocialProvider;
  readonly socialId: string;

  constructor(provider: SocialProvider, socialId: string) {
    this.provider = provider;
    this.socialId = socialId;
  }

  equals(obj: Object) {
    if (obj === this) return true;
    if (!(obj instanceof SocialAccount)) return false;
    return this.provider === obj.provider && this.socialId === obj.socialId;
  }
}
