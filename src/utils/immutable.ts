import { Nullable } from "./common";

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

export const imSet =
  <K, V>(m: ImmutableMap<K, V>) =>
  (k: K, v: V): ImmutableMap<K, V> => {
    const newMp = new Map(m.internal);
    newMp.set(k, v);
    return {
      internal: newMp
    };
  };

export const imToJS = <K, V>(m: ImmutableMap<K, V>) => {
  return m.internal;
};

export const zipWith = <L, R, T>(
  l: Nullable<L[]>,
  r: Nullable<R[]>,
  fn: (a: L, b: R) => T
): T[] => {
  const useL = l || [];
  const useR = r || [];
  const lengthR = useR.length;
  const res: T[] = [];
  for (let index = 0; index < useL.length; index++) {
    if (index < lengthR) {
      const el = useL[index];
      const er = useR[index];
      res.push(fn(el, er));
    }
  }
  return res;
};
