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
export const getPatient =  async (id) =>{
  try {
    const res = await axios.get(`/patient/${id}`);
    const data = await res.data
    return data
  } catch (error) {
    return `Something went wrong:  ${error}`;
  }
}