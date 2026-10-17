import { QueryClient, dehydrate, hydrate } from "@tanstack/react-query";
import { readCache, writeCache } from "./storage";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (count, error) =>
        count < 1 && (!error.response || error.response.status >= 500),
    },
  },
});
const cached = readCache();
if (cached) hydrate(queryClient, cached);
let timer;
queryClient.getQueryCache().subscribe((event) => {
  if (event.type !== "updated" || event.action.type !== "success") return;
  clearTimeout(timer);
  timer = setTimeout(() => writeCache(dehydrate(queryClient)), 250);
});
