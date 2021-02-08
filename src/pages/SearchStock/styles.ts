import styled from "styled-components/native";

interface iSCListItem {
  first?: boolean;
}
export const SCItemList = styled.TouchableOpacity<iSCListItem>`
  border-top-width: 1px;
  border-color: ${(props) => (props.first ? "#0000" : "#6665")};
  padding-top: 10px;
  margin-bottom: 10px;
`;

export const SCSymbolText = styled.Text`
  color: white;
  font-size: 18px;
`;

export const SCNameText = styled.Text`
  color: #fffa;
  font-size: 14px;
`;