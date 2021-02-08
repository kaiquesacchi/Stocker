import React, { useEffect, useState } from "react";
import ListFocusBlock from "../../components/FocusBlocks/List";
import AppBarLayout from "../../components/Layouts/AppBar";
import styled from "styled-components/native";
import StockData from "../../controllers/StockData/StockData";
import { useHistory } from "react-router-native";

interface iSCListItem {
  first?: boolean;
}
const SCItemList = styled.TouchableOpacity<iSCListItem>`
  border-top-width: 1px;
  border-color: ${(props) => (props.first ? "#0000" : "#6665")};
  padding-top: 10px;
  margin-bottom: 10px;
`;
const SCSymbolText = styled.Text`
  color: white;
  font-size: 18px;
`;
const SCNameText = styled.Text`
  color: #71c7bb;
  font-size: 14px;
`;
interface iStock {
  Symbol: string;
  Name: string;
  Price: string;
  Change: string;
  "P/E": string;
  EPS: string;
  High: string;
  Low: string;
}

export default function StockDetails({ match }: any) {
  const history = useHistory();

  const [data, setData] = useState<iStock>({
    Symbol: "",
    Name: "",
    Price: "",
    Change: "",
    "P/E": "",
    EPS: "",
    High: "",
    Low: "",
  });

  useEffect(() => {
    const symbol = match.params.stockSymbol;
    StockData.getBySymbol(symbol)
      .then((response) => {
        if (response === null) throw new Error();
        setData(JSON.parse(response as string));
      })
      .catch(() => {
        alert("Ação não encontrada.");
        history.goBack();
      });
  }, [history]);

  const renderFunction = (key: keyof iStock, index: number) => (
    <SCItemList key={index} first={index === 0}>
      <SCSymbolText>{key}</SCSymbolText>
      <SCNameText>{data[key]}</SCNameText>
    </SCItemList>
  );

  return (
    <AppBarLayout title={data.Symbol} backButton>
      <ListFocusBlock data={Object.keys(data)} renderFunction={renderFunction} />
    </AppBarLayout>
  );
}
