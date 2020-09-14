import axios from "axios";
import { Zettel } from "../models/Zettel";

export const getZettel = async (id: number | string): Promise<Zettel> => {
  const option: any = {};
  const access_token = window.localStorage.getItem("access_token");
  if (access_token)
    option.headers = { Authorization: "Bearer " + access_token };

  const data = await axios.get("/api/zettel/" + id, option);
  if (data.status === 200) return data.data.zettel;
  else throw new Error("/api/zettels error");
};

export const getZettels = async (): Promise<Zettel[]> => {
  const option: any = {};
  const access_token = window.localStorage.getItem("access_token");
  if (access_token)
    option.headers = { Authorization: "Bearer " + access_token };

  const data = await axios.get("/api/zettels", option);
  if (data.status === 200) return data.data.zettels;
  else throw new Error("/api/zettels error");
};

export const createZettel = async (
  createZettelDTO: Pick<Zettel, "title" | "content" | "tags">
): Promise<Zettel> => {
  const option: any = {};
  const access_token = window.localStorage.getItem("access_token");
  if (access_token)
    option.headers = { Authorization: "Bearer " + access_token };

  const data = await axios.post("/api/zettel", createZettelDTO, option);
  if (data.status === 200) {
    return data.data;
  } else {
    // TODO: error handling
    throw new Error("createZettel error");
  }
};

export const deleteZettel = async (id: number | string): Promise<boolean> => {
  const option: any = {};
  const access_token = window.localStorage.getItem("access_token");
  if (access_token)
    option.headers = { Authorization: "Bearer " + access_token };

  const data = await axios.delete("/api/zettel/" + id, option);
  return true;
};
