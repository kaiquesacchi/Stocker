import React from "react";
import BaseFocusBlock, { iProps as iPropsBase } from "../Base";
import styled from "styled-components/native";

interface iSCList {
  horizontal?: boolean;
}
const SCList = styled.View<iSCList>`
  padding: 10px 0;
  flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  justify-content: space-around;
`;

interface iProps extends iPropsBase {
  data: any[];
  renderFunction: (item: any, index: number) => React.ReactNode;
  horizontal?: boolean;
}

export default function ListFocusBlock({ data, renderFunction, horizontal, ...rest }: iProps) {
  return (
    <BaseFocusBlock {...rest}>
      <SCList horizontal={horizontal}>{data.map(renderFunction)}</SCList>
    </BaseFocusBlock>
  );
}
