import axios from "./axios";

//fetching appointments for data table(datagrid)
export const getAppoitmentGrid = async () => {
  try {
    let res = await axios.get("/appointment");
    return res.data;
  } catch (error) {
    return `Something went wrong: ${error.message}`;
  }
};
