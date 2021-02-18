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
`;

const SCValue = styled.Text`
  color: ${(props) => props.theme.palette.primary.main};
`;

export default function Settings() {
  const [_, themeName, setTheme] = useTheme();
  return (
    <AppBarLayout title="Ajustes" backButton>
      <SCBaseFocusBlockToggle title="Personalização">
        <SCTitle>Modo Escuro</SCTitle>
        <Switch value={themeName === "dark"} onValueChange={(value) => setTheme(value ? "dark" : "light")} />
      </SCBaseFocusBlockToggle>
      <BaseFocusBlock title="Configurações">
        <SCTitle>URL da Planilha Google Finance</SCTitle>
        <SCValue>google.com/drive</SCValue>
      </BaseFocusBlock>
    </AppBarLayout>
  );
}
