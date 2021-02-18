import styled from "styled-components/native";
import BaseFocusBlock from "../../components/FocusBlocks/Base";

export const Title = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  font-size: 16px;
`;
export const BaseFocusBlockToggle = styled(BaseFocusBlock)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Value = styled.Text`
  color: ${(props) => props.theme.palette.primary.main};
`;

export const TextInput = styled.TextInput`
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.palette.focusBlock.contrastText + props.theme.secondaryTextOpacity};
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
`;
