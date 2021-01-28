import React from "react";
import { ScrollViewProps } from "react-native";
import styled from "styled-components/native";

const SCPage = styled.ScrollView`
  width: 100%;
  background-color: black;
  flex-direction: column;
  flex-grow: 1;
`;

interface iProps extends ScrollViewProps {
  children?: React.ReactNode;
}

export default function BasePage({ children, ...rest }: iProps) {
  return <SCPage {...rest}>{children}</SCPage>;
}
