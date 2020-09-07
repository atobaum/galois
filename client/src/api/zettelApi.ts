import axios from "axios";
import { Zettel } from "../models/Zettel";

export const getZettels = async (): Promise<Zettel[]> => {
  const data = await axios.get("/api/zettels");
  if (data.status === 200) return data.data.zettels;
  else throw new Error("/api/zettels error");
};

export const createZettel = async (
  createZettelDTO: Pick<Zettel, "title" | "content" | "tags">
): Promise<Zettel> => {
  const data = await axios.post("/api/zettel", createZettelDTO);
  if (data.status === 200) {
    return data.data;
  } else {
    // TODO: error handling
    throw new Error("createZettel error");
  }
};
