import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/e3k/primitives";
import type { UIStrings } from "@/i18n/strings";

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;
const PUBLIC_APP_URL = "https://excusator3000.lovable.app/";

export type ShareCardTheme = "light" | "dark";

const SHARE_PALETTES: Record<
  ShareCardTheme,
  { background: string; ink: string; mutedInk: string; rule: string; stamp: string }
> = {
  light: {
    background: "#faf5e9",
    ink: "#241b16",
    mutedInk: "#6a5e54",
    rule: "#cfc3b2",
    stamp: "#a8392e",
  },
  dark: {
    background: "#24201c",
    ink: "#f2e8d4",
    mutedInk: "#b5a99c",
    rule: "#494037",
    stamp: "#d96555",
  },
};

export interface PublicCaseExtract {
  caseId: string;
  tribunal: string;
  category: string;
  audacity: string;
  stamp: string;
  verdict: string;
  excuse: string;
  risk: number;
  riskStatus: string;
  punchline: string;
}

interface ShareCaseDialogProps {
  extract: PublicCaseExtract;
  strings: UIStrings["share"];
  theme: ShareCardTheme;
  onClose: () => void;
}

function shareExcerpt(text: string, limit = 360): string {
  if (text.length <= limit) return text;
  const candidate = text.slice(0, limit + 1);
  const completeSentences = [...candidate.matchAll(/[.!?](?=\s|$)/g)];
  const sentenceEnd = completeSentences.at(-1)?.index;
  if (sentenceEnd !== undefined && sentenceEnd >= limit * 0.45) {
    return candidate.slice(0, sentenceEnd + 1).trim();
  }

  const clauseEnd = Math.max(
    candidate.lastIndexOf("; "),
    candidate.lastIndexOf(": "),
    candidate.lastIndexOf(", "),
  );
  if (clauseEnd >= limit * 0.55) {
    return `${candidate
      .slice(0, clauseEnd)
      .replace(/[,:;\s]+$/, "")
      .trim()}.`;
  }

  const words = candidate.trim().split(/\s+/);
  words.pop();
  while (
    /^(y|e|o|u|pero|aunque|porque|que|de|del|la|el|los|las|con|sin|por)$/i.test(words.at(-1) ?? "")
  ) {
    words.pop();
  }
  return `${words
    .join(" ")
    .replace(/[,:;\s]+$/, "")
    .trim()}.`;
}

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  while (words.length > 0) {
    const word = words.shift() ?? "";
    const next = line ? `${line} ${word}` : word;
    if (context.measureText(next).width <= maxWidth) {
      line = next;
      continue;
    }
    if (line) lines.push(line);
    line = word;
  }

  if (line) lines.push(line);
  return lines;
}

function fitCanvasExcerpt(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] {
  for (let limit = Math.min(360, text.length); limit >= 120; limit -= 20) {
    const lines = wrapCanvasText(context, shareExcerpt(text, limit), maxWidth);
    if (lines.length <= maxLines) return lines;
  }
  return wrapCanvasText(context, shareExcerpt(text, 120), maxWidth).slice(0, maxLines);
}

function drawLines(
  context: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  y: number,
  lineHeight: number,
): void {
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
}

function drawRule(context: CanvasRenderingContext2D, y: number, color: string): void {
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(90, y);
  context.lineTo(CARD_WIDTH - 90, y);
  context.stroke();
}

