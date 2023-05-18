import colors from "@/assets/colors";
import styled from "styled-components";

export const Container = styled.input`
  width: -webkit-fill-available;
  height: 40px;
  padding: 0px !important;
  padding-left: 16px !important;
  border-radius: 4px;
  border: 1px solid #606060;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Label = styled.label`
  color: ${colors.text.darkBlue};
  margin-bottom: 4px;
`;
