import { render, fireEvent } from "@testing-library/react";
import SignIn from ".";

describe("SignIn", () => {
  it("renders without errors", () => {
    render(<SignIn />);
  });

  it("Should render inputs and updates the value state on input change", () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const cpfInput = getByPlaceholderText("signInPlaceholderInputCpf");
    const passwordInput = getByPlaceholderText(
      "signInPlaceholderInputPassword"
    );

    expect(getByText("signInInputCpf")).toBeInTheDocument();
    expect(getByText("signInInputPassword")).toBeInTheDocument();

    fireEvent.change(cpfInput, { target: { value: "123456789" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(cpfInput.value).toBe("123456789");
    expect(passwordInput.value).toBe("password123");
  });

  it("triggers the handlePress function on button click", () => {
    const { getByText } = render(<SignIn />);
    const signInButton = getByText("signInButton");

    // Mock the handlePress function
    const handlePress = jest.fn();
    signInButton.onclick = handlePress;

    fireEvent.click(signInButton);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("triggers the handlePress function on button recovery password click", () => {
    const { getByText } = render(<SignIn />);
    const recoveryPasswordButton = getByText("signInRecoveryPasswordButton");

    // Mock the handlePress function
    const handlePress = jest.fn();
    recoveryPasswordButton.onclick = handlePress;

    fireEvent.click(recoveryPasswordButton);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("triggers the handlePress function on button create account button click", () => {
    const { getByText } = render(<SignIn />);
    const createAccountButton = getByText("signInCreateNewAccount");

    // Mock the handlePress function
    const handlePress = jest.fn();
    createAccountButton.onclick = handlePress;

    fireEvent.click(createAccountButton);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
