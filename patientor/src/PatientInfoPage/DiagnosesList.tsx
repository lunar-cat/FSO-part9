import { Diagnosis } from '../types';

interface IDiagnosisList {
  diagnoses: { [id: string]: Diagnosis };
  diagnosesCodes: string[];
}
const DiagnosesList = ({ diagnoses, diagnosesCodes }: IDiagnosisList) => {
  return (
    <ul>
      {diagnosesCodes &&
        diagnosesCodes.map((code) => (
          <li key={code}>
            {code} {diagnoses[code].name}
          </li>
        ))}
    </ul>
  );
};

export default DiagnosesList;
