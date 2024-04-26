import { encoded, translations } from "./data.js";

export const ignoredKeys: (keyof (typeof encoded)[number])[] = [
  "groupId",
  "service",
  "formatSize",
  "ca",
];

export const decode = <
  E extends Record<string, any>,
  T extends Record<string, any>,
  I extends keyof E,
>(
  encoded: E[],
  translations: T,
  ignoredKeys: I[],
) => {
  const uniqueKeys: (keyof T)[] = [];

  const skipKey = (key: keyof E, value: E[keyof E]) =>
    ignoredKeys.includes(key as I) || !(value in translations);

  const decoded = encoded.reduce<{
    decodedEntries: Record<keyof E, E[keyof E] | T[keyof T]>[];
    keysEntries: Map<keyof T, number>;
  }>(
    (acc, current) => {
      const decodedEntry = {} as Record<keyof E, E[keyof E] | T[keyof T]>;

      for (const key in current) {
        const value = current[key];
        const isSkip = skipKey(key, value);

        decodedEntry[key] = isSkip ? value : translations[value];

        isSkip ||
          acc.keysEntries.set(value, (acc.keysEntries.get(value) || 0) + 1);
      }

      return acc.decodedEntries.push(decodedEntry), acc;
    },
    {
      decodedEntries: [],
      keysEntries: new Map<keyof T, number>(),
    },
  );

  decoded.keysEntries.forEach(
    (value, key) => value === 1 && uniqueKeys.push(key),
  );

  return { decoded: decoded.decodedEntries, uniqueKeys };
};

const call = decode(encoded, translations, ignoredKeys);

console.log(call.decoded, call.uniqueKeys);
