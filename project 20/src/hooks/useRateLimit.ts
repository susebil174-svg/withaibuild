import { useCallback } from 'react';

interface RateLimitOptions {
  key: string;
  maxAttempts: number;
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remainingMs: number;
}

export function useRateLimit({ key, maxAttempts, windowMs }: RateLimitOptions) {
  const check = useCallback((): RateLimitResult => {
    const storageKey = `rl_${key}`;
    const now = Date.now();
    let record: { attempts: number[]; } = { attempts: [] };

    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) record = JSON.parse(stored);
    } catch {
      record = { attempts: [] };
    }

    record.attempts = record.attempts.filter((t) => now - t < windowMs);

    if (record.attempts.length >= maxAttempts) {
      const oldest = record.attempts[0];
      return { allowed: false, remainingMs: windowMs - (now - oldest) };
    }

    record.attempts.push(now);
    try {
      localStorage.setItem(storageKey, JSON.stringify(record));
    } catch {
      // localStorage unavailable, allow
    }

    return { allowed: true, remainingMs: 0 };
  }, [key, maxAttempts, windowMs]);

  return { check };
}
