import axios from "./axios";

export const getUsersGrid = async () => {
  try {
    let res = await axios.get("/auth");
    return res.data;
  } catch (error) {
    return `Somthing went wrong. ${error.message}`;
  }
};
