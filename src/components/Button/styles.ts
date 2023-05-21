import colors from "@/assets/colors";
import styled from "styled-components";

export const Container = styled.button`
  text-decoration: none;
  color: #fff;
  background-color: ${colors.primaryLigth};
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  padding: 0;
  cursor: pointer;
  appearance: none;

  &:hover {
    background-color: ${colors.primary};
  }
`;
