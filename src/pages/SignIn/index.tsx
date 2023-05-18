import React, { useState } from "react";
import Illustration from "@/assets/illustrations/auth.svg";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { HeaderWithout } from "@/components/HeaderWithout";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ButtonLink } from "@/components/ButtonLink";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  const [value, setValue] = useState<string>("");

  const createNewAccount = () => {
    navigation("/signUp", { replace: true });
  };

  return (
    <div title="Doe Vida Login">
      <HeaderWithout />
      <S.Container>
        <S.Aside>
          <S.IllustrationImage src={Illustration} alt="" />
        </S.Aside>
        <S.Wrapper>
          <S.CardContent>
            <S.Title>{t("signInSubtitle")}</S.Title>
            <S.Form role="form">
              <Input
                label={t("signInInputCpf")}
                placeholder={t("signInPlaceholderInputCpf")}
                updateValue={(val: string | number) => setValue(val)}
              />

              <Input
                label={t("signInInputPassword")}
                placeholder={t("signInPlaceholderInputPassword")}
                updateValue={(val: string | number) => setValue(val)}
              />
            </S.Form>

            <S.RecoveryPasswordContainer>
              <ButtonLink
                style={{ textDecoration: "underline" }}
                textButton={t("signInRecoveryPasswordButton")}
                handlePress={() => {}}
              />
            </S.RecoveryPasswordContainer>
            <Button textButton={t("signInButton")} handlePress={() => {}} />
            <S.CreateAccountContainer>
              <ButtonLink
                style={{ textDecoration: "underline" }}
                textButton={t("signInCreateNewAccount")}
                handlePress={createNewAccount}
              />
            </S.CreateAccountContainer>
          </S.CardContent>
        </S.Wrapper>
      </S.Container>
    </div>
  );
};

export default SignIn;
