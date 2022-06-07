import { CoursePart } from '../types';
import { assertNever } from '../utils';
interface PartProps {
  parts: CoursePart[];
}
const Part = ({ parts }: PartProps) => {
  const mappedParts = parts.map((part, idx) => {
    switch (part.type) {
      case 'normal':
        return (
          <div key={`${part.name}-${idx}`}>
            <h3>
              {part.name} <span>{part.exerciseCount}</span>
            </h3>
            <p style={{ fontStyle: 'italic' }}>{part.description}</p>
          </div>
        );
      case 'groupProject':
        return (
          <div key={`${part.name}-${idx}`}>
            <h3>
              {part.name} <span>{part.exerciseCount}</span>
            </h3>
            <p>
              project exercises <span>{part.groupProjectCount}</span>
            </p>
          </div>
        );
      case 'submission':
        return (
          <div key={`${part.name}-${idx}`}>
            <h3>
              {part.name} <span>{part.exerciseCount}</span>
            </h3>
            <p style={{ fontStyle: 'italic' }}>{part.description}</p>
            <p>
              submit to <span>{part.exerciseSubmissionLink}</span>
            </p>
          </div>
        );
      case 'special':
        return (
          <div key={`${part.name}-${idx}`}>
            <h3>
              {part.name} <span>{part.exerciseCount}</span>
            </h3>
            <p style={{ fontStyle: 'italic' }}>{part.description}</p>
            <p>
              required skills: <span>{part.requirements.join(', ')}</span>
            </p>
          </div>
        );
      default:
        return assertNever(part);
    }
  });
  return <div>{mappedParts}</div>;
};

export default Part;
