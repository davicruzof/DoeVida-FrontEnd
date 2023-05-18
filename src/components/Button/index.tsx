import * as S from "./styles";
import { ButtonProps } from "./types";

export function Button({ textButton, handlePress, ...props }: ButtonProps) {
  return (
    <S.Container
      aria-label={textButton}
      role="button"
      onClick={handlePress}
      {...props}
    >
      {textButton}
    </S.Container>
  );
}
