export const mockedZettel: Zettel = {
  id: 1,
  content: "content",
  createdAt: new Date("2020-08-08"),
  updatedAt: new Date("2020-10-05"),
  tags: ["tag1", "tag2"],
  title: "title",
  contentType: "markdown",
};

export const mockedZettels: Zettel[] = [
  {
    id: 3,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: [],
    title: null,
    contentType: "markdown",
  },
  {
    id: 4,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: ["tag1", "tag2"],
    title: "title",
    contentType: "markdown",
  },
  {
    id: 2,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: ["tag1", "tag2"],
    title: "title",
    contentType: "markdown",
  },
  {
    id: 10,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: ["tag1", "tag2"],
    title: "title",
    contentType: "markdown",
  },
  {
    id: 11,
    content: "content",
    createdAt: new Date("2020-08-08"),
    updatedAt: new Date("2020-10-05"),
    tags: ["tag1", "tag2"],
    title: "title",
    contentType: "markdown",
  },
];

export const mockedNewZettels: NewZettel[] = [
  {
    content: "new zettel",
    tags: ["tag1", "가나다"],
    title: "title",
    contentType: "markdown",
  },
  {
    content: "new zettel11",
    tags: ["tag2"],
    title: null,
    contentType: "markdown",
  },
];
