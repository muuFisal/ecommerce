import { useEffect, useMemo, useState } from 'react';
import { readLS, writeLS } from '../utils/storage';

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const initial = useMemo(() => readLS<T>(key, initialValue), [key]);
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    writeLS(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
