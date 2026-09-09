export type Category =
  | "trabajo"
  | "estudios"
  | "familia"
  | "cita"
  | "amigos"
  | "ejercicio"
  | "favor"
  | "inconfesable";

export const CATEGORIES: Category[] = [
  "trabajo",
  "estudios",
  "familia",
  "cita",
  "amigos",
  "ejercicio",
  "favor",
  "inconfesable",
];

export type Credibility = "sospechosa" | "razonable" | "impecable";
export type Drama = "seco" | "cinematografico" | "telenovela";
export type Audacity = "prudente" | "valiente" | "sin_retorno";
export type Relationship = "formal" | "cercana" | "confianza";

export const AUDACITY_ORDER: Audacity[] = ["prudente", "valiente", "sin_retorno"];

export type Locale = "es" | "en" | "pt-BR";

export interface CaseConfig {
  credibility: Credibility;
  drama: Drama;
  audacity: Audacity;
  relationship: Relationship;
}

export interface Question {
  id: string;
  text: string;
  options: { id: string; label: string; risk: number }[];
}

export interface ExcuseBlock {
  id: string;
  /** Main body of the authorized excuse. */
  body: string;
  /** Answer given if the recipient asks follow-up questions. */
  followUp: string;
  weakness: string;
  repair: string;
}

export interface CategoryCopy {
  label: string;
  formal: string;
  description: string;
}

export interface LocaleContent {
  signature: string;
  categories: Record<Category, CategoryCopy>;
  questions: Record<Category, Question[]>;
  excuses: Record<Category, Record<Audacity, ExcuseBlock[]>>;
  verdicts: string[];
  deliberation: string[];
  /** Sentence appended depending on drama level. */
  dramaTail: Record<Drama, string>;
  /** Opening clause depending on relationship with the victim. */
  relationshipOpening: Record<Relationship, string>;
  /** Extra clause when credibility is impeccable / suspicious. */
  credibilityNote: Record<Credibility, string>;
  riskStatus: { low: string; mid: string; high: string; extreme: string };
  refusal: { title: string; body: string };
}

export interface CaseAnswer {
  questionId: string;
  optionId: string;
  risk: number;
}

export interface CaseState {
  caseId: string;
  category: Category | null;
  config: CaseConfig;
  answers: CaseAnswer[];
  context: string;
}

export interface Verdict {
  resultId: string;
  caseId: string;
  verdict: string;
  excuse: string;
  followUp: string;
  weakness: string;
  repair: string;
  risk: number;
  riskStatus: string;
  refused: boolean;
  refusal?: { title: string; body: string };
}
