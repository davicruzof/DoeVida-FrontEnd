import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from ".";

const MOCK_TEXT = "testing";
const MOCK_HANDLE_PRESS = jest.fn();

const setup = () => {
  return render(<Button textButton={MOCK_TEXT} onClick={MOCK_HANDLE_PRESS} />);
};

describe("<Button />", () => {
  it("should render button component", () => {
    setup();
    expect(screen.getByText(MOCK_TEXT)).toBeInTheDocument();
  });

  it("Action on Press button", () => {
    setup();

    fireEvent.click(screen.getByText(MOCK_TEXT));

    expect(MOCK_HANDLE_PRESS).toHaveBeenCalled();
  });
});
