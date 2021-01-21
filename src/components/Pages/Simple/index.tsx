import React from "react";
import styled from "styled-components/native";

const SCPage = styled.ScrollView`
  width: 100%;
  min-height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
`;

interface iProps {
  children?: React.ReactNode;
}

export default function SimplePage({ children }: iProps) {
  return <SCPage>{children}</SCPage>;
}
