import React, { useContext } from "react";

import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { authProps, authSchema } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonLink } from "../../../../components/ButtonLink";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { AuthContext, IAuth } from "../../../../context/auth";
import { IUserAuth, users } from "./dataBase";

const CardForm: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthValues } = useContext(AuthContext);
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
    const user = users.find(
      (user: IUserAuth) =>
        user.cpf === data.cpf.replace(/\D/g, "") &&
        user.password === data.password
    );

    if (!user) {
      return alert("Cpf ou senha inválidos");
    }

    const authData: IAuth = {
      signed: true,
      user_type: user.user_type,
      user: {
        name: user.name,
        cpf: user.cpf,
      },
      enterprise: user.enterprise,
    };

    setAuthValues(authData);

    const routes = {
      [users[0].user_type]: "/enterprises",
      [users[1].user_type]: "/agendamentos doador",
      [users[2].user_type]: "/agendamentos doador",
      [users[3].user_type]: "/agendamentos",
    };

    window.sessionStorage.setItem("authStorage", JSON.stringify(authData));
    navigate(routes[user.user_type], {
      replace: true,
    });
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
