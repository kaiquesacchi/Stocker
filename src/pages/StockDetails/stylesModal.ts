import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  border-style: solid;
  border-color: ${(props) => props.theme.palette.focusBlock.contrastText + props.theme.secondaryTextOpacity};
  border-bottom-width: 1px;
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  margin-top: 20px;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText + props.theme.secondaryTextOpacity};
  margin: 30px 0 10px;
`;
