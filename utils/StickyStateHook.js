import { useEffect, useState } from "react";

// adapted from https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
// this allows persisting state in local storage for SSR

export default function useStickyState(defaultValue, key) {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const retrieved = JSON.parse(window.localStorage.getItem(key));

    setValue(retrieved !== null ? retrieved : defaultValue);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || loading) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue, loading];
}
