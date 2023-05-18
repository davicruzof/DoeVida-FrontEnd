import { render, screen } from "@testing-library/react";
import { HeaderWithout } from ".";

describe("<HeaderWithout />", () => {
  it("should render header component", () => {
    render(<HeaderWithout />);
    expect(screen.getByRole("img", { name: "" })).toBeInTheDocument();
    expect(screen.getByText("appName")).toBeInTheDocument();
  });
});
