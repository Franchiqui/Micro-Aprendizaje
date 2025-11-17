import { useState, useEffect, useRef, useCallback } from 'react';

interface UseDebounceOptions {
  delay?: number;
  leading?: boolean;
  trailing?: boolean;
}

export function useDebounce<T>(
  value: T,
  options: UseDebounceOptions = {}
): T {
  const {
    delay = 300,
    leading = false,
    trailing = true
  } = options;

  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const firstCallRef = useRef(true);

  const debounce = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (firstCallRef.current && leading) {
      setDebouncedValue(value);
      firstCallRef.current = false;
      return;
    }

    timeoutRef.current = setTimeout(() => {
      if (isMountedRef.current && trailing) {
        setDebouncedValue(value);
      }
    }, delay);
  }, [value, delay, leading, trailing]);

  useEffect(() => {
    isMountedRef.current = true;
    firstCallRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    debounce();
  }, [debounce]);

  return debouncedValue;
}

export function useDebounceCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300,
  options: Omit<UseDebounceOptions, 'delay'> = {}
): (...args: Parameters<T>) => void {
  const {
    leading = false,
    trailing = true
  } = options;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const firstCallRef = useRef(true);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (firstCallRef.current && leading) {
      callbackRef.current(...args);
      firstCallRef.current = false;
      return;
    }

    timeoutRef.current = setTimeout(() => {
      if (isMountedRef.current && trailing) {
        callbackRef.current(...args);
      }
    }, delay);
  }, [delay, leading, trailing]);
}