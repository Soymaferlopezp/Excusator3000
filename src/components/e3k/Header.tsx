import { LOCALE_LABELS, useI18n } from "@/i18n/I18nProvider";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function Header({ onHome }: { onHome: () => void }) {
  const { locale, setLocale, locales, t } = useI18n();
  const { toggle } = useTheme();

  return (
    <header className="border-b border-divider bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6">
        <div className="min-w-0">
          <button
            type="button"
            onClick={onHome}
            aria-label={t.nav.home}
            className="flex min-h-11 w-[clamp(5.75rem,28vw,7.5rem)] flex-col items-start justify-center rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            <img
              src="/excusator3000-wordmark-light.svg"
              alt="Excusator3000"
              className="h-auto w-full dark:hidden"
            />
            <img
              src="/excusator3000-wordmark-dark.svg"
              alt="Excusator3000"
              className="hidden h-auto w-full dark:block"
            />
            <span className="label-meta mt-1 truncate">{t.brandSubtitle}</span>
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div
            className="flex overflow-hidden rounded-sm border border-divider"
            role="group"
            aria-label={t.nav.language}
          >
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={l === locale}
                className={cn(
                  "min-h-11 px-2 py-1.5 font-mono text-[11px] tracking-widest transition-colors sm:px-2.5",
                  l === locale
                    ? "bg-stamp text-stamp-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.theme}
            title={t.nav.theme}
            className="min-h-11 min-w-11 whitespace-nowrap rounded-sm border border-divider px-2.5 py-1.5 font-mono text-[11px] tracking-widest text-muted-foreground hover:text-foreground"
          >
            ☾/☀
          </button>
        </div>
      </div>
    </header>
  );
}
