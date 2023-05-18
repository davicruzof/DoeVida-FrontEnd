import React from "react";
import * as S from "./styles";
import { ButtonProps } from "./types";

export const ButtonOutline: React.FC<ButtonProps> = ({
  textButton,
  handlePress,
  ...props
}) => {
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
};
