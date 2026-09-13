import contentEs from "./content.es";
import contentEn from "./content.en";
import { getRecent, pickFresh, remember } from "./antiRepeat";
import { conceptMatchesScenarioIntent } from "./scenarioIntents";
import {
  AUDACITY_ORDER,
  type Audacity,
  type CaseState,
  type Category,
  type ComedyStyle,
  type ExcuseBlock,
  type GenerationSignal,
  type InstitutionalPunchline,
  type Locale,
  type LocaleContent,
  type Verdict,
} from "./types";

export const CONTENT: Record<Locale, LocaleContent> = {
  en: contentEn,
  es: contentEs,
};

export function getContent(locale: Locale): LocaleContent {
  return CONTENT[locale];
}

export function newCaseId(): string {
  return `E3K-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function nextAudacity(a: Audacity): Audacity {
  const i = AUDACITY_ORDER.indexOf(a);
  return AUDACITY_ORDER[Math.min(i + 1, AUDACITY_ORDER.length - 1)] ?? "sin_retorno";
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
  /\b(muert\w+|muri[óo]\w*|falleci[óo]\w*|c[áa]ncer|hospital\w*|enferm\w+ grave|accidente|polic[íi]a|denuncia|abogad\w+|demanda|falsific\w+|certificad\w+ m[ée]dic\w+|receta|fraude|estafa|robo|death|died|dying|cancer|hospital|ambulance|accident|police|lawsuit|forge|fake (doctor|medical|police)|morte|morreu|c[âa]ncer|pol[íi]cia|acidente|fraude|falsific\w+)\b/i;

const SERIOUS_DECEPTION =
  /\b(fake|forge|fabricate|falsify|invent|alter|edit|crear|fabricar|inventar|falsificar|alterar|editar|mentir|enga[nñ]ar|lie)\b.{0,60}\b(evidence|proof|screenshot|receipt|record|certificate|medical|doctor|court|bank|tax|visa|immigration|emergency|prueba|evidencia|captura|recibo|registro|certificado|medic\w*|doctor\w*|tribunal|banco|impuesto\w*|visado|visa|inmigracion|emergencia|urgencia)\b|\b(money laundering|tax evasion|bank fraud|immigration fraud|lavado de dinero|evasion fiscal|fraude bancario|fraude migratorio)\b/i;

const SELF_HARM =
  /\b(suicid\w*|self[ -]?harm|kill myself|hurt myself|end my life|matarme|hacerme da[nñ]o|quitarme la vida)\b/i;

const CRIME_CONCEALMENT =
  /\b(conceal|cover up|hide|destroy|ocultar|encubrir|esconder|destruir)\b.{0,60}\b(crime|offence|body|corpse|evidence|weapon|delito|crimen|cadaver|cuerpo|prueba|evidencia|arma)\b/i;

const IMPERSONATION =
  /\b(impersonat\w*|identity theft|suplant\w*|robo de identidad|hacerse pasar por|hacerme pasar por|pretend to be)\b/i;

const HARASSMENT_OR_EXPLOITATION =
  /\b(harass\w*|stalk\w*|blackmail\w*|extort\w*|threaten\w*|acos\w*|acech\w*|chantaj\w*|extors\w*|amenaz\w*)\b|\b(manipulate|deceive|pressure|coerce|manipular|enga[nñ]ar|presionar|coaccionar)\b.{0,50}\b(child|minor|elderly|disabled|vulnerable|ni[nñ]\w*|menor|ancian\w*|discapacitad\w*|vulnerable)\b/i;

export function isHarmfulContext(context: string): boolean {
  const normalized = normalizeContext(context);
  return [
    FORBIDDEN,
    SERIOUS_DECEPTION,
    SELF_HARM,
    CRIME_CONCEALMENT,
    IMPERSONATION,
    HARASSMENT_OR_EXPLOITATION,
  ].some((pattern) => pattern.test(normalized));
}

const PROTECTED_CHARACTERISTICS = [
  /\b(gay|gays|homosexual|homosexuales|lesbiana|lesbianas|bisexual|bisexuales)\b/,
  /\b(gente negra|negro|negra|negros|negras|black people|asian|asiatico|asiatica|asiaticos|asiaticas|arab|arabe|arabes|indigenous|indigena|indigenas)\b/,
  /\b(immigrant|immigrants|foreigner|foreigners|inmigrante|inmigrantes|extranjero|extranjera|extranjeros|extranjeras|mexican|mexicano|mexicana|mexicanos|mexicanas|colombian|colombiano|colombiana|colombianos|colombianas|venezuelan|venezolano|venezolana|venezolanos|venezolanas)\b/,
  /\b(muslim|muslims|jewish|jews|musulman|musulmanes|judio|judia|judios|judias)\b/,
  /\b(transgender|trans people|transexual|transexuales|disabled people|discapacitado|discapacitada|discapacitados|discapacitadas)\b/,
];

const EXPLICIT_AVOIDANCE =
  /\b(no quiero (ir|juntarme|estar|verlos|verlas)|quiero evitar|prefiero evitar|prefiero no estar|me niego a (ir|juntarme|estar)|i do not want to (go|meet|be there|see them)|i dont want to (go|meet|be there|see them)|i want to avoid|want to avoid|i refuse to (go|meet|be there))\b/;
const CAUSAL_LINK = /\b(porque|ya que|por el hecho de que|because|since)\b/;
const DIRECT_EXCLUSION =
  /\b(quiero evitar|prefiero evitar|no quiero juntarme con|prefiero no estar con|me niego a estar con|i want to avoid|want to avoid|i do not want to be with|i dont want to be with|i refuse to be with)\b.{0,40}$/;
const IMPLICIT_REJECTION =
  /\b(pero\b.{0,50}\b(van|hay|habra|asisten|vienen|son)|but\b.{0,50}\b(they are|there are|will attend|are coming))\b/;

/** Detects an exclusionary motive, not a protected identity mention by itself. */
export function hasDiscriminatoryMotivation(context: string): boolean {
  const normalized = normalizeContext(context);
  for (const identity of PROTECTED_CHARACTERISTICS) {
    const match = identity.exec(normalized);
    if (!match || match.index === undefined) continue;
    const beforeIdentity = normalized.slice(Math.max(0, match.index - 140), match.index);
    const explicitCausal =
      EXPLICIT_AVOIDANCE.test(beforeIdentity) && CAUSAL_LINK.test(beforeIdentity);
    const directExclusion = DIRECT_EXCLUSION.test(beforeIdentity.slice(-80));
    const reportedPattern = IMPLICIT_REJECTION.test(beforeIdentity.slice(-90));
    if (explicitCausal || directExclusion || reportedPattern) return true;
  }
  return false;
}

export interface GenerateOptions {
  state: CaseState;
  locale: Locale;
  /** Force a specific audacity (used by "increase audacity"). */
  audacity?: Audacity;
  /** Prefer another result without changing the case configuration. */
  excludeCandidateId?: string;
  excludeConceptId?: string;
  /** Injectable for deterministic engine tests. */
  random?: () => number;
}

const CATEGORY_SIGNALS: Record<Category, GenerationSignal[]> = {
  familia: ["familyPressure", "closeRelationship"],
  amigos: ["groupChatEvidence", "closeRelationship"],
  trabajo: ["workPressure", "authorityFigure"],
  estudios: ["academicPressure", "authorityFigure"],
  cita: ["romanticExpectation"],
};

const CONTEXT_RULES: Array<[RegExp, GenerationSignal[]]> = [
  [/\b(cumpleanos|cumple)\b/, ["birthday", "familyPressure"]],
  [/\b(cena|almuerzo|comida)\b/, ["dinner"]],
  [/\b(familia|mama|madre|papa|padre|tia|tio|primo|prima)\b/, ["familyPressure"]],
  [/\b(trabajo|jefe|reunion|oficina)\b/, ["workPressure", "authorityFigure"]],
  [/\b(examen|clase|profesor|profesora|entrega)\b/, ["academicPressure", "authorityFigure"]],
  [/\b(partido|futbol|final|juego)\b/, ["sports", "timingConflict"]],
  [/\b(coche|carro|trafico|transporte|autobus|metro)\b/, ["transport", "timingConflict"]],
  [/\b(whatsapp|grupo|chat)\b/, ["groupChatEvidence"]],
  [/\b(instagram|story|stories|historia|historias)\b/, ["socialMediaRisk", "visibilityRisk"]],
  [/\b(ya confirme|confirme|dije que si)\b/, ["alreadyConfirmed"]],
  [/\b(cansancio|cansado|cansada|sueno|dormir|dormi)\b/, ["lowEnergy"]],
  [/\b(ordenador|computadora|portatil|archivo|wifi|internet)\b/, ["technology"]],
];

const EMPTY_POOL_REFUSAL: Record<Locale, { title: string; body: string }> = {
  en: {
    title: "Content bank pending.",
    body: "New excuse content will be added here.",
  },
  es: {
    title: "Banco de contenido pendiente.",
    body: "Aquí se añadirá el nuevo contenido de excusas.",
  },
};

const INTENT_REQUIRED_REFUSAL: Record<Locale, { title: string; body: string }> = {
  en: {
    title: "Scenario required.",
    body: "Select what you are trying to get out of before requesting a ruling.",
  },
  es: {
    title: "Falta definir el escenario.",
    body: "Selecciona de qué te quieres salvar antes de solicitar un dictamen.",
  },
};

const DISCRIMINATION_VERDICT: Record<Locale, string> = {
  en: "CASE PARTIALLY INADMISSIBLE",
  es: "CASO PARCIALMENTE INADMISIBLE",
};

export function normalizeContext(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function classifyContext(context: string): GenerationSignal[] {
  const normalized = normalizeContext(context);
  const signals = new Set<GenerationSignal>();
  for (const [pattern, matches] of CONTEXT_RULES) {
    if (pattern.test(normalized)) matches.forEach((signal) => signals.add(signal));
  }
  return [...signals];
}

function resolveSignals(
  state: CaseState,
  content: LocaleContent,
  category: Category,
): Set<GenerationSignal> {
  const signals = new Set<GenerationSignal>(CATEGORY_SIGNALS[category]);
  if (state.config.relationship === "formal") signals.add("formalRelationship");
  if (state.config.relationship === "confianza") signals.add("closeRelationship");
  for (const answer of state.answers) {
    const question = content.questions[category].find((item) => item.id === answer.questionId);
    const option = question?.options.find((item) => item.id === answer.optionId);
    option?.signals?.forEach((signal) => signals.add(signal));
  }
  classifyContext(state.context).forEach((signal) => signals.add(signal));
  return signals;
}

function desiredStyles(state: CaseState): ComedyStyle[] {
  const styles: ComedyStyle[] = ["bureaucratic"];
  if (state.config.drama === "seco") styles.push("deadpan");
  if (state.config.drama === "telenovela") styles.push("hyperSpecific", "escalation");
  if (state.config.credibility === "sospechosa") styles.push("selfIncriminating", "radicalHonesty");
  if (state.config.audacity === "sin_retorno") styles.push("absurdAuthority", "escalation");
  return styles;
}

export function scoreCandidate(
  block: ExcuseBlock,
  signals: ReadonlySet<GenerationSignal>,
  state: CaseState,
  recentIds: readonly string[],
  recentConcepts: readonly string[],
  continuingConcept?: string,
): number {
  let score = block.weight ?? 0;
  for (const signal of block.signals ?? []) if (signals.has(signal)) score += 7;
  for (const signal of block.avoidSignals ?? []) if (signals.has(signal)) score -= 12;
  if (block.relationships?.includes(state.config.relationship)) score += 4;
  if (block.credibilities?.includes(state.config.credibility)) score += 3;
  if (block.dramas?.includes(state.config.drama)) score += 3;
  for (const style of desiredStyles(state)) if (block.styles?.includes(style)) score += 2;
  if (recentIds.includes(block.id)) score -= 16;
  if (block.conceptId && recentConcepts.includes(block.conceptId)) score -= 5;
  if (continuingConcept && block.conceptId === continuingConcept) score += 100;
  return score;
}

function allBlocks(content: LocaleContent, category: Category): ExcuseBlock[] {
  return AUDACITY_ORDER.flatMap((level) => content.excuses[category][level] ?? []);
}

function pickOpening(
  content: LocaleContent,
  state: CaseState,
  locale: Locale,
  body: string,
  random: () => number,
): string {
  const authoredOpening =
    /^(hey|okay|look|quick question|sorry|oye|mira|perdona|bueno|oi|ent[aã]o|olha|desculpa)\b/i;
  if (authoredOpening.test(body.trim()) || random() < 0.65) return "";

  const relationship = state.config.relationship;
  const alternatives = content.relationshipOpenings?.[relationship];
  if (!alternatives?.length) return content.relationshipOpening[relationship];
  const selected = pickFresh(
    alternatives.map((text, index) => ({ id: `${locale}-opening-${relationship}-${index}`, text })),
    (item) => item.id,
    { kind: "opening", scope: locale, random },
  );
  if (selected) remember(selected.id, "opening", locale);
  return selected?.text ?? content.relationshipOpening[relationship];
}

function pickInstitutionalPunchline(
  content: LocaleContent,
  signals: ReadonlySet<GenerationSignal>,
  risk: number,
  locale: Locale,
  random: () => number,
): InstitutionalPunchline | undefined {
  if (random() >= 0.6) return undefined;
  const eligible = (content.institutionalPunchlines ?? []).filter(
    (item) =>
      risk >= (item.minRisk ?? 0) &&
      risk <= (item.maxRisk ?? 100) &&
      (!item.signals?.length || item.signals.some((signal) => signals.has(signal))),
  );
  const selected = pickFresh(eligible, (item) => item.id, {
    kind: "punchline",
    scope: locale,
    random,
  });
  if (selected) remember(selected.id, "punchline", locale);
  return selected;
}

export function generateVerdict({
  state,
  locale,
  audacity,
  excludeCandidateId,
  excludeConceptId,
  random = Math.random,
}: GenerateOptions): Verdict {
  const content = getContent(locale);
  const category = state.category ?? "familia";
  const level = audacity ?? state.config.audacity;
  const effectiveState =
    level === state.config.audacity
      ? state
      : { ...state, config: { ...state.config, audacity: level } };

  if (isHarmfulContext(state.context)) {
    return {
      resultId: `refused-${state.caseId}`,
      caseId: state.caseId,
      verdict: content.verdicts[1] ?? "",
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

  if (hasDiscriminatoryMotivation(state.context)) {
    return {
      resultId: `reframed-${state.caseId}`,
      caseId: state.caseId,
      verdict: DISCRIMINATION_VERDICT[locale],
      excuse: "",
      followUp: "",
      weakness: "",
      repair: "",
      risk: 0,
      riskStatus: content.riskStatus.low,
      refused: true,
      refusal: content.discriminationRefusal ?? content.refusal,
    };
  }

  if (!state.scenarioIntent) {
    return {
      resultId: `intent-required-${state.caseId}`,
      caseId: state.caseId,
      verdict: content.verdicts[0] ?? "",
      excuse: "",
      followUp: "",
      weakness: "",
      repair: "",
      risk: 0,
      riskStatus: content.riskStatus.low,
      refused: true,
      refusal: INTENT_REQUIRED_REFUSAL[locale],
    };
  }

  const scenarioIntent = state.scenarioIntent;
  const matchesIntent = (block: ExcuseBlock) =>
    conceptMatchesScenarioIntent(locale, category, block.conceptId, scenarioIntent);
  const requestedPool = (content.excuses[category]?.[level] ?? []).filter(matchesIntent);
  const pool =
    requestedPool.length > 0 ? requestedPool : allBlocks(content, category).filter(matchesIntent);
  if (pool.length === 0) {
    return {
      resultId: `empty-${state.caseId}`,
      caseId: state.caseId,
      verdict: content.verdicts[0] ?? "",
      excuse: "",
      followUp: "",
      weakness: "",
      repair: "",
      risk: 0,
      riskStatus: content.riskStatus.low,
      refused: true,
      refusal: EMPTY_POOL_REFUSAL[locale],
    };
  }

  const scope = locale;
  const signals = resolveSignals(state, content, category);
  const recentIds = getRecent("excuse", scope);
  const recentConcepts = getRecent("concept", scope);
  const continuingConcept = excludeConceptId
    ? undefined
    : getRecent("concept", `${scope}:${state.caseId}`)[0];
  const scored = pool.map((block) => ({
    block,
    score:
      scoreCandidate(block, signals, effectiveState, recentIds, recentConcepts, continuingConcept) -
      (block.id === excludeCandidateId ? 1000 : 0) -
      (block.conceptId && block.conceptId === excludeConceptId ? 40 : 0),
  }));
  const best = Math.max(...scored.map((item) => item.score));
  const finalists = scored.filter((item) => item.score >= best - 4).map((item) => item.block);
  const block =
    pickFresh(finalists, (item) => item.id, { kind: "excuse", scope, random }) ?? pool[0]!;
  const verdict = pickFresh(
    content.verdicts.map((v, i) => ({ id: `${locale}-verdict-${i}`, v })),
    (x) => x.id,
    { kind: "verdict", scope, random },
  );

  const opening = pickOpening(content, state, locale, block.body, random);
  const modifierMode = block.modifierMode ?? "legacy";
  const tail =
    modifierMode === "legacy" || modifierMode === "drama"
      ? content.dramaTail[state.config.drama]
      : "";
  const credNote =
    modifierMode === "legacy" || modifierMode === "credibility"
      ? content.credibilityNote[state.config.credibility]
      : "";
  const body = opening
    ? block.body
    : `${block.body.charAt(0).toLocaleUpperCase(locale)}${block.body.slice(1)}`;
  const excuse = `${opening} ${body}${tail}${credNote}`.replace(/\s+/g, " ").trim();

  const risk = clamp(computeRisk(effectiveState), 4, 97);
  const punchline = pickInstitutionalPunchline(content, signals, risk, locale, random);
  const resolvedRiskStatus = [riskStatus(risk, content), punchline?.text]
    .filter(Boolean)
    .join(" · ");

  remember(block.id, "excuse", scope);
  if (block.conceptId) {
    remember(block.conceptId, "concept", scope);
    remember(block.conceptId, "concept", `${scope}:${state.caseId}`);
  }
  if (verdict) remember(verdict.id, "verdict", scope);

  return {
    resultId: `${block.id}-${Date.now()}`,
    candidateId: block.id,
    ...(block.conceptId ? { conceptId: block.conceptId } : {}),
    caseId: state.caseId,
    verdict: verdict?.v ?? content.verdicts[0] ?? "",
    excuse,
    followUp: block.followUp,
    weakness: block.weakness,
    repair: block.repair,
    risk,
    riskStatus: resolvedRiskStatus,
    refused: false,
  };
}
