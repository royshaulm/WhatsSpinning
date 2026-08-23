import { useEffect, useState } from 'react';
import { bootLegacyRuntime } from '../services/legacyRuntime';

export function useLegacyRuntime() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let active = true;
    bootLegacyRuntime().then(() => active && setReady(true)).catch((e) => active && setError(e));
    return () => { active = false; };
  }, []);
  return { ready, error };
}
