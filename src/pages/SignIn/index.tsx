import Illustration from "@/assets/illustrations/auth.svg";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { HeaderWithout } from "@/components/HeaderWithout";
import { Button } from "@/components/Button";

export function SignIn() {
  const { t } = useTranslation();
  return (
    <div>
      <HeaderWithout />
      <S.Container>
        <aside>
          <S.IllustrationImage src={Illustration} alt="" />
        </aside>
        <S.Wrapper>
          <S.CardContent>
            <S.Title>{t("signInSubtitle")}</S.Title>
            <Button textButton={t("signInButton")} handlePress={() => {}} />
          </S.CardContent>
        </S.Wrapper>
      </S.Container>
    </div>
  );
}
