import axios from "./axios";

//fetching admission for data table(datagrid)
export const getAdmissionGrid = async () => {
  try {
    let res = await axios.get("/admission");
    return res.data;
  } catch (error) {
    return `Something went wrong: ${error.message}`;
  }
};
