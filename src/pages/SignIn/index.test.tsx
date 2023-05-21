import { render } from "@testing-library/react";
import SignIn from ".";

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

describe("SignIn", () => {
  it("renders without errors", () => {
    const { getByText } = render(<SignIn />);

    expect(getByText("appName")).toBeInTheDocument();
  });
});
