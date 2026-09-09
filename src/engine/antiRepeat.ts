const KEY = "e3k.recent-results";
const MAX = 8;

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function getRecent(): string[] {
  if (typeof window === "undefined") return [];
  return read();
}

export function remember(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const next = [id, ...read().filter((x) => x !== id)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* persistence is optional */
  }
}

/** Pick the first candidate not seen recently, else the least recently seen. */
export function pickFresh<T>(items: T[], idOf: (item: T) => string): T {
  const recent = getRecent();
  const fresh = items.filter((i) => !recent.includes(idOf(i)));
  const pool = fresh.length > 0 ? fresh : items;
  return pool[Math.floor(Math.random() * pool.length)];
}
