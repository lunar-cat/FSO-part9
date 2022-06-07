import { CoursePart } from '../types';
import Part from '../components/Part';

interface ContentProps {
  parts: CoursePart[];
}
const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      <Part parts={parts} />
    </div>
  );
};

export default Content;
