import React from "react";

import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { authProps, authSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonLink } from "@/components/ButtonLink";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

const CardForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(authSchema),
  });

  const createNewAccount = () => {
    navigate("/signUp", { replace: true });
  };

  const authUser = (data: authProps) => {
    navigate("/home", { replace: true });
  };

  return (
    <S.CardContent>
      <S.Title>{t("signInSubtitle")}</S.Title>
      <S.ContainerInputs role="form">
        <Input
          type="text"
          register={register}
          name="cpf"
          label={t("signInInputCpf")}
          placeholder={t("signInPlaceholderInputCpf")}
        />

        {errors?.cpf && <S.TextError>{errors.cpf.message}</S.TextError>}

        <Input
          type="password"
          register={register}
          name="password"
          label={t("signInInputPassword")}
          placeholder={t("signInPlaceholderInputPassword")}
        />

        {errors?.password && (
          <S.TextError>{errors.password.message}</S.TextError>
        )}
      </S.ContainerInputs>

      <S.RecoveryPasswordContainer>
        <ButtonLink
          textButton={t("signInRecoveryPasswordButton")}
          handlePress={() => navigate("/recoveryPassword", { replace: true })}
        />
      </S.RecoveryPasswordContainer>

      <Button textButton={t("signInButton")} onClick={handleSubmit(authUser)} />

      <S.CreateAccountContainer>
        <ButtonLink
          textButton={t("signInCreateNewAccount")}
          handlePress={createNewAccount}
        />
      </S.CreateAccountContainer>
    </S.CardContent>
  );
};

export default CardForm;
