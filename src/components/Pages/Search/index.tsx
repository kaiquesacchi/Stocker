import React from "react";
import styled from "styled-components/native";
import BaseFocusBlock from "../../FocusBlocks/Base";
import ListFocusBlock from "../../FocusBlocks/List";
import BasePage from "../Base";

interface iProps {
  suggestions: any[];
  suggestionRenderFunction: (item: any, index: number) => React.ReactNode;
  children?: React.ReactNode;
}

const SCSearchBar = styled.View`
  padding-top: 50px;
  background-color: black;
`;

const SCTextInput = styled.TextInput`
  color: white;
  padding: 8px;
  font-size: 16px;
`;

function SearchPage({ suggestions, suggestionRenderFunction, children }: iProps) {
  return (
    <BasePage stickyHeaderIndices={[0]}>
      <SCSearchBar>
        <BaseFocusBlock>
          <SCTextInput placeholder="Pesquise por nome ou símbolo" placeholderTextColor="#fff8"></SCTextInput>
        </BaseFocusBlock>
      </SCSearchBar>
      <ListFocusBlock data={suggestions} renderFunction={suggestionRenderFunction} />
      {children}
    </BasePage>
  );
}

export default SearchPage;
