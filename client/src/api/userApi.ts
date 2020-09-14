import axios from "axios";

export const getCurrentUser = async () => {
  const option: any = {};
  const access_token = window.localStorage.getItem("access_token");
  if (access_token)
    option.headers = { Authorization: "Bearer " + access_token };

  const data = await axios.get("/api/user/mine", option);
  if (data.status === 200) return data.data;
  else if (data.status === 204) return null;
};
