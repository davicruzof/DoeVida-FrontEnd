import React from "react";
import { useTranslation } from "react-i18next";
import { HeaderWithout } from "@/components/HeaderWithout";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ButtonOutline } from "@/components/ButtonOutline";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./styles";
import { CreateUserProps, createUserFormSchema } from "./type";

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(createUserFormSchema),
  });

  const createUser = (data: CreateUserProps) => {
    console.log("data: ", data);
  };

  return (
    <div>
      <HeaderWithout />
      <S.Container>
        <S.Title>{t("signUpTitle")}</S.Title>
        <S.Form role="form">
          <S.TitleSection>{t("signUpSectionDataPerson")}</S.TitleSection>
          <S.WrapperForm>
            <S.WrapperError>
              <Input
                type="text"
                label={t("signUpInputName")}
                placeholder={t("signUpInputNamePlaceholder")}
                register={register}
                name="name"
              />

              {errors.name && <S.TextError>{errors.name.message}</S.TextError>}
            </S.WrapperError>
            <Input
              type="email"
              label={t("signUpInputEmail")}
              placeholder={t("signUpInputEmailPlaceholder")}
              register={register}
              name="email"
            />
          </S.WrapperForm>
          <S.WrapperForm>
            <S.WrapperError>
              <Input
                type="text"
                label={t("signUpInputCpf")}
                placeholder={t("signUpInputCpfPlaceholder")}
                register={register}
                name="cpf"
              />

              {errors.cpf && <S.TextError>{errors.cpf.message}</S.TextError>}
            </S.WrapperError>

            <S.WrapperError>
              <Input
                type="date"
                label={t("signUpInputBirthDay")}
                placeholder={t("signUpInputEmailPlaceholder")}
                register={register}
                name="birthDay"
              />

              {errors.birthDay && (
                <S.TextError>{errors.birthDay.message}</S.TextError>
              )}
            </S.WrapperError>

            <S.WrapperError>
              <Input
                type="phone"
                label={t("signUpInputPhone")}
                placeholder={t("signUpInputPhonePlaceholder")}
                register={register}
                name="phone"
              />

              {errors.phone && (
                <S.TextError>{errors.phone.message}</S.TextError>
              )}
            </S.WrapperError>

            <S.WrapperError>
              <Input
                label={t("signUpInputPassword")}
                type="password"
                placeholder={t("signUpInputPasswordPlaceholder")}
                register={register}
                name="password"
              />

              {errors.password && (
                <S.TextError>{errors.password.message}</S.TextError>
              )}
            </S.WrapperError>
          </S.WrapperForm>
          <S.TitleSection>{t("signUpSectionDataAddress")}</S.TitleSection>
        </S.Form>

        <S.ButtonsContainer>
          <Button
            textButton={t("signUpButtonCreate")}
            onClick={handleSubmit(createUser)}
          />
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
