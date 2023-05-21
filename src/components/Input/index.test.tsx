import { fireEvent, render, screen } from "@testing-library/react";
import { Input } from ".";

const setup = ({ register, label, name, ...rest }: any) => {
  return render(
    <Input register={register} name={name} label={label} {...rest} />
  );
};

describe("Input component", () => {
  it("renders input component", () => {
    setup({
      type: "text",
      register: jest.fn(),
      name: "input",
      placeholder: "Enter value",
      label: "label",
    });
    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("updates input value correctly", () => {
    setup({
      type: "text",
      register: jest.fn(),
      name: "input",
      placeholder: "Enter value",
      label: "label",
    });

    const input = screen.getByPlaceholderText("Enter value");

    fireEvent.change(input, { target: { value: "Test" } });

    expect(input.value).toBe("Test");
  });
});
