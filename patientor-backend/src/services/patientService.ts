import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types";
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

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const id: string = uuid();
  const newEntry: Entry = { id, ...entry };
  const patient = patients.find((patient) => patient.id === patientId);
  if (!patient) throw new Error("Patient with provided ID doesn't exists");
  patient.entries.push(newEntry);
  return newEntry;
};
export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry,
};
