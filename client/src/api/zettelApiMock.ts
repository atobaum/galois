import { Zettel } from "../models/Zettel";

export const getZettels = async (): Promise<Zettel[]> => {
  return [
    {
      id: 1,
      uuid: "uuid1",
      version: 1,
      createdAt: new Date(),
      content: "test1",
      tags: ["inbox", "tag1"],
      title: null,
    },
    {
      id: 2,
      uuid: "uuid2",
      version: 2,
      createdAt: new Date(),
      content: "test2",
      tags: ["tag2"],
      title: null,
    },
    {
      id: 3,
      uuid: "uuid3",
      version: 3,
      createdAt: new Date(),
      content: "test3",
      tags: ["tag3"],
      title: null,
    },
    {
      id: 4,
      uuid: "uuid4",
      version: 4,
      createdAt: new Date(),
      content: "test4",
      tags: ["tag4", "inbox"],
      title: "title",
    },
  ];
};
