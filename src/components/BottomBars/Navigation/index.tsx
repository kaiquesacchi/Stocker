import React, { useState } from "react";
import styled from "styled-components/native";

const SCBottomBar = styled.ScrollView`
  background-color: black;
  display: flex;
  padding: 10px;
`;

interface iSCTab {
  active?: boolean;
}
const SCTab = styled.Text<iSCTab>`
  color: ${(props) => (props.active ? "#71c7bb" : "white")};
  font-size: 16px;
  border-radius: 0.1px;
  border-style: ${(props) => (props.active ? "dotted" : "solid")};
  border-color: ${(props) => (props.active ? "#71c7bb" : "#0000")};
  border-bottom-width: ${(props) => (props.active ? "1px" : "0px")};
  padding-bottom: 5px;
`;

const tabs = {
  Resumo: "/summary",
  "Minha Carteira": "/my-wallet/0",
  "Pesquisar Ações": "/search-stock",
};

export default function Navigation() {
  const [activeTab, setActiveTab] = useState(Object.keys(tabs)[0]);

  const handlePress = (tabName: string) => {
    if (tabName !== activeTab) setActiveTab(tabName);
  };

  return (
    <SCBottomBar horizontal contentContainerStyle={{ flex: 1, justifyContent: "space-around" }}>
      {Object.keys(tabs).map((tabName) => (
        <SCTab key={tabName} onPress={() => handlePress(tabName)} active={tabName === activeTab}>
          {tabName}
        </SCTab>
      ))}
    </SCBottomBar>
  );
}
