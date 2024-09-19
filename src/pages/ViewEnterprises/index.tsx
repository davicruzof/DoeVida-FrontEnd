import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ButtonOutline } from "../../components/ButtonOutline";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import * as S from "./styles";
import { viewEnterpriseFormSchema, ViewEnterpriseProps } from "./type";

function ViewEnterprise() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { state } = useLocation();

  const { register, setValue } = useForm<ViewEnterpriseProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(viewEnterpriseFormSchema),
  });

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
              disabled
            />
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
              disabled
            />
          </S.WrapperError>

          <S.WrapperError>
            <Input
              type="phone"
              label="Telefone"
              placeholder="Digite o telefone"
              register={register}
              name="phoneNumber"
              disabled
            />
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
              disabled
            />
          </S.WrapperError>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressUf")}
              placeholder={t("signUpAddressUfPlaceholder")}
              register={register}
              name="uf"
              disabled
            />
          </S.WrapperError>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressCity")}
              placeholder={t("signUpAddressCityPlaceholder")}
              register={register}
              name="city"
              disabled
            />
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
              disabled
            />
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
              disabled
            />
          </S.WrapperError>
          <S.WrapperError>
            <Input
              type="text"
              label={t("signUpAddressBairro")}
              placeholder={t("signUpAddressBairroPlaceholder")}
              register={register}
              name="neighborhood"
              disabled
            />
          </S.WrapperError>
          <Input
            type="text"
            label={t("signUpAddressComplement")}
            placeholder={t("signUpAddressComplementPlaceholder")}
            register={register}
            name="complement"
            disabled
          />
        </S.WrapperForm>
      </S.Form>

      <S.ButtonsContainer>
        <ButtonOutline
          textButton="voltar"
          handlePress={() => navigate("/enterprises", { replace: true })}
        />
        <Button
          textButton="Editar"
          onClick={() => navigate(`/editEnterprises`, { replace: true, state })}
        />
      </S.ButtonsContainer>
    </S.Container>
  );
}

export default ViewEnterprise;
