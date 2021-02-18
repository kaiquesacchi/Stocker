import styled from "styled-components/native";

interface iSCListItem {
  first?: boolean;
}
export const SCItemList = styled.TouchableOpacity<iSCListItem>`
  border-top-width: 1px;
  border-color: ${(props) => (props.first ? "#0000" : "#6665")};
  padding-top: ${(props) => (props.first ? "0px" : "10px")};
  margin-top: ${(props) => (props.first ? "0px" : "10px")};
`;

export const SCSymbolText = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  font-size: 18px;
`;

export const SCNameText = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText + props.theme.secondaryTextOpacity};
  font-size: 14px;
`;
