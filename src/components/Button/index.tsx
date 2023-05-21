import * as S from "./styles";

export const Button = ({ textButton, ...props }: any) => {
  return (
    <S.Container aria-label={textButton} role="button" {...props}>
      {textButton}
    </S.Container>
  );
};
