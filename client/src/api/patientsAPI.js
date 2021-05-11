import axios from "./axios";

//fetch patients for the patient's grid
export const getPatientGrid = async () => {
  try {
    const res = await axios.get("/patient");
    return res.data;
  } catch (err) {
    return `Something went wrong:  ${err}`;
  }
};
