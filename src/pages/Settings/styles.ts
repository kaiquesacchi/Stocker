import styled from "styled-components/native";

export const Title = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  font-size: 16px;
`;

interface iListItem {
  first?: boolean;
}

export const ListItem = styled.View<iListItem>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-width: ${(props) => (props.first ? "0px" : "1px")};
  margin-top: ${(props) => (props.first ? "0px" : "10px")};
  padding-top: ${(props) => (props.first ? "0px" : "10px")};
  border-color: ${(props) => props.theme.palette.focusBlock.contrastText + "60"};
`;

export const Value = styled.Text`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const TextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.palette.focusBlock.contrastText + props.theme.secondaryTextOpacity};
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
`;
