const LEGACY_KEY = "e3k.recent-results";
const KEY = "e3k.recent-results.v2";
const MAX = 12;

export type HistoryKind = "excuse" | "verdict" | "concept" | "opening" | "punchline";
type HistoryStore = Record<HistoryKind, Record<string, string[]>>;

const emptyStore = (): HistoryStore => ({
  excuse: {},
  verdict: {},
  concept: {},
  opening: {},
  punchline: {},
});
const memoryStore = emptyStore();

function readLegacy(): string[] {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function read(): HistoryStore {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") return emptyStore();
    const store = emptyStore();
    for (const kind of Object.keys(store) as HistoryKind[]) {
      const scopes = (parsed as Partial<HistoryStore>)[kind];
      if (!scopes || typeof scopes !== "object") continue;
      for (const [scope, ids] of Object.entries(scopes)) {
        if (Array.isArray(ids)) {
          store[kind][scope] = ids.filter((x): x is string => typeof x === "string").slice(0, MAX);
        }
      }
    }
    return store;
  } catch {
    return emptyStore();
  }
}

export function getRecent(kind: HistoryKind = "excuse", scope = "global"): string[] {
  const memory = memoryStore[kind][scope] ?? [];
  if (typeof window === "undefined") return memory;
  const stored = read()[kind][scope] ?? [];
  const current = [...stored, ...memory.filter((id) => !stored.includes(id))].slice(0, MAX);
  return kind === "excuse"
    ? [...current, ...readLegacy().filter((id) => !current.includes(id))].slice(0, MAX)
    : current;
}

export function remember(id: string, kind: HistoryKind = "excuse", scope = "global"): void {
  const memory = memoryStore[kind][scope] ?? [];
  memoryStore[kind][scope] = [id, ...memory.filter((item) => item !== id)].slice(0, MAX);
  if (typeof window === "undefined") return;
  try {
    const store = read();
    const recent = store[kind][scope] ?? [];
    store[kind][scope] = [id, ...recent.filter((x) => x !== id)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* persistence is optional */
  }
}

/** Pick a fresh candidate, or the least recently used candidate once all have been seen. */
export function pickFresh<T>(
  items: T[],
  idOf: (item: T) => string,
  options: { kind?: HistoryKind; scope?: string; random?: () => number } = {},
): T | undefined {
  if (items.length === 0) return undefined;
  const recent = getRecent(options.kind, options.scope);
  const fresh = items.filter((i) => !recent.includes(idOf(i)));
  const oldestIndex = Math.max(...items.map((item) => recent.indexOf(idOf(item))));
  const pool =
    fresh.length > 0 ? fresh : items.filter((item) => recent.indexOf(idOf(item)) === oldestIndex);
  const random = options.random ?? Math.random;
  return pool[Math.floor(random() * pool.length)] ?? pool[0];
}
