import axios from "axios";
import apiWrapper from "./apiWrapper";
const apiURL = process.env.API_URL || "";

export const getCurrentUser = async () => {
  const data = await apiWrapper("/api/user/mine", "GET");
  if (data.status === 200) return data.data;
  else if (data.status === 204) return null;
};
