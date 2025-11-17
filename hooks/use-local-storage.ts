'use client';

import { useState, useEffect, useCallback } from 'react';

type StorageValue<T> = T | null;

interface UseLocalStorageReturn<T> {
  value: StorageValue<T>;
  setValue: (value: T | ((prev: StorageValue<T>) => T)) => void;
  removeValue: () => void;
  isLoaded: boolean;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): UseLocalStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<StorageValue<T>>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const getValue = useCallback((): StorageValue<T> => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const setValue = useCallback((value: T | ((prev: StorageValue<T>) => StorageValue<T>)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(null);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    setStoredValue(getValue());
    setIsLoaded(true);
  }, [getValue]);

  return {
    value: storedValue,
    setValue,
    removeValue,
    isLoaded
  };
}

export function useLocalStorageObject<T extends Record<string, unknown>>(
  key: string,
  initialValue: T
) {
  const { value, setValue, removeValue, isLoaded } = useLocalStorage<T>(key, initialValue);

  const updateField = useCallback((field: keyof T, fieldValue: T[keyof T]) => {
    setValue(prev => (prev ? { ...prev, [field]: fieldValue } : { [field]: fieldValue }) as T);
  }, [setValue]);

  const removeField = useCallback((field: keyof T) => {
    setValue(prev => {
      if (!prev) return initialValue;
      const { [field]: _, ...rest } = prev;
      return rest as T;
    });
  }, [setValue, initialValue]);

  return {
    value,
    setValue,
    updateField,
    removeField,
    removeValue,
    isLoaded
  };
}

export function useLocalStorageArray<T>(
  key: string,
  initialValue: T[] = []
) {
  const { value, setValue, removeValue, isLoaded } = useLocalStorage<T[]>(key, initialValue);

  const addItem = useCallback((item: T) => {
    setValue(prev => prev ? [...prev, item] : [item]);
  }, [setValue]);

  const removeItem = useCallback((index: number) => {
    setValue(prev => prev ? prev.filter((_, i) => i !== index) : []);
  }, [setValue]);

  const updateItem = useCallback((index: number, item: T) => {
    setValue(prev => {
      if (!prev) return [item];
      const newArray = [...prev];
      newArray[index] = item;
      return newArray;
    });
  }, [setValue]);

  const clearAll = useCallback(() => {
    setValue([]);
  }, [setValue]);

  return {
    value: value || [],
    setValue,
    addItem,
    removeItem,
    updateItem,
    clearAll,
    removeValue,
    isLoaded
  };
}