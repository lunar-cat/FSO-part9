import { Gender, NewPatient, ReqBodyPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: unknown): param is Gender => {
  if (isString(param)) {
    return ["male", "female"].includes(param);
  }
  return false;
};

const parseName = (name: unknown): string => {};
const parseDateOfBirth = (birthDate: unknown): string => {};
const parseSSN = (ssn: unknown): string => {};
const parseGender = (gender: unknown): Gender => {};
const parseOccupation = (occupation: unknown): string => {};
export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: ReqBodyPatient): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
  };
  return newPatient;
};
