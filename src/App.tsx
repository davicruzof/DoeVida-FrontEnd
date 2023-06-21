import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Navigation from "./routes";
import { Main } from "./pages/Main";
import { AppContextProvider } from "./context/auth";
import "./App.css";

function App() {
  const [authValues, setAuthValues] = useState({
    signed: false,
  });

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
      <AppContextProvider value={{ authValues, setAuthValues }}>
        <Main>
          <Navigation />
        </Main>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
