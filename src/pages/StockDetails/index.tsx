import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-native";

import { Button, Modal, TextInput } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";

import AppBarLayout, { iButton } from "../../components/Layouts/AppBar";
import ListFocusBlock from "../../components/FocusBlocks/List";

import StockDataController from "../../controllers/StockData";
import MyWalletController from "../../controllers/MyWallet";

import * as SC from "./styles";
import * as SCModal from "./stylesModal";
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
    StockDataController.getBySymbol(symbol)
      .then((response) => {
        setData(response);
      })
      .catch((e) => {
        if (e === "Stock not found.") alert("Ação não encontrada.");
        else {
          alert("Erro desconhecido.");
          console.warn(e);
        }
        history.goBack();
      });
  }, [history]);

  const renderFunction = (key: keyof iStock, index: number) => (
    <SC.ItemList key={index} first={index === 0}>
      <SC.SymbolText>{key}</SC.SymbolText>
      <SC.NameText>{data[key]}</SC.NameText>
    </SC.ItemList>
  );

  /* Modal Config. */
  const [modalVisible, setModalVisible] = useState(false);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const inputAmount = useRef<TextInput>(null);
  const inputPrice = useRef<TextInput>(null);

  const handleChangeTradeType = (value: any) => {
    setTradeType(value);
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleOpenModal = () => {
    setTradeType("buy");
    inputAmount.current?.clear();
    inputPrice.current?.clear();
    setDate(new Date());
    setShowDatePicker(false);
    setModalVisible(true);
  };

  const handleSaveTrade = () => {
    let parsedAmount = Number(amount.replace(",", "."));
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      alert('"Quantidade" deve ser um valor numérico positivo.');
      inputAmount.current?.focus();
      return;
    }
    if (tradeType === "sell") parsedAmount *= -1;

    let parsedPrice = Number(price.replace(",", "."));
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      alert('"Preço" deve ser um valor numérico positivo.');
      inputPrice.current?.focus();
      return;
    }
    MyWalletController.addTrade(data.Symbol, parsedAmount, parsedPrice, date)
      .then(() => {
        alert("Registro realizado.");
      })
      .catch(() => alert("Erro ao salvar transação"))
      .finally(() => setModalVisible(false));
  };

  const buttons: iButton[] = [{ name: "add", onPress: handleOpenModal }];
  return (
    <AppBarLayout title={data.Symbol} backButton buttons={buttons}>
      <Modal visible={modalVisible} transparent animationType="fade">
        <SCModal.Background>
          <SCModal.InvisibleArea onPress={() => setModalVisible(false)} />
          <SCModal.FocusBlock title="Registrar uma transação">
            <SwitchSelector
              textColor="#fff"
              selectedColor="#fff"
              buttonColor="#377970"
              backgroundColor="#222"
              options={[
                { label: "Compra", value: "buy" },
                { label: "Venda", value: "sell" },
              ]}
              initial={0}
              onPress={handleChangeTradeType}
            />
            <SCModal.TextInput
              ref={inputAmount}
              placeholderTextColor="#fff8"
              placeholder="Quantidade"
              keyboardType="numeric"
              onChangeText={setAmount}
            />
            <SCModal.TextInput
              ref={inputPrice}
              placeholderTextColor="#fff8"
              placeholder="Preço"
              keyboardType="numeric"
              onChangeText={setPrice}
            />
            <SCModal.Text>Selecione a data da transação</SCModal.Text>
            <Button
              title={date !== undefined ? date.toDateString() : "Data da Transação"}
              onPress={() => setShowDatePicker(true)}
              color="#377970"
            />
            <SCModal.ActionButtonArea>
              <SCModal.ActionButton
                onPress={() => {
                  setModalVisible(false);
                }}>
                <SCModal.ActionButtonText>Cancelar</SCModal.ActionButtonText>
              </SCModal.ActionButton>
              <SCModal.ActionButton onPress={handleSaveTrade}>
                <SCModal.ActionButtonText>Salvar</SCModal.ActionButtonText>
              </SCModal.ActionButton>
            </SCModal.ActionButtonArea>
            {showDatePicker && (
              <DateTimePicker mode="date" value={date} onChange={handleDateChange} maximumDate={new Date()} />
            )}
          </SCModal.FocusBlock>
        </SCModal.Background>
      </Modal>
      <ListFocusBlock data={Object.keys(data)} renderFunction={renderFunction} />
    </AppBarLayout>
  );
}
