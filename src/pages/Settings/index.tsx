import React, { useState } from "react";
import { Switch } from "react-native";

import useTheme from "../../context/Theme";
import useSettings from "../../context/Settings";

import BaseDialog from "../../components/Dialog/Base";
import BaseFocusBlock from "../../components/FocusBlocks/Base";
import AppBarLayout from "../../components/Layouts/AppBar";

import * as SC from "./styles";

export default function Settings() {
  const [theme, themeName, setTheme] = useTheme();
  const [settings, setSettings] = useSettings();
  const [GoogleFinanceURL, setGoogleFinanceURL] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = () => {
    if (GoogleFinanceURL.length === 0) {
      alert("Valor obrigatório.");
      return;
    }
    setSettings({ key: "GoogleFinanceURL", value: GoogleFinanceURL });
    alert("Valor atualizado.");

    setModalVisible(false);
  };

  return (
    <AppBarLayout title="Ajustes" backButton>
      <BaseFocusBlock title="Personalização">
        <SC.ListItem first>
          <SC.Title>Modo Escuro</SC.Title>
          <Switch value={themeName === "dark"} onValueChange={(value) => setTheme(value ? "dark" : "light")} />
        </SC.ListItem>
        <SC.ListItem>
          <SC.Title>Atualizar Valores ao Iniciar</SC.Title>
          <Switch
            value={settings.loadDataOnInit}
            onValueChange={(value) => {
              setSettings({ key: "loadDataOnInit", value: value });
            }}
          />
        </SC.ListItem>
      </BaseFocusBlock>
      <BaseFocusBlock title="Configurações" onPress={() => setModalVisible(true)}>
        <SC.Title>URL da Planilha Google Finance</SC.Title>
        <SC.Value>{settings.GoogleFinanceURL}</SC.Value>
      </BaseFocusBlock>
      <BaseDialog
        modalVisible={modalVisible}
        hideModal={() => setModalVisible(false)}
        header="Alterar Configuração"
        confirmText="Salvar"
        handleConfirm={handleEdit}>
        <SC.TextInput
          placeholder={settings.GoogleFinanceURL}
          placeholderTextColor={theme.palette.focusBlock.contrastText + theme.secondaryTextOpacity}
          onChangeText={setGoogleFinanceURL}
        />
      </BaseDialog>
    </AppBarLayout>
  );
}
