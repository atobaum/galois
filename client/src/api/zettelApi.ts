import axios from "axios";
import { Zettel } from "../models/Zettel";
import apiWrapper from "./apiWrapper";

export const getZettel = async (id: number | string): Promise<Zettel> => {
  const data = await apiWrapper("/api/zettel/" + id, "GET");
  if (data.status === 200) return data.data.zettel;
  else throw new Error("/api/zettels error");
};

export const getZettels = async (): Promise<Zettel[]> => {
  const data = await apiWrapper("/api/zettels", "GET");
  if (data.status === 200) return data.data.zettels;
  else throw new Error("/api/zettels error");
};

export const createZettel = async (
  createZettelDTO: Pick<Zettel, "title" | "content" | "tags">
): Promise<Zettel> => {
  const data = await apiWrapper("/api/zettel", "POST", {
    data: createZettelDTO,
  });
  if (data.status === 200) {
    return data.data;
  } else {
    // TODO: error handling
    throw new Error("createZettel error");
  }
};

export const deleteZettel = async (id: number | string): Promise<boolean> => {
  const data = await apiWrapper("/api/zettel/" + id, "DELETE");
  return true;
};
