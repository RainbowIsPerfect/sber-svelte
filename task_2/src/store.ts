import { writable } from "svelte/store";

type QueryFnReturnType<F extends () => Promise<any>> = Awaited<ReturnType<F>>;

const initial = {
  isError: false,
  isLoading: false,
  data: null,
};
const { subscribe, set, update } = writable(initial);
const cache = new Map();

export const useQuery = <F extends () => Promise<any>>(
  fn: F,
  onSuccess: (data: QueryFnReturnType<F>) => void,
) => {
  return {
    subscribe,
    async query(key: string) {
      if (cache.has(key)) {
        onSuccess(cache.get(key));
        return set({ ...initial, data: cache.get(key) });
      }
      try {
        update((prev) => ({
          ...prev,
          data: null,
          isLoading: true,
          isError: false,
        }));
        const response = await fn();
        cache.set(key, response);
        onSuccess(response);
        set({ ...initial, data: response });
      } catch {
        set({ ...initial, isError: true });
      }
    },
  };
};
