import { State } from './state';
import { Diagnosis, Entry, Patient, PatientDetails } from '../types';

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
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_PATIENT_ENTRY';
      payload: { entry: Entry; patientId: Patient['id'] };
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
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: {
          ...state.diagnoses,
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          )
        }
      };
    case 'ADD_PATIENT_ENTRY': {
      const patient = state.patientsDetails[action.payload.patientId];
      return {
        ...state,
        patientsDetails: {
          ...state.patientsDetails,
          [action.payload.patientId]: {
            ...patient,
            entries: patient.entries.concat(action.payload.entry)
          }
        }
      };
    }
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

export const setDiagnosisList = (
  diagnoses: Diagnosis[]
): Extract<Action, { type: 'SET_DIAGNOSIS_LIST' }> => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnoses };
};

export const addPatientEntry = (
  entry: Entry,
  id: Patient['id']
): Extract<Action, { type: 'ADD_PATIENT_ENTRY' }> => {
  return { type: 'ADD_PATIENT_ENTRY', payload: { entry, patientId: id } };
};
