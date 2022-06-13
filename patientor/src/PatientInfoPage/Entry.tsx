import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  Diagnosis
} from '../types';
import { assertNever } from '../utils';
import DiagnosesList from './DiagnosesList';
import WorkIcon from '@material-ui/icons/Work';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import HealingIcon from '@material-ui/icons/Healing';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Container from '@material-ui/core/Container';
import React from 'react';
interface BaseEntry {
  diagnoses: { [id: string]: Diagnosis };
}
const rateToColor = {
  0: 'red',
  1: 'orange',
  2: 'yellow',
  3: 'purple'
};
const StyledContainer = ({ children }: { children?: React.ReactNode }) => {
  if (children)
    return (
      <Container
        maxWidth="sm"
        style={{
          border: '2px solid green',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}
      >
        {children}
      </Container>
    );
  return null;
};
interface IHealthProps extends BaseEntry {
  entry: HealthCheckEntry;
}
const Health = ({ entry, diagnoses }: IHealthProps) => {
  return (
    <StyledContainer>
      <p>
        {entry.date}
        <HealingIcon />
      </p>
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
      <p>
        <FavoriteIcon style={{ color: rateToColor[entry.healthCheckRating] }} />
      </p>

      {entry.diagnosisCodes && (
        <DiagnosesList
          diagnoses={diagnoses}
          diagnosesCodes={entry.diagnosisCodes}
        />
      )}
    </StyledContainer>
  );
};

interface IOccupational extends BaseEntry {
  entry: OccupationalHealthcareEntry;
}
const Occupational = ({ entry, diagnoses }: IOccupational) => {
  return (
    <StyledContainer>
      <p>
        {entry.date}
        <WorkIcon />
      </p>
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
      <p>{entry.employerName}</p>
      {entry.sickLeave && (
        <p>
          from: {entry.sickLeave.startDate} to: {entry.sickLeave.endDate}
        </p>
      )}
      {entry.diagnosisCodes && (
        <DiagnosesList
          diagnoses={diagnoses}
          diagnosesCodes={entry.diagnosisCodes}
        />
      )}
    </StyledContainer>
  );
};

interface IHospitalProps extends BaseEntry {
  entry: HospitalEntry;
}
const Hospital = ({ entry, diagnoses }: IHospitalProps) => {
  return (
    <StyledContainer>
      <p>
        {entry.date}
        <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
      <p>{entry.discharge.date}</p>
      <p>{entry.discharge.criteria}</p>

      {entry.diagnosisCodes && (
        <DiagnosesList
          diagnoses={diagnoses}
          diagnosesCodes={entry.diagnosisCodes}
        />
      )}
    </StyledContainer>
  );
};

interface IEntryProps {
  entry: Entry;
  diagnoses: { [id: string]: Diagnosis };
}
const EntryDetails = ({ entry, diagnoses }: IEntryProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <Health entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <Occupational entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
