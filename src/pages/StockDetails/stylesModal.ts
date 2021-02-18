import styled from "styled-components/native";

export const Background = styled.View`
  background-color: #000c;
  flex: 1;
`;
export const InvisibleArea = styled.TouchableOpacity`
  flex: 1;
`;
export const Header = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  font-size: 16px;
  margin-bottom: 20px;
`;

export const TextInput = styled.TextInput`
  border-style: solid;
  border-color: ${(props) => props.theme.palette.focusBlock.contrastText + props.theme.secondaryTextOpacity};
  border-bottom-width: 1px;
  color: white;
  margin-top: 20px;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText + props.theme.secondaryTextOpacity};
  margin: 30px 0 10px;
`;

export const ActionButtonArea = styled.View`
  flex-direction: row;
  height: 50px;
  margin-top: 10px;
`;

export const ActionButton = styled.TouchableHighlight`
  width: 50%;
  align-items: center;
  justify-content: center;
`;

export const ActionButtonText = styled.Text`
  color: ${(props) => props.theme.palette.primary.main};
`;
