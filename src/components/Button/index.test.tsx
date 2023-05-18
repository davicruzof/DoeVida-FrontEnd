import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from ".";

const MOCK_TEXT = "testing";
const MOCK_HANDLE_PRESS = jest.fn();

describe("<Button />", () => {
  it("should render button component", () => {
    render(<Button textButton={MOCK_TEXT} handlePress={MOCK_HANDLE_PRESS} />);
    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  it("Action on Press button", () => {
    render(<Button textButton={MOCK_TEXT} handlePress={MOCK_HANDLE_PRESS} />);

    fireEvent.click(screen.getByText(MOCK_TEXT));

    expect(MOCK_HANDLE_PRESS).toHaveBeenCalled();
  });
});
