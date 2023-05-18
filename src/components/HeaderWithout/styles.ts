import styled from "styled-components";
import colors from "@/assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  max-width: 100%;
  box-shadow: 0 3px 6px #00000029;
  padding-left: 32px;
  margin-bottom: 6px;
`;

export const Logo = styled.img`
  height: 50px;
  width: 50px;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  margin-left: 16px;
  font-size: 24px;
`;
