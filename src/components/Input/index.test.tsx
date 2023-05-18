import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from ".";
import { InputProps } from "./types";

const setup = ({ type, placeholder, label, updateValue }: InputProps) => {
  return render(
    <Input
      type={type}
      updateValue={updateValue}
      placeholder={placeholder}
      label={label}
    />
  );
};

describe("Input component", () => {
  it("renders input component", () => {
    setup({
      type: "text",
      placeholder: "Enter value",
      label: "label",
      updateValue: jest.fn(),
    });
    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("updates input value correctly", () => {
    setup({
      type: "text",
      placeholder: "Enter value",
      label: "label",
      updateValue: jest.fn(),
    });

    const input = screen.getByPlaceholderText("Enter value");

    fireEvent.change(input, { target: { value: "Test" } });

    expect(input.value).toBe("Test");
  });
});
