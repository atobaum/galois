import IValueObject from "../../shared/IValueObject";

type Provider = "google" | "facebook" | "github";

export default class SocialAccount implements IValueObject {
  readonly provider: Provider;
  readonly socialId: string;

  constructor(provider: Provider, socialId: string) {
    this.provider = provider;
    this.socialId = socialId;
  }

  equals(obj: Object) {
    if (obj === this) return true;
    if (!(obj instanceof SocialAccount)) return false;
    return this.provider === obj.provider && this.socialId === obj.socialId;
  }
}
