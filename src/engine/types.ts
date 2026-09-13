export type Category = "familia" | "amigos" | "trabajo" | "estudios" | "cita";

export const CATEGORIES: Category[] = ["familia", "amigos", "trabajo", "estudios", "cita"];

export type Credibility = "sospechosa" | "razonable" | "impecable";
export type Drama = "seco" | "cinematografico" | "telenovela";
export type Audacity = "prudente" | "valiente" | "sin_retorno";
export type Relationship = "formal" | "cercana" | "confianza";
export type ScenarioIntent = string;

export type ComedyStyle =
  | "deadpan"
  | "bureaucratic"
  | "hyperSpecific"
  | "internet"
  | "selfIncriminating"
  | "escalation"
  | "radicalHonesty"
  | "absurdAuthority";

export type GenerationSignal =
  | "alreadyConfirmed"
  | "enthusiasticConfirmation"
  | "familyPressure"
  | "authorityFigure"
  | "closeRelationship"
  | "formalRelationship"
  | "socialMediaRisk"
  | "groupChatEvidence"
  | "timingConflict"
  | "transport"
  | "technology"
  | "workPressure"
  | "academicPressure"
  | "birthday"
  | "sports"
  | "dinner"
  | "romanticExpectation"
  | "lowEnergy"
  | "visibilityRisk";

export const AUDACITY_ORDER: Audacity[] = ["prudente", "valiente", "sin_retorno"];

export type Locale = "en" | "es";

export interface CaseConfig {
  credibility: Credibility;
  drama: Drama;
  audacity: Audacity;
  relationship: Relationship;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  label: string;
  risk: number;
  /** V2 semantic facts used for selection; optional for legacy locales. */
  signals?: GenerationSignal[];
}

export interface ExcuseBlock {
  id: string;
  /** Main body of the authorized excuse. */
  body: string;
  /** Answer given if the recipient asks follow-up questions. */
  followUp: string;
  weakness: string;
  repair: string;
  /** Stable premise shared by audacity levels. */
  conceptId?: string;
  styles?: ComedyStyle[];
  signals?: GenerationSignal[];
  avoidSignals?: GenerationSignal[];
  relationships?: Relationship[];
  credibilities?: Credibility[];
  dramas?: Drama[];
  /** V2 copy can be authored as a complete sentence without generic suffixes. */
  modifierMode?: "legacy" | "none" | "drama" | "credibility";
  weight?: number;
}

export interface CategoryCopy {
  label: string;
  formal: string;
  description: string;
}

export interface InstitutionalPunchline {
  id: string;
  text: string;
  minRisk?: number;
  maxRisk?: number;
  signals?: GenerationSignal[];
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
  /** V2 alternatives; legacy locales continue using relationshipOpening. */
  relationshipOpenings?: Record<Relationship, string[]>;
  /** Extra clause when credibility is impeccable / suspicious. */
  credibilityNote: Record<Credibility, string>;
  riskStatus: { low: string; mid: string; high: string; extreme: string };
  institutionalPunchlines?: InstitutionalPunchline[];
  refusal: { title: string; body: string };
  discriminationRefusal?: { title: string; body: string };
}

export interface CaseAnswer {
  questionId: string;
  optionId: string;
  risk: number;
}

export interface CaseState {
  caseId: string;
  category: Category | null;
  scenarioIntent: ScenarioIntent | null;
  config: CaseConfig;
  answers: CaseAnswer[];
  context: string;
}

export interface Verdict {
  resultId: string;
  /** Internal selection metadata used for same-level variants and escalation continuity. */
  candidateId?: string;
  conceptId?: string;
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
