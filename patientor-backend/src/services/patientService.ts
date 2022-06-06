import { Patient, NonSensitivePatient, NewPatient } from "../types";
import patients from "../../data/patients";
import uuid = require("uuid");

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...nonSensitiveProps }) => nonSensitiveProps);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { id: uuid.v1(), ...patient };
  patients.push(newPatient);
  return newPatient;
};
export default { getPatients, getNonSensitivePatients, addPatient };
