/** Copy a non-empty string, using a selectable DOM fallback when Clipboard API fails. */
export async function copyTextToClipboard(value: string): Promise<boolean> {
  const text = value.trim();
  if (!text) return false;

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Continue to the dependency-free fallback below.
    }
  }

  const textarea = document.createElement("textarea");
  const previouslyFocused =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.setAttribute("aria-hidden", "true");
  Object.assign(textarea.style, {
    position: "fixed",
    top: "0",
    left: "-9999px",
    width: "1px",
    height: "1px",
    padding: "0",
    border: "0",
    opacity: "0.01",
  });

  try {
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
    try {
      previouslyFocused?.focus();
    } catch {
      // Focus restoration is best-effort and must not change the copy result.
    }
  }
}
