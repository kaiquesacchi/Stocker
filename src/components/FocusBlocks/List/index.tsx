import React from "react";
import BaseFocusBlock, { iProps as iPropsBase } from "../Base";
import styled from "styled-components/native";

interface iSCList {
  horizontal?: boolean;
}
const SCList = styled.View<iSCList>`
  flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  justify-content: space-around;
`;
const SCIsEmptyText = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText + props.theme.secondaryTextOpacity};
  font-size: 14px;
`;

interface iProps extends iPropsBase {
  data: any[];
  renderFunction: (item: any, index: number) => React.ReactNode;
  horizontal?: boolean;
  isEmptyMessage?: string;
}

export default function ListFocusBlock({ data, renderFunction, horizontal, isEmptyMessage, ...rest }: iProps) {
  return (
    <BaseFocusBlock {...rest}>
      {data.length > 0 && <SCList horizontal={horizontal}>{data.map(renderFunction)}</SCList>}
      {data.length === 0 && isEmptyMessage && <SCIsEmptyText>{isEmptyMessage}</SCIsEmptyText>}
    </BaseFocusBlock>
  );
}
