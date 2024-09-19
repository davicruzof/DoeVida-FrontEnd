import { fireEvent, waitFor } from "@testing-library/react";
import CardForm from ".";
import { renderWithProvider } from "@/test-utils/test-utils";

const mockNavigate = jest.fn();

const mockHandleSubmitError = {
  cpf: { message: "A senha é obrigatória" },
  password: { message: "O cpf é obrigatório" },
};

jest.mock("react-i18next", () => ({
  ...jest.requireActual("react-i18next"),
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: mockHandleSubmitError },
  }),
}));

describe("CardForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render card form", () => {
    const { getByText } = renderWithProvider(<CardForm />);

    expect(getByText("signInSubtitle")).toBeInTheDocument();
  });

  it("navigates to recovery password page", () => {
    const { getByText } = renderWithProvider(<CardForm />);

    fireEvent.click(getByText("signInRecoveryPasswordButton"));

    expect(mockNavigate).toHaveBeenCalledWith("/recoveryPassword", {
      replace: true,
    });
  });

  it("navigates to create new account page", () => {
    const { getByText } = renderWithProvider(<CardForm />);

    fireEvent.click(getByText("signInCreateNewAccount"));

    expect(mockNavigate).toHaveBeenCalledWith("/signUp", { replace: true });
  });

  it("renders the form inputs", () => {
    const { getByText, getByPlaceholderText } = renderWithProvider(
      <CardForm />
    );

    expect(getByText("signInInputCpf")).toBeInTheDocument();
    expect(
      getByPlaceholderText("signInPlaceholderInputCpf")
    ).toBeInTheDocument();
    expect(getByText("signInInputPassword")).toBeInTheDocument();
    expect(
      getByPlaceholderText("signInPlaceholderInputPassword")
    ).toBeInTheDocument();
  });

  describe("handles form submission", () => {
    it("success with valid credentials", async () => {
      const mockHandleSubmitSuccess = { cpf: "96328770472", password: "pass" };

      const { getByText, getByPlaceholderText } = renderWithProvider(
        <CardForm />
      );

      fireEvent.change(getByPlaceholderText("signInPlaceholderInputCpf"), {
        target: { value: mockHandleSubmitSuccess.cpf },
      });

      fireEvent.change(getByPlaceholderText("signInPlaceholderInputPassword"), {
        target: { value: mockHandleSubmitSuccess.password },
      });

      fireEvent.click(getByText("signInButton"));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
      });
    });

    it("handles errors submission", () => {
      const { getByText } = renderWithProvider(<CardForm />);

      fireEvent.click(getByText("signInButton"));

      expect(getByText(mockHandleSubmitError.cpf.message)).toBeInTheDocument();
      expect(
        getByText(mockHandleSubmitError.password.message)
      ).toBeInTheDocument();
    });
  });

  it("displays error messages for invalid inputs", async () => {
    const { getByText, getByPlaceholderText } = renderWithProvider(
      <CardForm />
    );

    fireEvent.change(getByPlaceholderText("signInPlaceholderInputCpf"), {
      target: { value: "invalid_cpf" },
    });

    fireEvent.change(getByPlaceholderText("signInPlaceholderInputPassword"), {
      target: { value: "" }, // Empty password
    });

    fireEvent.click(getByText("signInButton"));

    await waitFor(() => {
      expect(getByText("O cpf é obrigatório")).toBeInTheDocument();
      expect(getByText("A senha é obrigatória")).toBeInTheDocument();
    });
  });

  it("does not navigate if form submission fails", async () => {
    const { getByText } = renderWithProvider(<CardForm />);

    fireEvent.click(getByText("signInButton"));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalledWith("/home", { replace: true });
    });
  });
});
