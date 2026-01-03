export function safeJsonParse<T>(value: string | null, fallback: T): T {
  try {
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function readLS<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  return safeJsonParse<T>(localStorage.getItem(key), fallback);
}

export function writeLS<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeLS(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}