async function drawCaseImage(
  canvas: HTMLCanvasElement,
  extract: PublicCaseExtract,
  strings: UIStrings["share"],
  theme: ShareCardTheme,
): Promise<void> {
  await document.fonts.ready;
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  const palette = SHARE_PALETTES[theme];

  context.fillStyle = palette.background;
  context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  context.strokeStyle = palette.rule;
  context.lineWidth = 3;
  context.strokeRect(36, 36, CARD_WIDTH - 72, CARD_HEIGHT - 72);

  context.fillStyle = palette.mutedInk;
  context.font = '500 22px "IBM Plex Mono", monospace';
  context.fillText("EXCUSATOR3000", 90, 105);
  context.fillText(extract.tribunal.toLocaleUpperCase(), 90, 145);

  context.fillStyle = palette.ink;
  context.font = '500 24px "IBM Plex Mono", monospace';
  context.fillText(`${strings.caseLabel.toLocaleUpperCase()}: ${extract.caseId}`, 90, 215);
  context.textAlign = "right";
  context.fillText(extract.audacity.toLocaleUpperCase(), CARD_WIDTH - 90, 215);
  context.textAlign = "left";
  context.fillStyle = palette.mutedInk;
  context.font = '500 20px "IBM Plex Mono", monospace';
  context.fillText(
    `${strings.categoryLabel.toLocaleUpperCase()}: ${extract.category.toLocaleUpperCase()}`,
    90,
    255,
  );
  drawRule(context, 292, palette.rule);

  context.save();
  context.translate(CARD_WIDTH / 2, 370);
  context.rotate((-6 * Math.PI) / 180);
  context.strokeStyle = palette.stamp;
  context.fillStyle = palette.stamp;
  context.lineWidth = 7;
  context.font = '600 30px "IBM Plex Mono", monospace';
  const stampText = extract.stamp.toLocaleUpperCase();
  const stampWidth = Math.min(760, context.measureText(stampText).width + 70);
  context.strokeRect(-stampWidth / 2, -45, stampWidth, 90);
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(stampText, 0, 2, stampWidth - 40);
  context.restore();

  context.fillStyle = palette.mutedInk;
  context.font = '500 21px "IBM Plex Mono", monospace';
  context.fillText(strings.verdictLabel.toLocaleUpperCase(), 90, 480);
  context.fillStyle = palette.ink;
  context.font = '600 54px "Fraunces", Georgia, serif';
  drawLines(context, wrapCanvasText(context, extract.verdict, 900).slice(0, 3), 90, 545, 60);

  drawRule(context, 735, palette.rule);
  context.fillStyle = palette.mutedInk;
  context.font = '500 21px "IBM Plex Mono", monospace';
  context.fillText(strings.excuseLabel.toLocaleUpperCase(), 90, 785);
  context.fillStyle = palette.ink;
  context.font = '400 36px "Fraunces", Georgia, serif';
  drawLines(context, fitCanvasExcerpt(context, extract.excuse, 900, 4), 90, 842, 47);

  drawRule(context, 1065, palette.rule);
  context.fillStyle = palette.mutedInk;
  context.font = '500 21px "IBM Plex Mono", monospace';
  context.fillText(strings.riskLabel.toLocaleUpperCase(), 90, 1112);
  context.fillStyle = palette.stamp;
  context.font = '600 42px "IBM Plex Mono", monospace';
  context.fillText(`${extract.risk}%`, 90, 1160);
  context.fillStyle = palette.ink;
  context.font = '500 25px "IBM Plex Mono", monospace';
  context.fillText(extract.riskStatus.toLocaleUpperCase(), 220, 1160);
  context.fillStyle = palette.mutedInk;
  context.font = 'italic 26px "Fraunces", Georgia, serif';
  context.fillText(extract.punchline, 90, 1208, 900);

  drawRule(context, 1240, palette.rule);
  context.fillStyle = palette.ink;
  context.font = '600 22px "IBM Plex Mono", monospace';
  context.fillText("E3K / EXCUSATOR3000", 90, 1292);
  context.textAlign = "right";
  context.fillStyle = palette.mutedInk;
  context.font = '500 20px "IBM Plex Mono", monospace';
  context.fillText(strings.tagline.toLocaleUpperCase(), CARD_WIDTH - 90, 1292);
}

async function renderCaseImage(
  extract: PublicCaseExtract,
  strings: UIStrings["share"],
  theme: ShareCardTheme,
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  await drawCaseImage(canvas, extract, strings, theme);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))),
      "image/png",
    );
  });
}

