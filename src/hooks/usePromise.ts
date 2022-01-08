import { useState, useCallback } from "react";

type Func<T> = (...params: any[]) => Promise<T>;

const wrapPromise = <T>(func: Func<T>, ...params: any[]) => {
  var data: T;

  const suspender = func(...params).then(res => {
    data = res;
  });

  return () => {
    if (!data) throw suspender;
    return data;
  };
};

export const usePromise = <T>(func: Func<T>, ...params: any[]): [() => T, (...params: any[]) => void] => {
  const [reader, setReader] = useState(() => wrapPromise(func, ...params));

  const updater = useCallback(
    (...newParams: []) => {
      setReader(() => wrapPromise(func, ...newParams));
    },
    [func]
  );

  return [reader, updater];
};
