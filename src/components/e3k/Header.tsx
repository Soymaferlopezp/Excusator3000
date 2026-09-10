import { LOCALE_LABELS, useI18n } from "@/i18n/I18nProvider";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function Header() {
  const { locale, setLocale, locales, t } = useI18n();
  const { toggle } = useTheme();

  return (
    <header className="border-b border-divider bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="font-display text-lg leading-none tracking-tight">EXCUSATOR3000</p>
          <p className="label-meta mt-1 truncate">{t.brandSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex overflow-hidden rounded-sm border border-divider"
            aria-label={t.nav.language}
          >
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                aria-pressed={l === locale}
                className={cn(
                  "px-2.5 py-1.5 font-mono text-[11px] tracking-widest transition-colors",
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
            className="whitespace-nowrap rounded-sm border border-divider px-2.5 py-1.5 font-mono text-[11px] tracking-widest text-muted-foreground hover:text-foreground"
          >
            ☾/☀
          </button>
        </div>
      </div>
    </header>
  );
}
