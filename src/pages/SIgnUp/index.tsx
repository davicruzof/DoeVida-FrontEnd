import React, { useState } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { HeaderWithout } from "@/components/HeaderWithout";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ButtonOutline } from "@/components/ButtonOutline";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [_, setValue] = useState<string>("");

  return (
    <div>
      <HeaderWithout />
      <S.Container>
        <S.Title>{t("signUpTitle")}</S.Title>
        <S.Form role="form">
          <S.TitleSection>{t("signUpSectionDataPerson")}</S.TitleSection>
          <S.WrapperForm>
            <Input
              label={t("signUpInputName")}
              placeholder={t("signUpInputNamePlaceholder")}
              updateValue={(val: string) => setValue(val)}
            />

            <Input
              type="email"
              label={t("signUpInputEmail")}
              placeholder={t("signUpInputEmailPlaceholder")}
              updateValue={(val: string) => setValue(val)}
            />
          </S.WrapperForm>
          <S.WrapperForm>
            <Input
              label={t("signUpInputCpf")}
              placeholder={t("signUpInputCpfPlaceholder")}
              updateValue={(val: string) => setValue(val)}
            />

            <Input
              type="date"
              label={t("signUpInputBirthDay")}
              placeholder={t("signUpInputEmailPlaceholder")}
              updateValue={(val: string) => setValue(val)}
            />
            <Input
              type="phone"
              label={t("signUpInputPhone")}
              placeholder={t("signUpInputPhonePlaceholder")}
              updateValue={(val: string) => setValue(val)}
            />

            <Input
              label={t("signUpInputPassword")}
              type="password"
              placeholder={t("signUpInputPasswordPlaceholder")}
              updateValue={(val: string) => setValue(val)}
            />
          </S.WrapperForm>
          <S.TitleSection>{t("signUpSectionDataAddress")}</S.TitleSection>
        </S.Form>

        <S.ButtonsContainer>
          <Button textButton={t("signUpButtonCreate")} handlePress={() => {}} />
          <ButtonOutline
            textButton={t("signUpButtonBack")}
            handlePress={() => navigate("/", { replace: true })}
          />
        </S.ButtonsContainer>
      </S.Container>
    </div>
  );
};

export default SignUp;
