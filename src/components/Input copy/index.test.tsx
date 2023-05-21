import { render, screen } from "@testing-library/react";
import { Input } from ".";
import { InputProps } from "./types";

const setup = ({ type, placeholder, label }: InputProps) => {
  return render(<Input type={type} placeholder={placeholder} label={label} />);
};

describe("Input component", () => {
  it("renders input component", () => {
    setup({
      type: "text",
      placeholder: "Enter value",
      label: "label",
    });
    expect(screen.getByText("label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  // it("updates input value correctly", () => {
  //   setup({
  //     type: "text",
  //     placeholder: "Enter value",
  //     label: "label",
  //   });

  //   const input = screen.getByPlaceholderText("Enter value");

  //   fireEvent.change(input, { target: { value: "Test" } });

  //   expect(input.value).toBe("Test");
  // });
});
