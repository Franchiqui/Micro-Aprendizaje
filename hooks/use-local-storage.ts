'use client';

import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((prevValue: T) => T);

interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: unknown) => void;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError = (error: unknown) => {
      console.error(`useLocalStorage error for key "${key}":`, error);
    }
  } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      onError(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: SetValue<T>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serializer(valueToStore));
      }
    } catch (error) {
      onError(error);
    }
  }, [key, serializer, storedValue, onError]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      onError(error);
    }
  }, [key, initialValue, onError]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== event.oldValue) {
        try {
          const newValue = event.newValue ? deserializer(event.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          onError(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, deserializer, onError]);

  return [storedValue, setValue, removeValue] as const;
}

export function useLocalStorageBoolean(key: string, initialValue: boolean = false) {
  return useLocalStorage<boolean>(key, initialValue, {
    serializer: (value: boolean) => value.toString(),
    deserializer: (value: string) => value === 'true'
  });
}

export function useLocalStorageNumber(key: string, initialValue: number = 0) {
  return useLocalStorage<number>(key, initialValue, {
    serializer: (value: number) => value.toString(),
    deserializer: (value: string) => Number(value)
  });
}

export function useLocalStorageString(key: string, initialValue: string = '') {
  return useLocalStorage<string>(key, initialValue, {
    serializer: (value: string) => value,
    deserializer: (value: string) => value
  });
}