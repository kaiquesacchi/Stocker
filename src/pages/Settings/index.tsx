import React from "react";
import { Switch } from "react-native";
import BaseFocusBlock from "../../components/FocusBlocks/Base";
import AppBarLayout from "../../components/Layouts/AppBar";

import styled from "styled-components/native";
import useTheme from "../../context/Theme";
const SCTitle = styled.Text`
  color: ${(props) => props.theme.palette.focusBlock.contrastText};
  font-size: 16px;
`;
const SCBaseFocusBlockToggle = styled(BaseFocusBlock)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

export default function Settings() {
  const [_, themeName, setTheme] = useTheme();
  return (
    <AppBarLayout title="Configurações" backButton>
      <SCBaseFocusBlockToggle>
        <SCTitle>Modo Escuro</SCTitle>
        <Switch value={themeName === "dark"} onValueChange={(value) => setTheme(value ? "dark" : "light")} />
      </SCBaseFocusBlockToggle>
    </AppBarLayout>
  );
}
