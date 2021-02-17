import styled from "styled-components/native";

export const Body = styled.View`
  padding: 20px 0;
`;

export const MainInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.palette.focusBlock.contrastText + "50"};
`;
export const MainLeft = styled.View`
  flex: 1;
`;
export const MainRight = styled.View`
  align-items: flex-end;
`;

export const SymbolText = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  font-size: 20px;
`;
export const NameText = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  opacity: 0.8;
`;
export const CurrentText = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  font-size: 20px;
`;

interface iSCChangeBadge {
  isPositive: boolean;
}
export const ChangeBadge = styled.View<iSCChangeBadge>`
  background-color: ${(props) => (props.isPositive ? "#49aa49" : "#d35b3d")};
  padding: 5px 8px;
  border-radius: 20px;
  border: 1px solid #ddd;
  margin-top: 5px;
`;

export const ChangeText = styled.Text`
  color: white;
`;

export const AmountText = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
`;
