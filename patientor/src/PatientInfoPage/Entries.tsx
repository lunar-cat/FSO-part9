import { Entry } from '../types';
import EntryDetails from './Entry';
import { useStateValue } from '../state';

interface IEntriesProps {
  entries: Entry[];
}

const Entries = ({ entries }: IEntriesProps) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      {entries &&
        entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
    </div>
  );
};

export default Entries;
