import colors from "@/assets/colors";
import styled from "styled-components";

const { height, width } = window.screen;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
  padding: 40px 10%;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10% 5%;
  }
`;

export const Aside = styled.aside`
  display: block;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const IllustrationImage = styled.img`
  height: ${height * 0.5}px;
  width: ${width * 0.3}px;
`;

export const Wrapper = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const CardContent = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: #fff;
  box-shadow: 0 2px 4px #00000033;
  padding: 32px;
  border-radius: 4px;
  max-width: 350px;

  @media screen and (max-width: 768px) {
    border-radius: 8px;
    box-shadow: 0 4px 8px #00000033;
    padding-bottom: 48px;
    max-width: ${width}px;
  }
`;

export const Title = styled.h3`
  color: ${colors.text.darkBlue};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

export const RecoveryPasswordContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

export const CreateAccountContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 32px 0;
`;
