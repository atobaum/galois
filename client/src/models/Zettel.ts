export type Zettel = {
  uuid: string;
  id: number;
  version: number;
  title: string | null;
  content: string;
  tags: string[];
  createdAt: Date;
};
