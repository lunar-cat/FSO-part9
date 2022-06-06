export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}
export type NonSensitivePatient = Omit<Patient, "ssn">;
export interface ReqBodyPatient {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
}
export type NewPatient = Omit<Patient, "id">;
