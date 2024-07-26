import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    // attempt fetch from local storage.
    try {
      const rawStoredValue = localStorage.getItem(key);
      if (rawStoredValue) {
        return JSON.parse(rawStoredValue);
      }
    } catch (err) {
      console.error("Error while trying to load from local storage", err);
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to update local storage", err);
    }
  }, [key, value]);

  return {
    storedData: value,
    defaults: defaultValue,
    setStoredData: setValue,
  };
};
