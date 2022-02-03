import { useCallback, useState } from "react";

type Function = (...args: any[]) => Promise<any>;

export const wrapPromise = <F extends Function>(func: F, ...params: Parameters<F>) => {
  var data: Awaited<ReturnType<F>>;

  const suspender = func(...params).then(res => {
    data = res;
  });

  return () => {
    if (!data) throw suspender;
    return data;
  };
};

export const usePromise = <F extends Function>(
  func: F,
  ...params: Parameters<F>
): [() => Awaited<ReturnType<F>>, (...params: Parameters<F>) => void] => {
  const [reader, setReader] = useState(() => wrapPromise(func, ...params));

  const updater = useCallback(
    (...newParams: Parameters<F>) => {
      setReader(() => wrapPromise(func, ...newParams));
    },
    [func]
  );

  return [reader, updater];
};
