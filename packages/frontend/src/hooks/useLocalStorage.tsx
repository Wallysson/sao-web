import { useState } from 'react';

export function useLocalStorage(
  key: string,
  initial: string
): [string, (value: string) => Promise<void>] {
  const [state, setState] = useState(() => {
    const local = window.localStorage.getItem(key);
    return local ? local : initial;
  });

  const setLocalStorageValue = async (value: string) => {
    setState(value);
    window.localStorage.setItem(key, value);
  };

  return [state, setLocalStorageValue];
}
