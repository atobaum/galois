export type Zettel = {
  id: number;
  title: string | null;
  content: string;
  tags: string[];
  createdAt: Date;
};
