export type ImmutableMap<K, V> = {
  internal: Map<K, V>;
};

export const imMapEmpty = <K, V>(): ImmutableMap<K, V> => {
  return {
    internal: new Map<K, V>()
  };
};

export const imMap = <K, V>(xs: [K, V][]): ImmutableMap<K, V> => {
  return {
    internal: new Map<K, V>(xs)
  };
};

export const imGet =
  <K, V>(m: ImmutableMap<K, V>) =>
  (k: K): V | undefined => {
    return m.internal.get(k);
  };

export const imToJS = <K, V>(m: ImmutableMap<K, V>) => {
  return m.internal;
};
