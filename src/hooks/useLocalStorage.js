import { useEffect, useState } from "react";

const useLocalStorage = (storageKey, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (err) {
      console.error(`Error parsing localStorage key "${storageKey}":`, err);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting localStorage key "${storageKey}":`, err);
    }
  }, [value, storageKey]);

  return [value, setValue];
};

export default useLocalStorage;
