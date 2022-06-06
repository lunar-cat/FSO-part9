import { Patient, NonSensitivePatient } from "../types";
import patients from "../../data/patients";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...nonSensitiveProps }) => nonSensitiveProps);
};

export default { getPatients, getNonSensitivePatients };
