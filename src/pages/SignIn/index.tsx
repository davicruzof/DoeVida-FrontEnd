import React from "react";

import Illustration from "../../assets/illustrations/auth.svg";

import * as S from "./styles";
import CardForm from "./components/CardForm";

const SignIn: React.FC = () => {
  return (
    <S.Container>
      <S.Aside>
        <S.IllustrationImage src={Illustration} alt="" />
      </S.Aside>
      <S.Wrapper>
        <CardForm />
      </S.Wrapper>
    </S.Container>
  );
};

export default SignIn;
