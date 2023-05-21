import * as S from "./styles";
import { IInputProps } from "./types";

export const Input = ({ label, placeholder, ...rest }: IInputProps) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.CustomInput placeholder={placeholder} {...rest} />
    </S.Container>
  );
};