function shareText(extract: PublicCaseExtract, strings: UIStrings["share"]): string {
  return [
    strings.title,
    "",
    extract.verdict,
    "",
    `${strings.riskLabel}: ${extract.risk}%.`,
    "",
    strings.tagline,
  ].join("\n");
}

export function ShareCaseDialog({ extract, strings, theme, onClose }: ShareCaseDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "shared" | "downloaded" | "copied" | "error">(
    "idle",
  );

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const controls = [...dialogRef.current.querySelectorAll<HTMLElement>("button")].filter(
        (element) => !element.hasAttribute("disabled"),
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === dialogRef.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    let active = true;
    void drawCaseImage(preview, extract, strings, theme).catch(() => {
      if (active) setFeedback("error");
    });
    return () => {
      active = false;
    };
  }, [extract, strings, theme]);

  const downloadImage = async () => {
    try {
      const blob = await renderCaseImage(extract, strings, theme);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${extract.caseId.toLowerCase()}-excusator3000.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setFeedback("downloaded");
    } catch {
      setFeedback("error");
    }
  };

  const shareCase = async () => {
    const text = shareText(extract, strings);
    try {
      if (navigator.share) {
        let file: File | undefined;
        try {
          const blob = await renderCaseImage(extract, strings, theme);
          file = new File([blob], `${extract.caseId.toLowerCase()}-excusator3000.png`, {
            type: "image/png",
          });
        } catch {
          file = undefined;
        }
        if (file && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ title: strings.title, text, files: [file] });
        } else {
          await navigator.share({ title: strings.title, text, url: PUBLIC_APP_URL });
        }
        setFeedback("shared");
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${PUBLIC_APP_URL}`);
      setFeedback("copied");
    } catch (error) {
      if (error && typeof error === "object" && "name" in error && error.name === "AbortError") {
        return;
      }
      setFeedback("error");
    }
  };

  const feedbackText = {
    idle: "",
    shared: strings.shared,
    downloaded: strings.downloaded,
    copied: strings.copiedText,
    error: strings.shareError,
  }[feedback];
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-foreground/45 px-3 py-5 sm:px-6 sm:py-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-case-title"
        tabIndex={-1}
        className="paper-sheet mx-auto w-full max-w-3xl p-4 outline-none sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-divider pb-3">
          <h2 id="share-case-title" className="font-display text-xl sm:text-2xl">
            {strings.title}
          </h2>
          <Button variant="ghost" onClick={onClose}>
            {strings.close}
          </Button>
        </div>

        <div className="flex max-h-[calc(100svh-14rem)] min-h-0 w-full justify-center">
          <canvas
            ref={previewRef}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            role="img"
            aria-label={`${strings.title}. ${strings.caseLabel}: ${extract.caseId}. ${strings.categoryLabel}: ${extract.category}. ${strings.audacityLabel}: ${extract.audacity}. ${strings.verdictLabel}: ${extract.verdict}. ${strings.excuseLabel}: ${shareExcerpt(extract.excuse)}. ${strings.riskLabel}: ${extract.risk}%, ${extract.riskStatus}. ${extract.punchline}. ${strings.tagline}`}
            className="block h-auto max-h-[calc(100svh-14rem)] w-auto max-w-full border border-divider shadow-file"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-divider pt-4 sm:flex-row sm:flex-wrap">
          <Button className="w-full sm:w-auto" onClick={shareCase}>
            {strings.share}
          </Button>
          <Button className="w-full sm:w-auto" variant="outline" onClick={downloadImage}>
            {strings.download}
          </Button>
          <Button className="w-full sm:w-auto" variant="ghost" onClick={onClose}>
            {strings.close}
          </Button>
        </div>
        <p aria-live="polite" className="mt-3 min-h-5 text-sm text-muted-foreground">
          {feedbackText}
        </p>
      </div>
    </div>
  );
}
