import colors from "../../assets/colors";
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TextError = styled.span`
  color: red;
  font-size: 12px;
`;

export const WrapperError = styled.div`
  flex-direction: column;
  flex: 1;
`;

export const MenuItem = styled.option`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  text-decoration: none;
  color: #59626d;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: #2763f5;
  }
`;

export const Select = styled.select`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  text-decoration: none;
  color: #59626d;
  font-weight: 400;
  cursor: pointer;
`;

export const Label = styled.label`
  color: ${colors.text.darkBlue};
  margin-bottom: 4px;
  font-weight: 500;
  font-size: 14px;
`;
