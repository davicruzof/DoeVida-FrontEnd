import Logo from "@/assets/logo.svg";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

export function HeaderWithout() {
  const { t } = useTranslation();
  return (
    <S.Container>
      <S.Logo src={Logo} alt="" />
      <S.Title>{t("appName")}</S.Title>
    </S.Container>
  );
}
