import { HTMLInputTypeAttribute, LegacyRef } from "react";

export interface IInputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  ref: LegacyRef<HTMLInputElement>;
}
