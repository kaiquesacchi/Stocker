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
export const TitleText = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  font-size: 18px;
`;
export const ValueText = styled.Text`
  color: ${(props) => props.theme.palette.primary.main};
  font-size: 14px;
`;
