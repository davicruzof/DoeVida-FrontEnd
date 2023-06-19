import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ButtonOutline } from "@/components/ButtonOutline";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./styles";
import { CreateUserProps, createUserFormSchema } from "./type";
import { useMutation } from "@tanstack/react-query";
import { getAddress } from "@/services/viaCepApi";

const SignUp: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<CreateUserProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(createUserFormSchema),
  });

  const { mutate: getAddressRefetch, data: Address } = useMutation({
    mutationFn: (cep: string) => getAddress(cep),
    onSuccess: (data: any) => {
      setValue("city", data.localidade);
      setValue("bairro", data.bairro);
      setValue("uf", data.uf);
      setValue("complement", data.complemento);
      setValue("street", data.logradouro);
    },
  });

  const createUser = (data: CreateUserProps) => {
    console.log("data: ", data);
  };

  const clearFieldAddress = () => {
    resetField("city");
    resetField("bairro");
    resetField("uf");
    resetField("complement");
    resetField("street");
  };

  useEffect(() => {
    if (watch("cep").length === 8) {
      getAddressRefetch(watch("cep"));
    } else {
      clearFieldAddress();
    }
  }, [watch("cep")]);

  return (
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

            {errors.phone && <S.TextError>{errors.phone.message}</S.TextError>}
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

        <S.WrapperForm>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressCep")}
              placeholder={t("signUpAddressCepPlaceholder")}
              register={register}
              name="cep"
            />

            {errors.cep && <S.TextError>{errors.cep.message}</S.TextError>}
          </S.WrapperError>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressUf")}
              placeholder={t("signUpAddressUfPlaceholder")}
              register={register}
              name="uf"
            />

            {errors.uf && <S.TextError>{errors.uf.message}</S.TextError>}
          </S.WrapperError>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressCity")}
              placeholder={t("signUpAddressCityPlaceholder")}
              register={register}
              name="city"
            />

            {errors.city && <S.TextError>{errors.city.message}</S.TextError>}
          </S.WrapperError>
        </S.WrapperForm>

        <S.WrapperForm>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressStreet")}
              placeholder={t("signUpAddressStreetPlaceholder")}
              register={register}
              name="street"
            />

            {errors.street && (
              <S.TextError>{errors.street.message}</S.TextError>
            )}
          </S.WrapperError>
        </S.WrapperForm>
        <S.WrapperForm>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressNumber")}
              placeholder={t("signUpAddressNumberPlaceholder")}
              register={register}
              name="number"
            />

            {errors.number && (
              <S.TextError>{errors.number.message}</S.TextError>
            )}
          </S.WrapperError>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressBairro")}
              placeholder={t("signUpAddressBairroPlaceholder")}
              register={register}
              name="bairro"
            />

            {errors.bairro && (
              <S.TextError>{errors.bairro.message}</S.TextError>
            )}
          </S.WrapperError>
          <Input
            type="text"
            label={t("signUpAddressComplement")}
            placeholder={t("signUpAddressComplementPlaceholder")}
            register={register}
            name="complement"
          />
        </S.WrapperForm>
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
  );
};

export default SignUp;
