import axios from "axios";

export const getCurrentUser = async () => {
  const data = await axios.get("/api/user/mine");
  if (data.status === 200) return data.data;
};
