import styled from "styled-components/native";
import BaseFocusBlock from "../../components/FocusBlocks/Base";

export const Background = styled.View`
  background-color: #000c;
  flex: 1;
`;
export const InvisibleArea = styled.TouchableOpacity`
  flex: 1;
`;
export const FocusBlock = styled(BaseFocusBlock)`
  padding: 20px;
  margin-bottom: 0;
`;

interface iSCTextInput {
  isOnFocus?: boolean;
}
export const TextInput = styled.TextInput<iSCTextInput>`
  border-style: solid;
  border-color: ${(props) => (props.isOnFocus ? "#a03" : "#fff8")};
  border-bottom-width: 1px;
  color: white;
  margin-top: 20px;
`;

export const Text = styled.Text`
  color: #fff8;
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
  color: #71c7bb;
`;
