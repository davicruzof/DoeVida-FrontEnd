import { render, screen } from "@testing-library/react";
import App from "./App";

describe("first", () => {
  it("should ", () => {
    render(<App />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
