import React from "react";
import styled from "styled-components/native";

const SCPage = styled.ScrollView`
  width: 100%;
  background-color: black;
  flex-direction: column;
  flex-grow: 1;
`;

interface iProps {
  children?: React.ReactNode;
}

export default function BasePage({ children }: iProps) {
  return <SCPage>{children}</SCPage>;
}
