import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Header } from "@/components/e3k/Header";
import { Button, MetaLabel, OptionCard, RiskBar, Sheet, Stamp } from "@/components/e3k/primitives";
import {
  ShareCaseDialog,
  type PublicCaseExtract,
  type ShareCardTheme,
} from "@/components/e3k/ShareCaseDialog";
import {
  generateVerdict,
  isMaxAudacity,
  newCaseId,
  nextAudacity,
  provisionalCredibility,
} from "@/engine/excuseEngine";
import {
  CATEGORIES,
  type Audacity,
  type CaseState,
  type Category,
  type Credibility,
  type Drama,
  type Relationship,
  type Verdict,
} from "@/engine/types";
import { useI18n } from "@/i18n/I18nProvider";
import { useReducedMotion } from "@/hooks/useTheme";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Excusator3000 — Toda gran excusa merece un juicio justo" },
      {
        name: "description",
        content:
          "Presenta tu caso ante el Tribunal de Compromisos Sociales y recibe una excusa oficialmente autorizada, con riesgo de descubrimiento incluido.",
      },
      { property: "og:title", content: "Excusator3000 — Oficina de Excusas Improbables" },
      {
        property: "og:description",
        content: "Presenta tu caso y recibe una excusa oficialmente autorizada.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://excusator3000.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://excusator3000.lovable.app/" }],
  }),
  component: Index,
});

type Step = "home" | "category" | "config" | "interrogation" | "deliberation" | "verdict";

const CREDIBILITIES: Credibility[] = ["sospechosa", "razonable", "impecable"];
const DRAMAS: Drama[] = ["seco", "cinematografico", "telenovela"];
const AUDACITIES: Audacity[] = ["prudente", "valiente", "sin_retorno"];
const RELATIONSHIPS: Relationship[] = ["formal", "cercana", "confianza"];

function pickCaseCopy(items: string[], caseId: string, salt: string): string {
  const hash = [...`${caseId}:${salt}`].reduce(
    (sum, character) => sum + character.charCodeAt(0),
    0,
  );
  return items[hash % Math.max(1, items.length)] ?? "";
}

function emptyCase(): CaseState {
  return {
    caseId: newCaseId(),
    category: null,
    config: {
      credibility: "razonable",
      drama: "cinematografico",
      audacity: "prudente",
      relationship: "cercana",
    },
    answers: [],
    context: "",
  };
}

