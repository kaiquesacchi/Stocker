import React from "react";
import { TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

const SCTitle = styled.Text`
  color: white;
  padding: 0px 20px 10px;
`;

const SCBody = styled.TouchableOpacity`
  width: 100%;
  padding: 0 20px;
  border-radius: 30px;
  margin-bottom: 10px;
  background-color: #333;
`;

const SCActivityIndicator = styled.ActivityIndicator`
  margin: 20px 0;
`;

export interface iProps extends TouchableOpacityProps {
  title?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export default function BaseFocusBlock({ title, children, onPress, isLoading, ...rest }: iProps) {
  return (
    <React.Fragment>
      {title ? <SCTitle>{title}</SCTitle> : <React.Fragment />}
      <SCBody {...rest} onPress={onPress} activeOpacity={onPress ? 0.5 : 1}>
        {isLoading ? <SCActivityIndicator size="large" color="#71c7bb" /> : children}
      </SCBody>
    </React.Fragment>
  );
}
