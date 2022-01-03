export const wrapPromise = <T>(promise: Promise<T>): () => T => {
  var data: T;

  const suspenser = promise.then(res => {
    data = res;
  });

  return () => {
    if (!data) throw suspenser;
    return data;
  };
};
