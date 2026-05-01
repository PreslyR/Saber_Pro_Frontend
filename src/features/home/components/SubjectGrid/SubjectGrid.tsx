import type { Subject, SubjectId } from '../../../../types/subject.types';
import type { SubjectProgress } from '../../../../types/progress.types';
import { SubjectCard } from '../SubjectCard/SubjectCard';

interface SubjectGridProps {
  subjects: Subject[];
  getProgress: (subjectId: SubjectId) => SubjectProgress;
  onSelectSubject: (subjectId: string) => void;
}

/**
 * Grid responsivo que renderiza una SubjectCard por cada área disponible.
 * La obtención del progreso se delega al padre para mantener SRP.
 */
export const SubjectGrid = ({ subjects, getProgress, onSelectSubject }: SubjectGridProps) => {
  return (
    <section aria-labelledby="subjects-heading">
      <h2 id="subjects-heading" className="text-xl font-bold text-gray-800 mb-4">
        Áreas de evaluación
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            progress={getProgress(subject.id)}
            onSelect={onSelectSubject}
          />
        ))}
      </div>
    </section>
  );
};
