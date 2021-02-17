import React from "react";
import styled from "styled-components/native";
import useTheme from "../../../context/Theme";
import BaseFocusBlock from "../../FocusBlocks/Base";
import ListFocusBlock from "../../FocusBlocks/List";
import BasePage from "../Base";

interface iProps {
  suggestions: any[];
  suggestionRenderFunction: (item: any, index: number) => React.ReactNode;
  onChangeText: (text: string) => void;
  isEmpty: boolean;
  children?: React.ReactNode;
}

const SCSearchBar = styled.View`
  padding-top: 50px;
  background-color: ${(props) => props.theme.palette.background.main}; ;
`;

const SCTextInput = styled.TextInput`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  padding: 8px;
  font-size: 16px;
`;

export default function SearchLayout({
  suggestions,
  suggestionRenderFunction,
  onChangeText,
  isEmpty,
  children,
}: iProps) {
  const [theme] = useTheme();
  return (
    <BasePage stickyHeaderIndices={[0]}>
      <SCSearchBar>
        <BaseFocusBlock>
          <SCTextInput
            placeholder="Pesquise por nome ou símbolo"
            placeholderTextColor={theme.palette.focusBlock.contrastText + theme.secondaryTextOpacity}
            onChangeText={onChangeText}></SCTextInput>
        </BaseFocusBlock>
      </SCSearchBar>
      {!isEmpty && (
        <ListFocusBlock
          title="Sugestões"
          data={suggestions}
          renderFunction={suggestionRenderFunction}
          isEmptyMessage="Nenhuma ação encontrada."
        />
      )}
      {children}
    </BasePage>
  );
}
