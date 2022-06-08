export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: { startDate: string; endDate: string };
}
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: { date: string; criteria: string };
}
export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
export interface ReqBodyPatient {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
}
export type NewPatient = Omit<Patient, "id">;
