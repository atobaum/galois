import ContentType from "./content-type";
import ZettelType from "./zettel-type";

export {};

declare global {
  type Zettel = {
    id: string;
    number: number;
    title: string | null;
    content: string;
    type: ZettelType;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    meta: any;
  };

  type NewZettel = Omit<Zettel, "id" | "number" | "createdAt" | "updatedAt"> &
    Partial<Pick<Zettel, "id" | "number" | "createdAt" | "updatedAt">>;

  type AuthTokens = {
    accessToken: string;
    refreshToken: string;
  };
}
