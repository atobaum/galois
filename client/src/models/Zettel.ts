export type Zettel = {
  id: number;
  title: string | null;
  content: string;
  contentType?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};
