import contentEs from "./content.es";
import contentEn from "./content.en";
import contentPt from "./content.pt";
import { pickFresh, remember } from "./antiRepeat";
import {
  AUDACITY_ORDER,
  type Audacity,
  type CaseState,
  type Locale,
  type LocaleContent,
  type Verdict,
} from "./types";

export const CONTENT: Record<Locale, LocaleContent> = {
  es: contentEs,
  en: contentEn,
  "pt-BR": contentPt,
};

export function getContent(locale: Locale): LocaleContent {
  return CONTENT[locale];
}

export function newCaseId(): string {
  return `E3K-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function nextAudacity(a: Audacity): Audacity {
  const i = AUDACITY_ORDER.indexOf(a);
  return AUDACITY_ORDER[Math.min(i + 1, AUDACITY_ORDER.length - 1)];
}

export function isMaxAudacity(a: Audacity): boolean {
  return a === "sin_retorno";
}

/** Theatrical, deterministic-ish provisional index shown during configuration. */
export function provisionalCredibility(state: CaseState): number {
  const base = { sospechosa: 38, razonable: 66, impecable: 84 }[state.config.credibility];
  const dramaAdj = { seco: 6, cinematografico: 0, telenovela: -9 }[state.config.drama];
  const audAdj = { prudente: 5, valiente: -4, sin_retorno: -14 }[state.config.audacity];
  const relAdj = { formal: 3, cercana: 0, confianza: -5 }[state.config.relationship];
  return clamp(base + dramaAdj + audAdj + relAdj, 5, 96);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function computeRisk(state: CaseState): number {
  const base = { sospechosa: 62, razonable: 38, impecable: 24 }[state.config.credibility];
  const dramaAdj = { seco: -4, cinematografico: 3, telenovela: 11 }[state.config.drama];
  const audAdj = { prudente: -6, valiente: 7, sin_retorno: 19 }[state.config.audacity];
  const relAdj = { formal: 5, cercana: 0, confianza: -3 }[state.config.relationship];
  const answers = state.answers.reduce((sum, a) => sum + a.risk, 0);
  return clamp(base + dramaAdj + audAdj + relAdj + answers, 4, 97);
}

export function riskStatus(risk: number, content: LocaleContent): string {
  if (risk < 30) return content.riskStatus.low;
  if (risk < 55) return content.riskStatus.mid;
  if (risk < 78) return content.riskStatus.high;
  return content.riskStatus.extreme;
}

const FORBIDDEN =
  /\b(muert\w+|falleci\w+|c[áa]ncer|hospital\w*|enferm\w+ grave|accidente|polic[íi]a|denuncia|abogad\w+|demanda|falsific\w+|certificad\w+ m[ée]dic\w+|receta|fraude|estafa|robo|death|died|dying|cancer|hospital|ambulance|accident|police|lawsuit|forge|fake (doctor|medical|police)|morte|morreu|c[âa]ncer|pol[íi]cia|acidente|fraude|falsific\w+)\b/i;

export function isHarmfulContext(context: string): boolean {
  return FORBIDDEN.test(context);
}

export interface GenerateOptions {
  state: CaseState;
  locale: Locale;
  /** Force a specific audacity (used by "increase audacity"). */
  audacity?: Audacity;
}

export function generateVerdict({ state, locale, audacity }: GenerateOptions): Verdict {
  const content = getContent(locale);
  const category = state.category ?? "familia";
  const level = audacity ?? state.config.audacity;

  if (isHarmfulContext(state.context)) {
    return {
      resultId: `refused-${state.caseId}`,
      caseId: state.caseId,
      verdict: content.verdicts[1],
      excuse: "",
      followUp: "",
      weakness: "",
      repair: "",
      risk: 0,
      riskStatus: content.riskStatus.low,
      refused: true,
      refusal: content.refusal,
    };
  }

  const pool = content.excuses[category][level];
  const block = pickFresh(pool, (b) => b.id);
  const verdict = pickFresh(
    content.verdicts.map((v, i) => ({ id: `${locale}-verdict-${i}`, v })),
    (x) => x.id,
  );

  const opening = content.relationshipOpening[state.config.relationship];
  const tail = content.dramaTail[state.config.drama];
  const credNote = content.credibilityNote[state.config.credibility];
  const excuse = `${opening} ${block.body}${tail}${credNote}`.replace(/\s+/g, " ").trim();

  const risk = clamp(computeRisk({ ...state, config: { ...state.config, audacity: level } }), 4, 97);

  remember(block.id);
  remember(verdict.id);

  return {
    resultId: `${block.id}-${Date.now()}`,
    caseId: state.caseId,
    verdict: verdict.v,
    excuse,
    followUp: block.followUp,
    weakness: block.weakness,
    repair: block.repair,
    risk,
    riskStatus: riskStatus(risk, content),
    refused: false,
  };
}
