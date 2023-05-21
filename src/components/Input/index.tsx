import * as S from "./styles";

export const Input = ({ register, label, name, ...rest }: any) => {
  return (
    <S.Wrapper>
      <S.Label>{label}</S.Label>
      <S.Container {...register(name)} {...rest} />
    </S.Wrapper>
  );
};
