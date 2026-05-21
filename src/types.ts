export type SubjectId =
  | 'razonamiento-cuantitativo'
  | 'lectura-critica'
  | 'ingles'
  | 'competencias-ciudadanas'
  | 'comunicacion-escrita';

export type SubjectIconKey =
  | 'calculate'
  | 'menu-book'
  | 'language'
  | 'science'
  | 'account-balance'
  | 'edit-note';

export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  iconKey: SubjectIconKey;
  accentColor: string;
  bgColor: string;
  progressColor: string;
  totalQuestions: number;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  questionsToday: number;
  dailyGoalCompleted: number;
  dailyGoalTarget: number;
  objective: {
    name: string;
    description: string;
  };
}

export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface QuizOption {
  id: OptionId;
  text: string;
}

export interface QuizQuestion {
  id: string;
  subjectId: SubjectId;
  statement: string;
  options: QuizOption[];
  correctOptionId: OptionId;
  explanation: string;
}

export interface QuizAnswerRecord {
  questionId: string;
  selectedOptionId: OptionId;
  isCorrect: boolean;
}

export interface QuizSession {
  subjectId: SubjectId;
  questions: QuizQuestion[];
  currentIndex: number;
  answers: QuizAnswerRecord[];
  isFinished: boolean;
}

export interface SubjectProgress {
  subjectId: SubjectId;
  completedQuestions: number;
  totalQuestions: number;
  correctAnswers: number;
  lastAttempt?: string;
}

export interface UserProgress {
  userId: string;
  username: string;
  subjects: Record<SubjectId, SubjectProgress>;
}

export interface UserProfile {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  carrera: string;
  semestre: number;
}

export interface QuizAttemptAnswerSubmission {
  statement: string;
  options: QuizOption[];
  selectedOptionId: OptionId;
  correctOptionId: OptionId;
  explanation: string;
}

export interface QuizAttemptSubmission {
  subjectId: SubjectId;
  answers: QuizAttemptAnswerSubmission[];
}

export interface ProgressDashboardResponse {
  userProgress: UserProgress;
  stats: UserStats;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSendRequest {
  message: string;
  subjectId?: SubjectId;
}

export interface ChatSendResponse {
  reply: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  xp: number;
  streak: number;
  level: number;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
}

export interface Situation {
  id: string;
  text: string;
  instruction: string;
  criteria: string[];
}

export interface SituationValidationResult {
  feedback: string;
  score?: number;
}