function Index() {
  const { t, content, locale } = useI18n();
  const reduced = useReducedMotion();

  const [step, setStep] = useState<Step>("home");
  const [state, setState] = useState<CaseState>(() => emptyCase());
  const [qIndex, setQIndex] = useState(0);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [copied, setCopied] = useState<"idle" | "ok" | "error">("idle");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copying = useRef(false);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const questions = useMemo(
    () => (state.category ? content.questions[state.category] : []),
    [content, state.category],
  );

  const startCase = () => {
    setState(emptyCase());
    setQIndex(0);
    setVerdict(null);
    setStep("category");
  };

  const newCase = () => {
    setState(emptyCase());
    setQIndex(0);
    setVerdict(null);
    setCopied("idle");
    setStep("home");
  };

  const deliberate = useCallback(
    (next: CaseState) => {
      setState(next);
      setVerdict(generateVerdict({ state: next, locale }));
      setStep("deliberation");
    },
    [locale],
  );

  const increaseAudacity = () => {
    const level = nextAudacity(state.config.audacity);
    const next: CaseState = { ...state, config: { ...state.config, audacity: level } };
    setState(next);
    setVerdict(generateVerdict({ state: next, locale, audacity: level }));
  };

  const generateVariant = () => {
    if (!verdict) return;
    setCopied("idle");
    setVerdict(
      generateVerdict({
        state,
        locale,
        excludeCandidateId: verdict.candidateId,
        excludeConceptId: verdict.conceptId,
      }),
    );
  };

  const copyExcuse = async () => {
    if (!verdict || copying.current) return;
    copying.current = true;
    try {
      await navigator.clipboard.writeText(verdict.excuse);
      setCopied("ok");
    } catch {
      setCopied("error");
    } finally {
      copying.current = false;
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied("idle"), 2600);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {step === "home" && <HomeScreen onStart={startCase} />}

        {step === "category" && (
          <CategoryScreen
            selected={state.category}
            onSelect={(c) => setState((s) => ({ ...s, category: c }))}
            onBack={() => setStep("home")}
            onNext={() => {
              setQIndex(0);
              setStep("config");
            }}
          />
        )}

        {step === "config" && (
          <ConfigScreen
            state={state}
            onChange={(patch) => setState((s) => ({ ...s, config: { ...s.config, ...patch } }))}
            onBack={() => setStep("category")}
            onNext={() => {
              setState((s) => ({ ...s, answers: [] }));
              setQIndex(0);
              setStep("interrogation");
            }}
          />
        )}

        {step === "interrogation" && (
          <InterrogationScreen
            state={state}
            questions={questions}
            index={qIndex}
            reduced={reduced}
            onAnswer={(questionId, optionId, risk) => {
              setState((current) => ({
                ...current,
                answers: [
                  ...current.answers.filter((answer) => answer.questionId !== questionId),
                  { questionId, optionId, risk },
                ],
              }));
              setQIndex((current) => Math.min(current + 1, questions.length));
            }}
            onContext={(context) => setState((s) => ({ ...s, context }))}
            onBack={() => (qIndex === 0 ? setStep("config") : setQIndex(qIndex - 1))}
            onSubmit={() => deliberate(state)}
          />
        )}

        {step === "deliberation" && (
          <DeliberationScreen
            reduced={reduced}
            onDone={() => setStep("verdict")}
            messages={content.deliberation}
            stamp={t.deliberation.stamp}
            sessionLabel={t.deliberation.session}
            skipLabel={t.deliberation.skip}
          />
        )}

        {step === "verdict" && verdict && (
          <VerdictScreen
            verdict={verdict}
            state={state}
            copied={copied}
            reduced={reduced}
            onCopy={copyExcuse}
            onVariant={generateVariant}
            onIncrease={increaseAudacity}
            onNewCase={newCase}
          />
        )}
      </main>
      <footer className="border-t border-divider px-4 py-5 text-center sm:px-6">
        <p className="label-meta">{content.signature}</p>
      </footer>
    </div>
  );
}

function HomeScreen({ onStart }: { onStart: () => void }) {
  const { t } = useI18n();
  const d = t.home.dossier;
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <MetaLabel>{t.home.kicker}</MetaLabel>
        <h1 className="font-display text-4xl sm:text-5xl">{t.home.title}</h1>
        <p className="max-w-xl text-muted-foreground">{t.home.subtitle}</p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button onClick={onStart}>{t.home.cta}</Button>
          <span className="label-meta">{t.home.micro}</span>
        </div>
      </div>

      <Sheet>
        <div className="flex items-start justify-between gap-4">
          <MetaLabel>{d.file}</MetaLabel>
          <Stamp>{d.stamp}</Stamp>
        </div>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            [d.accusedLabel, d.accused],
            [d.offenceLabel, d.offence],
            [d.riskLabel, d.risk],
            [d.statusLabel, d.status],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="label-meta">{label}</dt>
              <dd className="mt-1 text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </Sheet>
    </div>
  );
}

function CategoryScreen({
  selected,
  onSelect,
  onBack,
  onNext,
}: {
  selected: Category | null;
  onSelect: (c: Category) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t, content } = useI18n();
  return (
    <Sheet className="space-y-6">
      <div>
        <MetaLabel>{t.common.step} 1/3</MetaLabel>
        <h1 className="mt-2 font-display text-3xl">{t.category.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.category.subtitle}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {CATEGORIES.map((c) => (
          <OptionCard
            key={c}
            selected={selected === c}
            title={content.categories[c].label}
            subtitle={content.categories[c].description}
            onClick={() => onSelect(c)}
          />
        ))}
      </div>
      <div className="hairline flex flex-wrap justify-between gap-3 pt-5">
        <Button variant="ghost" onClick={onBack}>
          {t.common.back}
        </Button>
        <Button onClick={onNext} disabled={!selected}>
          {t.category.cta}
        </Button>
      </div>
    </Sheet>
  );
}

