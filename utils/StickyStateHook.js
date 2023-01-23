import { useEffect, useReducer, useState } from "react";

export default function useStickyReducer(reducerFunction, defaultValue, key) {
  const REDUCER_OVERRIDE_TYPE = "STICKY_REDUCER_OVERRIDE";

  const [loading, setLoading] = useState(true);
  const [data, dispatch] = useReducer((state, action) => {
    if (action.type === REDUCER_OVERRIDE_TYPE) {
      return action.data;
    } else {
      return reducerFunction(state, action);
    }
  }, defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const retrieved = JSON.parse(window.localStorage.getItem(key));

    dispatch({
      type: REDUCER_OVERRIDE_TYPE,
      data: retrieved !== null ? retrieved : defaultValue,
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || loading) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, dispatch, loading];
}

// adapted from https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
// this allows persisting state in local storage for SSR

export function useStickyState(defaultValue, key) {
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
