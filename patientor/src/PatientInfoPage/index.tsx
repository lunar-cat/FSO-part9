import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { addPatientDetails, useStateValue } from '../state';
import { PatientDetails } from '../types';

const findPatientById = (
  patients: { [id: string]: PatientDetails },
  id: string
): PatientDetails | undefined => {
  return Object.values(patients).find((p) => p.id === id);
};
const PatientInfoPage = () => {
  const [patient, setPatient] = useState<PatientDetails | null>(null);
  const [{ patientsDetails }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
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
    const cachePatient = findPatientById(patientsDetails, id);
    if (cachePatient) {
      console.log(`using cached: ${id}`);
      setPatient(cachePatient);
    } else {
      console.log(`fetching: ${id}`);
      void getPatientInfo();
    }
  }, []);
  if (!patient) return <div>Patient not found</div>;
  return (
    <div>
      <h2>
        {patient.name} <span>{patient.gender}</span>
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <div>
        <h3>entries</h3>
        {patient.entries &&
          patient.entries.map((entry) => (
            <div key={entry.id}>
              <p>{entry.date}</p>
              <p>{entry.description}</p>
              <ul>
                {entry.diagnosisCodes &&
                  entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code}</li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientInfoPage;