function ConfigScreen({
  state,
  onChange,
  onBack,
  onNext,
}: {
  state: CaseState;
  onChange: (patch: Partial<CaseState["config"]>) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t } = useI18n();
  const index = provisionalCredibility(state);

  const groups = [
    {
      key: "credibility" as const,
      title: t.config.credibility,
      help: t.config.credibilityHelp,
      values: CREDIBILITIES,
      labels: t.options.credibility as Record<string, string>,
    },
    {
      key: "drama" as const,
      title: t.config.drama,
      help: t.config.dramaHelp,
      values: DRAMAS,
      labels: t.options.drama as Record<string, string>,
    },
    {
      key: "audacity" as const,
      title: t.config.audacity,
      help: t.config.audacityHelp,
      values: AUDACITIES,
      labels: t.options.audacity as Record<string, string>,
    },
    {
      key: "relationship" as const,
      title: t.config.relationship,
      help: t.config.relationshipHelp,
      values: RELATIONSHIPS,
      labels: t.options.relationship as Record<string, string>,
    },
  ];

  return (
    <Sheet className="space-y-7">
      <div>
        <MetaLabel>{t.common.step} 2/3</MetaLabel>
        <h1 className="mt-2 font-display text-3xl">{t.config.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.config.subtitle}</p>
      </div>

      {groups.map((g) => (
        <fieldset key={g.key} className="space-y-3">
          <legend className="label-meta">{g.title}</legend>
          <p className="text-sm text-muted-foreground">{g.help}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {g.values.map((v) => (
              <OptionCard
                key={v}
                selected={state.config[g.key] === v}
                title={g.labels[v] ?? v}
                onClick={() => onChange({ [g.key]: v } as Partial<CaseState["config"]>)}
              />
            ))}
          </div>
        </fieldset>
      ))}

      <div className="rounded-sm border border-divider bg-elevated p-4">
        <div className="flex items-baseline justify-between">
          <MetaLabel>{t.config.indexTitle}</MetaLabel>
          <span className="font-mono text-lg">{index}%</span>
        </div>
        <div className="mt-3">
          <RiskBar value={index} />
        </div>
      </div>

      <div className="hairline flex flex-wrap justify-between gap-3 pt-5">
        <Button variant="ghost" onClick={onBack}>
          {t.common.back}
        </Button>
        <Button onClick={onNext}>{t.config.cta}</Button>
      </div>
    </Sheet>
  );
}

