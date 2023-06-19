import styled from "styled-components";
import colors from "@/assets/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  max-width: 100%;
  box-shadow: 0 3px 6px #00000029;
  padding: 0 32px;
  margin-bottom: 6px;
  justify-content: space-between;
`;

export const WrapperLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Logo = styled.img`
  height: 30px;
  width: 30px;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  margin-left: 16px;
  font-size: 20px;
`;

export const MenuDesktop = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

export const MenuItem = styled.a<{ active?: boolean }>`
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  text-decoration: none;
  color: ${(props) => (props.active ? "#2763f5" : "#59626d")};
  font-weight: ${(props) => (props.active ? "600" : "400")};
  cursor: pointer;

  &:hover {
    color: #2763f5;
  }
`;
