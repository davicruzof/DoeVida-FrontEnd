import colors from "@/assets/colors";
import styled from "styled-components";

const { height, width } = window.screen;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: row;
  height: 100%;
  padding: 40px;
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
`;

export const Title = styled.h3`
  color: ${colors.text.darkBlue};
`;
