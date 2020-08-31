import { Zettel } from "../models/Zettel";

export const getZettels = async (): Promise<Zettel[]> => {
  return [
    {
      id: 1,
      content: "test1",
      tags: ["inbox", "tag1"],
      title: null,
    },
    {
      id: 2,
      content: "test2",
      tags: ["tag2"],
      title: null,
    },
    {
      id: 3,
      content: "test3",
      tags: ["tag3"],
      title: null,
    },
    {
      id: 4,
      content: "test4",
      tags: ["tag4", "inbox"],
      title: "title",
    },
  ];
};
