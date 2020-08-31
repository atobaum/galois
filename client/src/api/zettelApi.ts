import axios from "axios";
import { Zettel } from "../models/Zettel";

export const getZettels = async (): Promise<Zettel[]> => {
  const data = await axios.get("/api/zettels");
  if (data.status === 200) return data.data.zettels;
  else throw new Error("/api/zettels error");
};
