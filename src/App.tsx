import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./routes";
import { AxiosError } from "axios";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (_, error) => {
          const err = error as AxiosError;
          const status = err?.response?.status;
          if (!status || [401, 403, 404].includes(status)) {
            return false;
          }
          return true;
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}

export default App;
