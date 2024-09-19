import { render } from "@testing-library/react";
import { AppContextProvider } from "@/context/auth";
import React from "react";

export const renderWithProvider = (children: React.ReactElement) => {
  return render(
    <AppContextProvider
      value={{
        authValues: { signed: true },
        setAuthValues: () => null,
      }}
    >
      {children}
    </AppContextProvider>
  );
};
