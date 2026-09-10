import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Header } from "@/components/e3k/Header";
import { Button, MetaLabel, OptionCard, RiskBar, Sheet, Stamp } from "@/components/e3k/primitives";
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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Step = "home" | "category" | "config" | "interrogation" | "deliberation" | "verdict";

const CREDIBILITIES: Credibility[] = ["sospechosa", "razonable", "impecable"];
const DRAMAS: Drama[] = ["seco", "cinematografico", "telenovela"];
const AUDACITIES: Audacity[] = ["prudente", "valiente", "sin_retorno"];
const RELATIONSHIPS: Relationship[] = ["formal", "cercana", "confianza"];

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

  const copyExcuse = async () => {
    if (!verdict) return;
    try {
      await navigator.clipboard.writeText(verdict.excuse);
      setCopied("ok");
    } catch {
      setCopied("error");
    }
    setTimeout(() => setCopied("idle"), 2600);
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
            onAnswer={(questionId, optionId, risk) => {
              const answers = [
                ...state.answers.filter((a) => a.questionId !== questionId),
                { questionId, optionId, risk },
              ];
              const next = { ...state, answers };
              setState(next);
              if (qIndex < questions.length) setQIndex(qIndex + 1);
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
            skipLabel={t.deliberation.skip}
          />
        )}

        {step === "verdict" && verdict && (
          <VerdictScreen
            verdict={verdict}
            state={state}
            copied={copied}
            onCopy={copyExcuse}
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
  onAnswer,
  onContext,
  onBack,
  onSubmit,
}: {
  state: CaseState;
  questions: ReturnType<typeof useI18n>["content"]["questions"][Category];
  index: number;
  onAnswer: (questionId: string, optionId: string, risk: number) => void;
  onContext: (context: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const { t } = useI18n();
  const question = questions[index];
  const total = questions.length;

  return (
    <Sheet className="space-y-6">
      <div>
        <MetaLabel>
          {t.interrogation.label} · {Math.min(index + 1, total)}/{total}
        </MetaLabel>
        <h1 className="mt-2 font-display text-3xl">
          {question ? question.text : t.interrogation.contextLabel}
        </h1>
      </div>

      {question ? (
        <div className="space-y-2">
          {question.options.map((o) => {
            const answer = state.answers.find((a) => a.questionId === question.id);
            return (
              <OptionCard
                key={o.id}
                selected={answer?.optionId === o.id}
                title={o.label}
                onClick={() => onAnswer(question.id, o.id, o.risk)}
              />
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          <label className="label-meta" htmlFor="context">
            {t.interrogation.contextLabel}
          </label>
          <textarea
            id="context"
            rows={4}
            value={state.context}
            onChange={(e) => onContext(e.target.value)}
            placeholder={t.interrogation.contextPlaceholder}
            className="w-full rounded-sm border border-divider bg-paper p-3 text-sm outline-none"
          />
          <p className="text-xs text-muted-foreground">{t.interrogation.contextWarning}</p>
        </div>
      )}

      <div className="hairline flex flex-wrap justify-between gap-3 pt-5">
        <Button variant="ghost" onClick={onBack}>
          {t.interrogation.back}
        </Button>
        {!question && <Button onClick={onSubmit}>{t.interrogation.cta}</Button>}
      </div>
    </Sheet>
  );
}

function DeliberationScreen({
  messages,
  stamp,
  skipLabel,
  reduced,
  onDone,
}: {
  messages: string[];
  stamp: string;
  skipLabel: string;
  reduced: boolean;
  onDone: () => void;
}) {
  const [i, setI] = useState(0);
  const [sealed, setSealed] = useState(false);

  useEffect(() => {
    const rotate = setInterval(() => setI((n) => (n + 1) % Math.max(1, messages.length)), 800);
    const seal = setTimeout(() => setSealed(true), reduced ? 600 : 2200);
    const finish = setTimeout(onDone, reduced ? 1100 : 3000);
    return () => {
      clearInterval(rotate);
      clearTimeout(seal);
      clearTimeout(finish);
    };
  }, [messages.length, onDone, reduced]);

  return (
    <Sheet className="flex min-h-[50vh] flex-col items-center justify-center gap-6 text-center">
      {sealed ? (
        <Stamp>{stamp}</Stamp>
      ) : (
        <>
          <p className="animate-fade font-display text-2xl">{messages[i]}</p>
          <div className="h-1 w-40 overflow-hidden rounded-sm bg-muted">
            <div className="h-full w-1/3 animate-pulse bg-stamp" />
          </div>
        </>
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
  onCopy,
  onIncrease,
  onNewCase,
}: {
  verdict: Verdict;
  state: CaseState;
  copied: "idle" | "ok" | "error";
  onCopy: () => void;
  onIncrease: () => void;
  onNewCase: () => void;
}) {
  const { t } = useI18n();
  const maxed = isMaxAudacity(state.config.audacity);

  if (verdict.refused && verdict.refusal) {
    return (
      <Sheet className="space-y-5">
        <MetaLabel>{t.verdict.tribunal}</MetaLabel>
        <h1 className="font-display text-3xl">{verdict.refusal.title}</h1>
        <p className="text-muted-foreground">{verdict.refusal.body}</p>
        <div className="hairline pt-5">
          <Button onClick={onNewCase}>{t.verdict.newCase}</Button>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <MetaLabel>{t.verdict.tribunal}</MetaLabel>
          <p className="label-meta mt-1">
            {t.verdict.file} {verdict.caseId} · {t.verdict.audacityLabel}:{" "}
            {t.options.audacity[state.config.audacity]}
          </p>
        </div>
        <Stamp>{t.verdict.resolution}</Stamp>
      </div>

      <h1 className="font-display text-2xl sm:text-3xl">{verdict.verdict}</h1>

      <div className="hairline space-y-2 pt-5">
        <MetaLabel>{t.verdict.authorizedExcuse}</MetaLabel>
        <p className="text-lg leading-relaxed">{verdict.excuse}</p>
      </div>

      <div className="hairline space-y-2 pt-5">
        <MetaLabel>{t.verdict.followUp}</MetaLabel>
        <p className="text-sm">{verdict.followUp}</p>
      </div>

      <div className="hairline space-y-2 pt-5">
        <div className="flex items-baseline justify-between">
          <MetaLabel>{t.verdict.risk}</MetaLabel>
          <span className="font-mono text-lg">{verdict.risk}%</span>
        </div>
        <RiskBar value={verdict.risk} />
        <p className="text-sm">{verdict.riskStatus}</p>
        <p className="text-xs text-muted-foreground">{t.verdict.riskDisclaimer}</p>
      </div>

      <div className="hairline grid gap-4 pt-5 sm:grid-cols-2">
        <div>
          <MetaLabel>{t.verdict.weakness}</MetaLabel>
          <p className="mt-1 text-sm">{verdict.weakness}</p>
        </div>
        <div>
          <MetaLabel>{t.verdict.repair}</MetaLabel>
          <p className="mt-1 text-sm">{verdict.repair}</p>
        </div>
      </div>

      <div className="hairline space-y-3 pt-5">
        <div className="flex flex-wrap gap-3">
          <Button onClick={onCopy}>{t.verdict.copy}</Button>
          <Button variant="outline" onClick={onIncrease} disabled={maxed}>
            {t.verdict.increaseAudacity}
          </Button>
          <Button variant="ghost" onClick={onNewCase}>
            {t.verdict.newCase}
          </Button>
        </div>
        {copied !== "idle" && (
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {copied === "ok" ? t.verdict.copied : t.verdict.copyError}
          </p>
        )}
        {maxed && <p className="text-xs text-muted-foreground">{t.verdict.maxWarning}</p>}
      </div>
    </Sheet>
  );
}
