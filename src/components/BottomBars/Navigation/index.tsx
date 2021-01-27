import React from "react";
import { useHistory } from "react-router-native";
import styled from "styled-components/native";
import useActiveTab from "../../../context/ActiveTab";

const SCBottomBar = styled.ScrollView`
  background-color: black;
  display: flex;
  padding: 0 10px 10px;
  min-height: 44.7px;
  max-height: 44.7px;
`;

interface iSCTab {
  active?: boolean;
}
const SCTab = styled.Text<iSCTab>`
  color: ${(props) => (props.active ? "#71c7bb" : "white")};
  font-size: 16px;
  border-radius: 0.1px;
  border-style: solid;
  border-color: ${(props) => (props.active ? "#71c7bb" : "#0000")};
  border-bottom-width: ${(props) => (props.active ? "1px" : "0px")};
  padding: 10px 0 5px;
`;

interface iTabs {
  [key: string]: string;
}
const tabs: iTabs = {
  Início: "/",
  "Minha Carteira": "/my-wallet/",
  "Pesquisar Ações": "/stock-details/",
};

export default function Navigation() {
  const [activeTab, setActiveTab] = useActiveTab();
  const history = useHistory();

  const handlePress = (tabPath: string) => {
    if (tabPath !== activeTab) {
      setActiveTab(tabPath);
      history.replace(tabPath);
    }
  };

  return (
    <SCBottomBar horizontal contentContainerStyle={{ flex: 1, justifyContent: "space-around" }}>
      {Object.keys(tabs).map((tabName) => (
        <SCTab key={tabName} onPress={() => handlePress(tabs[tabName])} active={tabs[tabName] === activeTab}>
          {tabName}
        </SCTab>
      ))}
    </SCBottomBar>
  );
}
