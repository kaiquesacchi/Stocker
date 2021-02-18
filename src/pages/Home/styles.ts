import styled from "styled-components/native";

interface iSCListItem {
  first?: boolean;
}
const SCHorizontalListItem = styled.View<iSCListItem>`
  border-left-width: 1px;
  width: 33.3%;
  border-color: ${(props) => (props.first ? "#0000" : "#6665")};
  padding-left: ${(props) => (props.first ? "0" : "10px")};
`;

const SCListItem = styled.View<iSCListItem>`
  border-top-width: 1px;
  border-color: ${(props) => (props.first ? "#0000" : "#6665")};
  padding-top: ${(props) => (props.first ? "0px" : "10px")};
  margin-top: ${(props) => (props.first ? "0px" : "10px")};
`;

const SCTitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
`;
const SCValue = styled.Text`
  color: ${(props) => props.theme.palette.primary.main};
`;

export { SCHorizontalListItem, SCListItem, SCTitle, SCValue };