function InterrogationScreen({
  state,
  questions,
  index,
  reduced,
  onAnswer,
  onContext,
  onBack,
  onSubmit,
}: {
  state: CaseState;
  questions: ReturnType<typeof useI18n>["content"]["questions"][Category];
  index: number;
  reduced: boolean;
  onAnswer: (questionId: string, optionId: string, risk: number) => void;
  onContext: (context: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const { t } = useI18n();
  const question = questions[index];
  const total = questions.length;
  const [pendingOption, setPendingOption] = useState<string | null>(null);
  const [filingAnswer, setFilingAnswer] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setPendingOption(null);
    setFilingAnswer(false);
    headingRef.current?.focus({ preventScroll: true });
  }, [index]);

  useEffect(
    () => () => {
      if (filingTimer.current) clearTimeout(filingTimer.current);
      if (answerTimer.current) clearTimeout(answerTimer.current);
    },
    [],
  );

  const registerAnswer = (questionId: string, optionId: string, risk: number) => {
    if (pendingOption) return;
    setPendingOption(optionId);
    filingTimer.current = setTimeout(() => setFilingAnswer(true), reduced ? 560 : 520);
    answerTimer.current = setTimeout(
      () => onAnswer(questionId, optionId, risk),
      reduced ? 700 : 760,
    );
  };

  return (
    <Sheet className="overflow-hidden p-0 sm:p-0">
      <div className="border-b border-divider px-5 py-5 sm:px-8">
        <MetaLabel>{t.verdict.tribunal}</MetaLabel>
        <p className="mt-1 font-display text-xl">{t.interrogation.label}</p>
      </div>

      <div
        key={question?.id ?? "context"}
        className={`space-y-6 px-5 py-6 sm:px-8 sm:py-8 ${filingAnswer ? "animate-testimony-file" : pendingOption ? "" : "animate-case-page"}`}
      >
        <div>
          <div className="flex flex-wrap justify-between gap-x-5 gap-y-1 border-b border-divider pb-3">
            <MetaLabel>
              {t.verdict.file} {state.caseId}
            </MetaLabel>
            <MetaLabel>
              {question
                ? `${t.interrogation.question} ${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
                : t.interrogation.contextTitle}
            </MetaLabel>
          </div>
          <h1 ref={headingRef} tabIndex={-1} className="mt-6 font-display text-2xl sm:text-3xl">
            {question ? question.text : t.interrogation.contextLabel}
          </h1>
        </div>

        {question ? (
          <div className="space-y-2">
            {question.options.map((option) => {
              const answer = state.answers.find((item) => item.questionId === question.id);
              const registering = pendingOption === option.id;
              return (
                <OptionCard
                  key={option.id}
                  selected={registering || answer?.optionId === option.id}
                  status={registering ? t.interrogation.registered : undefined}
                  title={option.label}
                  onClick={() => registerAnswer(question.id, option.id, option.risk)}
                />
              );
            })}
            <span className="sr-only" role="status" aria-live="polite">
              {pendingOption ? t.interrogation.registered : ""}
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="label-meta" htmlFor="context">
              {t.interrogation.contextTitle}
            </label>
            <textarea
              id="context"
              rows={4}
              value={state.context}
              onChange={(event) => onContext(event.target.value)}
              placeholder={t.interrogation.contextPlaceholder}
              className="w-full rounded-sm border border-divider bg-paper p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-stamp"
            />
            <p className="text-xs text-muted-foreground">{t.interrogation.contextWarning}</p>
          </div>
        )}

        <div className="hairline flex flex-wrap justify-between gap-3 pt-5">
          <Button variant="ghost" onClick={onBack} disabled={Boolean(pendingOption)}>
            {t.interrogation.back}
          </Button>
          {!question ? <Button onClick={onSubmit}>{t.interrogation.cta}</Button> : null}
        </div>
      </div>
    </Sheet>
  );
}

function DeliberationScreen({
  messages,
  stamp,
  sessionLabel,
  skipLabel,
  reduced,
  onDone,
}: {
  messages: string[];
  stamp: string;
  sessionLabel: string;
  skipLabel: string;
  reduced: boolean;
  onDone: () => void;
}) {
  const [i, setI] = useState(() => Date.now() % Math.max(1, messages.length));
  const [sealed, setSealed] = useState(false);

  useEffect(() => {
    const rotate = setInterval(() => setI((n) => (n + 1) % Math.max(1, messages.length)), 650);
    const seal = setTimeout(() => setSealed(true), reduced ? 320 : 1750);
    const finish = setTimeout(onDone, reduced ? 650 : 2350);
    return () => {
      clearInterval(rotate);
      clearTimeout(seal);
      clearTimeout(finish);
    };
  }, [messages.length, onDone, reduced]);

  return (
    <Sheet className="flex min-h-[50vh] flex-col items-center justify-center gap-6 overflow-hidden text-center">
      <MetaLabel>{sealed ? stamp : sessionLabel}</MetaLabel>
      {sealed ? (
        <Stamp>{stamp}</Stamp>
      ) : (
        <p key={i} aria-live="polite" className="animate-fade max-w-xl font-display text-2xl">
          {messages[i]}
        </p>
      )}
      <Button variant="ghost" onClick={onDone}>
        {skipLabel}
      </Button>
    </Sheet>
  );
}

function VerdictScreen({
  verdict,
  state,
  copied,
  reduced,
  onCopy,
  onVariant,
  onIncrease,
  onNewCase,
}: {
  verdict: Verdict;
  state: CaseState;
  copied: "idle" | "ok" | "error";
  reduced: boolean;
  onCopy: () => void;
  onVariant: () => void;
  onIncrease: () => void;
  onNewCase: () => void;
}) {
  const { t, content } = useI18n();
  const maxed = isMaxAudacity(state.config.audacity);
  const [escalatingTo, setEscalatingTo] = useState<Audacity | null>(null);
  const [variantPending, setVariantPending] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareTheme, setShareTheme] = useState<ShareCardTheme>("light");
  const riskParts = verdict.riskStatus.split(" · ");
  const resultStamp = pickCaseCopy(
    t.verdict.stamps[state.config.audacity],
    verdict.caseId,
    state.config.audacity,
  );
  const escalationMessage = escalatingTo
    ? pickCaseCopy(t.verdict.escalation[escalatingTo], verdict.caseId, escalatingTo)
    : "";
  const variantMessage = pickCaseCopy(t.verdict.variantTransition, verdict.resultId, "variant");
  const publicExtract: PublicCaseExtract = {
    caseId: verdict.caseId,
    tribunal: t.verdict.tribunal,
    category: content.categories[state.category ?? "familia"].label,
    audacity: t.options.audacity[state.config.audacity],
    stamp: resultStamp,
    verdict: verdict.verdict,
    excuse: verdict.excuse,
    risk: verdict.risk,
    riskStatus: riskParts[0] ?? "",
    punchline:
      riskParts.slice(1).join(" · ") ||
      pickCaseCopy(t.share.punchlines, verdict.caseId, verdict.resultId),
  };

  useEffect(() => {
    if (!escalatingTo) return;
    const timer = setTimeout(
      () => {
        onIncrease();
        setEscalatingTo(null);
      },
      reduced ? 520 : 900,
    );
    return () => clearTimeout(timer);
  }, [escalatingTo, onIncrease, reduced]);

  useEffect(() => {
    if (!variantPending) return;
    const timer = setTimeout(
      () => {
        onVariant();
        setVariantPending(false);
      },
      reduced ? 500 : 650,
    );
    return () => clearTimeout(timer);
  }, [onVariant, reduced, variantPending]);

  if (verdict.refused && verdict.refusal) {
    return (
      <Sheet className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <MetaLabel>{t.verdict.tribunal}</MetaLabel>
          <Stamp>{t.verdict.refusalStamp}</Stamp>
        </div>
        <h1 className="break-words font-display text-3xl">{verdict.refusal.title}</h1>
        <p className="break-words text-muted-foreground">{verdict.refusal.body}</p>
        <div className="hairline pt-5">
          <Button onClick={onNewCase}>{t.verdict.newCase}</Button>
        </div>
      </Sheet>
    );
  }

  const busy = Boolean(escalatingTo) || variantPending;

  return (
    <>
      <Sheet className="relative overflow-hidden">
        {escalatingTo ? (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-paper/95 px-5 text-center"
            role="status"
            aria-live="polite"
          >
            <Stamp>
              {pickCaseCopy(t.verdict.stamps[escalatingTo], verdict.caseId, escalatingTo)}
            </Stamp>
            <p className="animate-fade max-w-md font-display text-xl sm:text-2xl">
              {escalationMessage}
            </p>
          </div>
        ) : variantPending ? (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-paper/95 px-5 text-center"
            role="status"
            aria-live="polite"
          >
            <MetaLabel>{t.verdict.variant}</MetaLabel>
            <p className="animate-fade max-w-md font-display text-xl sm:text-2xl">
              {variantMessage}
            </p>
          </div>
        ) : null}

        <div
          key={verdict.resultId}
          aria-busy={busy}
          className={`space-y-6 ${busy ? "opacity-20" : "animate-verdict-reveal"}`}
        >
          <div className="result-reveal-meta flex flex-wrap items-start justify-between gap-4">
            <div>
              <MetaLabel>{t.verdict.tribunal}</MetaLabel>
              <p className="label-meta mt-1">
                {t.verdict.file} {verdict.caseId} · {t.verdict.audacityLabel}:{" "}
                {t.options.audacity[state.config.audacity]}
              </p>
            </div>
            <Stamp>{resultStamp}</Stamp>
          </div>

          <h1 className="result-reveal-verdict break-words font-display text-2xl sm:text-3xl">
            {verdict.verdict}
          </h1>

          <div className="result-reveal-body space-y-6">
            <div className="hairline space-y-2 pt-5">
              <MetaLabel>{t.verdict.authorizedExcuse}</MetaLabel>
              <p className="break-words text-lg leading-relaxed">{verdict.excuse}</p>
            </div>

            <div className="hairline space-y-2 pt-5">
              <MetaLabel>{t.verdict.followUp}</MetaLabel>
              <p className="break-words text-sm">{verdict.followUp}</p>
            </div>

            <div className="hairline space-y-2 pt-5">
              <div className="flex items-baseline justify-between">
                <MetaLabel>{t.verdict.risk}</MetaLabel>
                <span className="font-mono text-lg">{verdict.risk}%</span>
              </div>
              <RiskBar value={verdict.risk} />
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em]">
                {riskParts[0]}
              </p>
              {riskParts.length > 1 ? (
                <p className="text-sm text-muted-foreground">{riskParts.slice(1).join(" · ")}</p>
              ) : null}
              <p className="text-xs text-muted-foreground">{t.verdict.riskDisclaimer}</p>
            </div>

            <div className="hairline grid gap-5 pt-5 sm:grid-cols-2">
              <div>
                <MetaLabel>{t.verdict.weakness}</MetaLabel>
                <p className="mt-2 break-words text-sm leading-relaxed">{verdict.weakness}</p>
              </div>
              <div className="sm:border-l sm:border-divider sm:pl-5">
                <MetaLabel>{t.verdict.repair}</MetaLabel>
                <p className="mt-2 break-words text-sm leading-relaxed">{verdict.repair}</p>
              </div>
            </div>

            <div className="hairline space-y-3 pt-5">
              <div className="grid gap-2 sm:grid-cols-2">
                <Button className="w-full" onClick={onCopy} disabled={busy}>
                  {t.verdict.copy}
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setEscalatingTo(nextAudacity(state.config.audacity))}
                  disabled={maxed || busy}
                >
                  {maxed ? t.verdict.limitReached : t.verdict.increaseAudacity}
                </Button>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:justify-center">
                <Button
                  className="text-foreground"
                  variant="ghost"
                  onClick={() => setVariantPending(true)}
                  disabled={busy}
                >
                  {t.verdict.variant}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShareTheme(
                      document.documentElement.classList.contains("dark") ? "dark" : "light",
                    );
                    setShareOpen(true);
                  }}
                  disabled={busy}
                >
                  {t.verdict.share}
                </Button>
                <Button className="text-xs" variant="ghost" onClick={onNewCase} disabled={busy}>
                  {t.verdict.newCase}
                </Button>
              </div>
              {copied !== "idle" && (
                <p aria-live="polite" className="text-sm text-muted-foreground">
                  {copied === "ok" ? t.verdict.copied : t.verdict.copyError}
                </p>
              )}
              {maxed && (
                <p className="border-l-2 border-stamp pl-3 text-xs text-muted-foreground">
                  {t.verdict.maxWarning}
                </p>
              )}
            </div>
          </div>
        </div>
      </Sheet>
      {shareOpen ? (
        <ShareCaseDialog
          extract={publicExtract}
          strings={t.share}
          theme={shareTheme}
          onClose={() => setShareOpen(false)}
        />
      ) : null}
    </>
  );
}
