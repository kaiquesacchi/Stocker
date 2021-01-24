import styled from "styled-components/native";

interface iSCListItem {
  first?: boolean;
}
const SCListItem = styled.View<iSCListItem>`
  border-top-width: 1px;
  border-color: ${(props) => (props.first ? "#0000" : "#6665")};
  padding-top: 10px;
  margin-bottom: 10px;
`;

const SCTitle = styled.Text`
  font-size: 14px;
  color: white;
`;
const SCValue = styled.Text`
  color: #71c7bb;
`;

export { SCListItem, SCTitle, SCValue };
