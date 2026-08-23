export const storage = {
  get<T>(key: string, fallback: T): T {
    try { const raw = localStorage.getItem(key); return raw == null ? fallback : JSON.parse(raw) as T; } catch { return fallback; }
  },
  set<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); },
  remove(key: string) { localStorage.removeItem(key); },
};
