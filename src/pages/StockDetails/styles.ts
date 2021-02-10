import styled from "styled-components/native";

interface iListItem {
  first?: boolean;
}
export const ItemList = styled.TouchableOpacity<iListItem>`
  border-top-width: 1px;
  border-color: ${(props) => (props.first ? "#0000" : "#6665")};
  padding-top: 10px;
  margin-bottom: 10px;
`;
export const SymbolText = styled.Text`
  color: white;
  font-size: 18px;
`;
export const NameText = styled.Text`
  color: #71c7bb;
  font-size: 14px;
`;
