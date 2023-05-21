import React from "react";

import { HeaderWithout } from "@/components/HeaderWithout";
import Illustration from "@/assets/illustrations/auth.svg";

import * as S from "./styles";
import CardForm from "./components/CardForm";

const SignIn: React.FC = () => {
  return (
    <div>
      <HeaderWithout />
      <S.Container>
        <S.Aside>
          <S.IllustrationImage src={Illustration} alt="" />
        </S.Aside>
        <S.Wrapper>
          <CardForm />
        </S.Wrapper>
      </S.Container>
    </div>
  );
};

export default SignIn;
