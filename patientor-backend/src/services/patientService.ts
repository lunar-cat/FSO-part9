import { Patient, NonSensitivePatient, NewPatient } from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, ...nonSensitiveProps }) => nonSensitiveProps);
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  console.log(id);
  const newPatient: Patient = { id, ...patient };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((patiend) => patiend.id === id);
};
export default { getPatients, getNonSensitivePatients, addPatient, getPatient };
