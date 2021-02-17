import React from "react";
import styled from "styled-components/native";

const SCBottomBar = styled.ScrollView`
  background-color: black;
  min-height: 44.7px;
  max-height: 44.7px;
`;

const SCButton = styled.TouchableHighlight`
  width: 50%;
  align-items: center;
  justify-content: center;
`;

const SCButtonText = styled.Text`
  color: #71c7bb;
  font-size: 16px;
`;

interface iProps {
  textAction: string;
  onPressCancel: () => void;
  onPressAction: () => void;
}
export default function ActionButtons({ textAction, onPressCancel, onPressAction }: iProps) {
  return (
    <SCBottomBar horizontal contentContainerStyle={{ flex: 1, justifyContent: "space-around" }}>
      <SCButton onPress={onPressCancel}>
        <SCButtonText>Cancelar</SCButtonText>
      </SCButton>
      <SCButton onPress={onPressAction}>
        <SCButtonText>{textAction}</SCButtonText>
      </SCButton>
    </SCBottomBar>
  );
}
