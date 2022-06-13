import {
  Entry,
  Gender,
  NewPatient,
  ReqBodyPatient,
  ReqBodyEntry,
  NewEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isNumber = (param: unknown): param is number => {
  return !isNaN(Number(param));
};
const isGender = (param: unknown): param is Gender => {
  if (isString(param)) {
    const genderValues: string[] = Object.values(Gender);
    return genderValues.includes(param);
  }
  return false;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date");
  }
  return dateOfBirth;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};
const isEntry = (entries: unknown): entries is Entry[] => {
  if (Array.isArray(entries)) {
    const entryTypes = ["HealthCheck", "OccupationalHealthcare", "Hospital"];
    const areValidEntries = entries.every(({ type }: { type: unknown }) => {
      if (type && isString(type) && entryTypes.includes(type)) {
        return true;
      }
      return false;
    });
    if (areValidEntries) return true;
    return false;
  }
  return false;
};
const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !isEntry(entries)) {
    throw new Error("Incorrect or missing entries");
  }
  return entries;
};
export const toNewPatient = (body: ReqBodyPatient): NewPatient => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = body;
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries),
  };
  return newPatient;
};

const isBaseEntry = (entry: ReqBodyEntry): boolean => {
  if (!entry.date || !entry.description || !entry.specialist || !entry.type) {
    return false;
  }
  console.log("pass isBaseEntry");
  return true;
};
const isHealthEntry = (entry: ReqBodyEntry): entry is NewEntry => {
  if (entry.type && entry.type === "HealthCheck") {
    if (isNumber(entry.healthCheckRating)) {
      console.log(
        "isHealEntry",
        Number(entry.healthCheckRating),
        [0, 1, 2, 3].includes(Number(entry.healthCheckRating))
      );
      return [0, 1, 2, 3].includes(Number(entry.healthCheckRating));
    }
    return false;
  }
  return false;
};
const isOccupationalEntry = (entry: ReqBodyEntry): entry is NewEntry => {
  if (entry.type && entry.type === "OccupationalHealthcare") {
    if (entry.employerName && isString(entry.employerName)) {
      console.log("isOccupationalEntry");
      return true;
    }
    return false;
  }
  return false;
};
const isHospitalEntry = (entry: ReqBodyEntry): entry is NewEntry => {
  if (entry.type && entry.type === "Hospital") {
    type discharge = { date: string; criteria: string };
    if (
      entry.discharge &&
      (entry.discharge as discharge).date &&
      (entry.discharge as discharge).criteria &&
      isString((entry.discharge as discharge).date) &&
      isString((entry.discharge as discharge).criteria)
    ) {
      console.log("isHospital");
      return true;
    }
    return false;
  }
  return false;
};
const parseEntry = (entry: ReqBodyEntry): NewEntry => {
  if (
    entry.type &&
    isBaseEntry(entry) &&
    (isHealthEntry(entry) ||
      isOccupationalEntry(entry) ||
      isHospitalEntry(entry))
  ) {
    return entry;
  }
  throw new Error("Incorrect or missing properties from entry");
};
export const toNewEntry = (body: ReqBodyEntry): NewEntry => {
  const entry: NewEntry = parseEntry(body);
  return entry;
};
