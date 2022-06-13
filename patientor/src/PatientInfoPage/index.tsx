import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import {
  addPatientDetails,
  useStateValue,
  setDiagnosisList,
  addPatientEntry
} from '../state';
import { Entry, PatientDetails, Diagnosis } from '../types';
import Entries from './Entries';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import { assertNever } from '../utils';
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';

const PatientInfoPage = () => {
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<EntryFormValues | null>(
    null
  );
  const [typeEntry, setTypeEntry] = useState<Entry['type']>('HealthCheck');
  const [{ patientsDetails, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const baseValues = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: []
  };
  const entryTypes = ['HealthCheck', 'OccupationalHealthcare', 'Hospital'];
  // fetch patient info
  useEffect(() => {
    if (!id) return;
    const getPatientInfo = async (): Promise<void> => {
      const url = `${apiBaseUrl}/patients/${id}`;
      try {
        const { data: patient } = await axios.get<PatientDetails>(url);
        setPatient(patient);
        dispatch(addPatientDetails(patient));
        console.log(patient);
      } catch (e: unknown) {
        console.log(e);
      }
    };
    const fetchDiagnosisList = async () => {
      const diagnosesUrl = `${apiBaseUrl}/diagnoses`;
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(diagnosesUrl);
        dispatch(setDiagnosisList(diagnoses));
      } catch (e) {
        console.error(e);
      }
    };
    const cachePatient = patientsDetails[id];
    if (cachePatient) {
      console.log(`using cached: ${id}`);
      setPatient(cachePatient);
    } else {
      console.log(`fetching: ${id}`);
      void getPatientInfo();
    }
    if (Object.values(diagnoses).length === 0) {
      void fetchDiagnosisList();
    }
  }, []);
  // set initial values
  useEffect(() => {
    switch (typeEntry) {
      case 'HealthCheck':
        setInitialValues({
          ...baseValues,
          type: 'HealthCheck',
          healthCheckRating: 0
        });
        break;
      case 'Hospital':
        setInitialValues({
          ...baseValues,
          type: 'Hospital',
          discharge: {
            date: '',
            criteria: ''
          }
        });
        break;
      case 'OccupationalHealthcare':
        setInitialValues({
          ...baseValues,
          type: 'OccupationalHealthcare',
          employerName: '',
          sickLeave: { startDate: '', endDate: '' }
        });
        break;
      default:
        assertNever(typeEntry);
        break;
    }
  }, [typeEntry]);
  // update when patientDetails change
  useEffect(() => {
    if (!id) return;
    const patient = patientsDetails[id];
    setPatient(patient);
  }, [patientsDetails]);
  if (!patient) return <div>Patient not found</div>;
  if (Object.values(diagnoses).length === 0) return <div>Loading ...</div>;
  const handleSubmit = async (values: EntryFormValues) => {
    if (!id) return;
    const entryUrl = `${apiBaseUrl}/patients/${id}/entries`;
    try {
      const { data: newEntry } = await axios.post<Entry>(entryUrl, values);
      dispatch(addPatientEntry(newEntry, id));
      console.log('submit');
      setModal(false);
    } catch (error: unknown) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>
        {patient.name} <span>{patient.gender}</span>
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <select
        onChange={({ target }: { target: HTMLSelectElement }) =>
          setTypeEntry(target.value as Entry['type'])
        }
        value={typeEntry}
      >
        {entryTypes.map((type) => {
          return (
            <option key={type} value={type}>
              {type.split(/(?=[A-Z])/).join(' ')}
            </option>
          );
        })}
      </select>
      <button onClick={() => setModal(true)}>Add Entry</button>
      <Dialog fullWidth={true} open={modal} onClose={() => setModal(false)}>
        <DialogTitle>Add a new entry</DialogTitle>
        <Divider />
        <DialogContent>
          <AddEntryForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={() => setModal(!modal)}
            type={typeEntry}
            diagnoses={diagnoses}
          />
        </DialogContent>
      </Dialog>
      <div>
        <h3>entries</h3>
        <Entries entries={patient.entries} />
      </div>
    </div>
  );
};

export default PatientInfoPage;
