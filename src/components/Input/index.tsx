import * as S from "./styles";
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  label,
  updateValue,
  ...props
}) => {
  return (
    <S.Wrapper>
      <S.Label role="none" aria-label="">
        {label}
      </S.Label>
      <S.Container
        {...props}
        type={type}
        onChange={(e) => updateValue(e.target.value)}
        placeholder={placeholder}
        // value={value}
      />
    </S.Wrapper>
  );
};
