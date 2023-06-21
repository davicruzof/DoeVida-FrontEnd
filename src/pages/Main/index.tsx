import { ReactNode } from "react";

import { Header } from "../../components/Header";

type MainProps = {
  children: ReactNode;
};

export function Main({ children }: MainProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
