import { State } from './state';
import { Patient, PatientDetails } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT_DETAILS';
      payload: PatientDetails;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'ADD_PATIENT_DETAILS':
      return {
        ...state,
        patientsDetails: {
          ...state.patientsDetails,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (
  patients: Patient[]
): Extract<Action, { type: 'SET_PATIENT_LIST' }> => {
  return { type: 'SET_PATIENT_LIST', payload: patients };
};

export const addPatient = (
  patient: Patient
): Extract<Action, { type: 'ADD_PATIENT' }> => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const addPatientDetails = (
  patient: PatientDetails
): Extract<Action, { type: 'ADD_PATIENT_DETAILS' }> => {
  return { type: 'ADD_PATIENT_DETAILS', payload: patient };
};
