import colors from "@/assets/colors";
import styled from "styled-components";

export const Container = styled.a`
  text-decoration: none;
  color: #fff;
  background-color: ${colors.primaryLigth};
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primary};
  }
`;
