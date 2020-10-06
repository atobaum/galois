export {};

declare global {
  type ContentType = "markdown" | "plain";
  type Zettel = {
    id: number;
    title: string | null;
    content: string;
    contentType?: ContentType;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  };

  type NewZettel = Omit<Zettel, "id" | "createdAt" | "updatedAt">;
}
