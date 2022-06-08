import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { addPatientDetails, useStateValue } from '../state';
import { Patient, PatientDetails } from '../types';

const findPatientById = (
  patients: { [id: string]: Patient },
  id: string
): Patient | undefined => {
  return Object.values(patients).find((p) => p.id === id);
};
const PatientInfoPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
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
    </div>
  );
};

export default PatientInfoPage;
