import colors from "@/assets/colors";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 10%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10% 5%;
  }
`;

export const Title = styled.h3`
  color: ${colors.text.darkBlue};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

export const WrapperForm = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TitleSection = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 24px 0;
  font-weight: 600;
`;

export const ButtonsContainer = styled.span`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
