import React from "react";
import styled from "styled-components/native";

const SCTitle = styled.Text`
  color: white;
  padding: 0px 20px 10px;
`;

const SCBody = styled.View`
  width: 100%;
  padding: 0 20px;
  border-radius: 30px;
  margin-bottom: 10px;
  background-color: #333;
`;

export interface iProps {
  title?: string;
  children?: React.ReactNode;
}

export default function BaseFocusBlock({ title, children }: iProps) {
  return (
    <React.Fragment>
      {title ? <SCTitle>{title}</SCTitle> : <React.Fragment />}
      <SCBody>{children}</SCBody>
    </React.Fragment>
  );
}
