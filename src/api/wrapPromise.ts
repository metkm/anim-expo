type ApiFn<T> = (...args: any[]) => Promise<T>;

export const wrapPromise = <T>(func: ApiFn<T>, ...params: any[]) => {
  var data: T;

  const promise = func(...params).then(result => {
    data = result;
  })

  return () => {
    if (!data) throw promise;
    return data;
  }
}
