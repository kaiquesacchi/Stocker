import React from "react";
import BaseFocusBlock, { iProps as iPropsBase } from "../Base";
import styled from "styled-components/native";

const SCList = styled.View`
  padding: 10px 0;
`;

interface iDataItem {
  title: string;
  value: string;
}

interface iProps extends iPropsBase {
  data: iDataItem[];
  renderFunction: (item: iDataItem, index: number) => React.ReactNode;
}

export default function ListFocusBlock({ data, renderFunction, ...rest }: iProps) {
  return (
    <BaseFocusBlock {...rest}>
      <SCList>{data.map(renderFunction)}</SCList>
    </BaseFocusBlock>
  );
}
