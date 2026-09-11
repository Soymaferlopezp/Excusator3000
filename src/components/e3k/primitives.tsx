import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Sheet({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section className={cn("paper-sheet animate-sheet rounded-md p-5 sm:p-8", className)}>
      {children}
    </section>
  );
}

export function MetaLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-meta", className)}>{children}</p>;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "stamp" | "outline" | "ghost";
};

export function Button({ variant = "stamp", className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-5 py-3 text-sm font-medium tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        variant === "stamp" &&
          "bg-stamp text-stamp-foreground hover:bg-stamp-hover disabled:hover:bg-stamp",
        variant === "outline" &&
          "border border-divider bg-elevated text-foreground hover:bg-muted disabled:hover:bg-elevated",
        variant === "ghost" &&
          "text-muted-foreground hover:text-foreground disabled:hover:text-muted-foreground",
        className,
      )}
    />
  );
}

export function OptionCard({
  selected,
  title,
  subtitle,
  status,
  onClick,
}: {
  selected: boolean;
  title: string;
  subtitle?: string;
  status?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-sm border px-4 py-3 text-left transition-colors",
        selected
          ? "border-stamp bg-elevated"
          : "border-divider bg-paper hover:border-muted-foreground",
      )}
    >
      <span className="flex items-start gap-2">
        <span
          aria-hidden
          className={cn(
            "mt-1 h-2.5 w-2.5 flex-none rounded-full border",
            selected ? "border-stamp bg-stamp" : "border-divider",
          )}
        />
        <span className="min-w-0">
          <span className="block break-words font-display text-base leading-snug">{title}</span>
          {subtitle ? (
            <span className="mt-1 block text-sm text-muted-foreground">{subtitle}</span>
          ) : null}
          {status ? (
            <span className="mt-2 block break-words font-mono text-[10px] uppercase tracking-[0.14em] text-stamp">
              {status}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}

export function RiskBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-sm bg-muted">
      <div
        className="h-full bg-stamp transition-[width] duration-500"
        style={{ width: `${Math.max(2, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function Stamp({ children }: { children: ReactNode }) {
  return (
    <span className="animate-stamp inline-block max-w-full break-words rounded-sm border-[3px] border-stamp px-3 py-2 text-center font-mono text-xs font-medium uppercase tracking-[0.14em] text-stamp sm:px-4 sm:text-sm sm:tracking-[0.22em]">
      {children}
    </span>
  );
}
