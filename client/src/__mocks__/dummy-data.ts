import ContentType from "../types/content-type";

export const mockedZettel: Zettel = {
  id: "135a8491-4336-4876-92be-3739686359c5",
  number: 10,
  content: `content
  - list
  - list`,
  createdAt: new Date("2020-08-08"),
  updatedAt: new Date("2020-10-05"),
  tags: ["tag1", "tag2"],
  title: "title",
  contentType: ContentType.MARKDOWN,
  meta: { a: 1 },
};

export const mockedZettels: Zettel[] = [
  {
    id: "e3f977f2-fc40-4a49-baa4-e637fb3536a9",
    number: 1,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: [],
    title: null,
    contentType: ContentType.MARKDOWN,
    meta: { a: 1 },
  },
  {
    id: "e74620c6-1b30-4ba7-88a3-b0e80a9accc8",
    number: 2,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: ["tag1", "tag2"],
    title: "title",
    contentType: ContentType.MARKDOWN,
    meta: { a: 1 },
  },
  {
    id: "740e20a0-35f5-47a1-b8f9-89620cbd6187",
    number: 3,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: ["tag1", "tag2"],
    title: "title",
    contentType: ContentType.MARKDOWN,
    meta: { a: 1 },
  },
  {
    id: "7a477568-19c5-419f-921d-c5cbd3faae0a",
    number: 5,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: ["tag1", "tag2"],
    title: "title",
    contentType: ContentType.MARKDOWN,
    meta: { a: 1 },
  },
  {
    id: "70b02434-53be-4bf7-a25f-a44952362688",
    number: 6,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: ["tag1", "tag2"],
    title: "title",
    contentType: ContentType.MARKDOWN,
    meta: { a: 1 },
  },
];

export const mockedNewZettels: NewZettel[] = [
  {
    content: "new zettel",
    tags: ["tag1", "가나다"],
    title: "title",
    contentType: ContentType.MARKDOWN,
    meta: { a: 1 },
  },
  {
    content: "new zettel11",
    tags: ["tag2"],
    title: null,
    contentType: ContentType.MARKDOWN,
    meta: { a: 1 },
  },
];
