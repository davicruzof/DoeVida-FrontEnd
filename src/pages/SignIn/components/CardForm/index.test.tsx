import { render, fireEvent } from "@testing-library/react";
import CardForm from ".";

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
    const { getByText } = render(<CardForm />);

    expect(getByText("signInSubtitle")).toBeInTheDocument();
  });

  it("navigates to recovery password page", () => {
    const { getByText } = render(<CardForm />);

    fireEvent.click(getByText("signInRecoveryPasswordButton"));

    expect(mockNavigate).toHaveBeenCalledWith("/recoveryPassword", {
      replace: true,
    });
  });

  it("navigates to create new account page", () => {
    const { getByText } = render(<CardForm />);

    fireEvent.click(getByText("signInCreateNewAccount"));

    expect(mockNavigate).toHaveBeenCalledWith("/signUp", { replace: true });
  });

  it("renders the form inputs", () => {
    const { getByText, getByPlaceholderText } = render(<CardForm />);

    expect(getByText("signInInputCpf")).toBeInTheDocument();
    expect(
      getByPlaceholderText("signInPlaceholderInputCpf")
    ).toBeInTheDocument();
    expect(getByText("signInInputPassword")).toBeInTheDocument();
    expect(
      getByPlaceholderText("signInPlaceholderInputPassword")
    ).toBeInTheDocument();
  });

  // it("handles form submission", () => {
  //   const mockHandleSubmitSuccess = { cpf: "123456", password: "pass" };

  //   const { getByText, getByPlaceholderText } = render(<CardForm />);

  //   fireEvent.change(getByPlaceholderText("signInPlaceholderInputCpf"), {
  //     target: { value: mockHandleSubmitSuccess.cpf },
  //   });
  //   fireEvent.change(getByPlaceholderText("signInPlaceholderInputPassword"), {
  //     target: { value: mockHandleSubmitSuccess.password },
  //   });

  //   fireEvent.click(getByText("signInButton"));

  //   expect(mockNavigate).toHaveBeenCalledWith("/home", { replace: true });
  // });

  it("handles errors submission", () => {
    const { getByText } = render(<CardForm />);

    fireEvent.click(getByText("signInButton"));

    expect(getByText(mockHandleSubmitError.cpf.message)).toBeInTheDocument();
    expect(
      getByText(mockHandleSubmitError.password.message)
    ).toBeInTheDocument();
  });
});
