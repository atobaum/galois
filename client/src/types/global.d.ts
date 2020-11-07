import ContentType from "./content-type";

export {};

declare global {
  type Zettel = {
    id: string;
    number: number;
    title: string | null;
    content: string;
    contentType: ContentType;
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
