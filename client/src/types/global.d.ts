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
  };

  type NewZettel = Omit<Zettel, "id" | "number" | "createdAt" | "updatedAt">;
}