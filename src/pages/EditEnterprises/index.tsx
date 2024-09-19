/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonOutline } from "../../components/ButtonOutline";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { getAddress } from "../../services/viaCepApi";
import * as S from "./styles";
import { editEnterpriseFormSchema, EditEnterpriseProps } from "./type";

interface IEnterpriseData {
  id: string;
  enterpriseName: string;
  phoneNumber: string;
  cnpj: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    complement: string;
  };
}

function EditEnterprise() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<EditEnterpriseProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(editEnterpriseFormSchema),
  });

  const { mutate: getAddressRefetch } = useMutation({
    mutationFn: (cep: string) => getAddress(cep),
    onSuccess: (data: any) => {
      setValue("city", data.localidade);
      setValue("neighborhood", data.bairro);
      setValue("uf", data.uf);
      setValue("complement", data.complemento);
      setValue("street", data.logradouro);
    },
  });

  const editEnterprise = (data: EditEnterpriseProps) => {
    const enterprises = window.localStorage.getItem("enterprises");

    const parsedEnterprises = JSON.parse(enterprises!);

    const enterpriseData: IEnterpriseData = {
      id: state.id,
      enterpriseName: data.enterpriseName,
      phoneNumber: data.phoneNumber,
      cnpj: data.cnpj,
      address: {
        street: data.street,
        number: data.number,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.uf,
        zipCode: data.cep,
        complement: data.complement,
      },
    };

    const newEnterprises = parsedEnterprises.map((item: IEnterpriseData) => {
      if (item.id === state.id) {
        return enterpriseData;
      }
      return item;
    });

    window.localStorage.setItem("enterprises", JSON.stringify(newEnterprises));

    window.alert("Organização editada com sucesso!");
    navigate("/enterprises", { replace: true });
  };

  const clearFieldAddress = () => {
    resetField("city");
    resetField("neighborhood");
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

  useEffect(() => {
    if (state) {
      setValue("id", state.id);
      setValue("enterpriseName", state.enterpriseName);
      setValue("cnpj", state.cnpj);
      setValue("phoneNumber", state.phoneNumber);
      setValue("cep", state.address.zipCode);
      setValue("uf", state.address.state);
      setValue("city", state.address.city);
      setValue("street", state.address.street);
      setValue("number", state.address.number);
      setValue("neighborhood", state.address.neighborhood);
      setValue("complement", state.address.complement);
    }
  }, [state]);

  return (
    <S.Container>
      <S.Title>Editar dados da organização</S.Title>
      <S.Form role="form">
        <S.TitleSection>Dados da organização</S.TitleSection>
        <S.WrapperForm>
          <S.WrapperError>
            <Input
              type="text"
              label="Nome da organização"
              placeholder="Digite o nome da organização"
              register={register}
              name="enterpriseName"
            />

            {errors.enterpriseName && (
              <S.TextError>{errors.enterpriseName.message}</S.TextError>
            )}
          </S.WrapperError>
        </S.WrapperForm>
        <S.WrapperForm>
          <S.WrapperError>
            <Input
              type="text"
              label="CNPJ"
              placeholder="Digite o CNPJ"
              register={register}
              name="cnpj"
            />

            {errors.cnpj && <S.TextError>{errors.cnpj.message}</S.TextError>}
          </S.WrapperError>

          <S.WrapperError>
            <Input
              type="phone"
              label="Telefone"
              placeholder="Digite o telefone"
              register={register}
              name="phoneNumber"
            />

            {errors.phoneNumber && (
              <S.TextError>{errors.phoneNumber.message}</S.TextError>
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
              name="neighborhood"
            />

            {errors.neighborhood && (
              <S.TextError>{errors.neighborhood.message}</S.TextError>
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
        <ButtonOutline
          textButton="voltar"
          handlePress={() => navigate("/enterprises", { replace: true })}
        />
        <Button textButton="Editar" onClick={handleSubmit(editEnterprise)} />
      </S.ButtonsContainer>
    </S.Container>
  );
}

export default EditEnterprise;
