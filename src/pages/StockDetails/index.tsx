import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-native";

import { Button, Dimensions, Modal, TextInput } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LineChart } from "react-native-chart-kit";

import AppBarLayout, { iButton } from "../../components/Layouts/AppBar";
import ListFocusBlock from "../../components/FocusBlocks/List";

import StockDataController from "../../controllers/StockData";
import MyWalletController from "../../controllers/MyWallet";

import { iGoogleFinanceStockData } from "../../services/GoogleFinanceAPI";

import * as SC from "./styles";
import * as SCModal from "./stylesModal";
import CurrencyService from "../../services/Currency";
import useLoadingStockDataContext from "../../context/LoadingStockData";
import useTheme from "../../context/Theme";

export default function StockDetails({ match }: any) {
  const [theme] = useTheme();
  const history = useHistory();
  const [isLoading] = useLoadingStockDataContext();

  const [data, setData] = useState<iGoogleFinanceStockData>({
    Symbol: "",
    Name: "",
    Price: null,
    Change: null,
    "P/E": null,
    EPS: null,
    High: null,
    Low: null,
    "Last 30 Days": [],
  });
  const [formattedData, setFormattedData] = useState({
    Código: "Não Disponível",
    "Nome da Empresa": "Não Disponível",
    "Preço Atual": "Não Disponível",
    "Mudança Percentual do Dia": "Não Disponível",
    "Relação Preço Lucro (P/L)": "Não Disponível",
    "Lucro por Ação (LPA)": "Não Disponível",
    "Alta do Dia": "Não Disponível",
    "Baixa do Dia": "Não Disponível",
  });

  useEffect(() => {
    const symbol = match.params.stockSymbol;
    StockDataController.getBySymbol(symbol)
      .then((response) => {
        setData(response);
        setFormattedData({
          Código: response.Symbol,
          "Nome da Empresa": response.Name,
          "Preço Atual": response.Price !== null ? "R$" + CurrencyService.toReadable(response.Price) : "Não Disponível",
          "Mudança Percentual do Dia":
            response.Change !== null ? CurrencyService.toReadable(response.Change) + "%" : "Não Disponível",
          "Relação Preço Lucro (P/L)":
            response["P/E"] !== null ? CurrencyService.toReadable(response["P/E"]) : "Não Disponível",
          "Lucro por Ação (LPA)":
            response["EPS"] !== null ? CurrencyService.toReadable(response["EPS"]) : "Não Disponível",
          "Alta do Dia": response.High !== null ? "R$" + CurrencyService.toReadable(response.High) : "Não Disponível",
          "Baixa do Dia": response.Low !== null ? "R$" + CurrencyService.toReadable(response.Low) : "Não Disponível",
        });
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

  const renderFunction = (key: keyof typeof formattedData, index: number) => (
    <SC.ItemList key={index} first={index === 0}>
      <SC.TitleText>{key}</SC.TitleText>
      <SC.ValueText>{formattedData[key]}</SC.ValueText>
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
  /* End Modal Config. */

  const buttons: iButton[] = [{ name: "add", onPress: handleOpenModal }];

  const altBanner = (
    <LineChart
      bezier
      data={{
        labels: [],
        datasets: [
          {
            data: data["Last 30 Days"],
          },
        ],
      }}
      chartConfig={{
        color: (opacity = 1) =>
          theme.palette.primary.main +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0"),
        backgroundGradientFrom: theme.palette.background.main,
        backgroundGradientTo: theme.palette.background.main,
      }}
      width={Dimensions.get("window").width}
      height={250}
      withDots={false}
      withInnerLines={false}
      withOuterLines={false}
      withVerticalLabels={false}
      withShadow={false}
      yAxisLabel="R$ "
    />
  );
  return (
    <AppBarLayout title={data.Symbol} backButton buttons={buttons} altBanner={altBanner}>
      <Modal visible={modalVisible} transparent animationType="fade">
        <SCModal.Background>
          <SCModal.InvisibleArea onPress={() => setModalVisible(false)} />
          <SCModal.FocusBlock title="Registrar uma transação">
            <SwitchSelector
              backgroundColor={theme.palette.background.main}
              textColor={theme.palette.background.contrastText}
              buttonColor={theme.palette.secondary.main}
              selectedColor={theme.palette.secondary.contrastText}
              options={[
                { label: "Compra", value: "buy" },
                { label: "Venda", value: "sell" },
              ]}
              initial={0}
              onPress={handleChangeTradeType}
            />
            <SCModal.TextInput
              ref={inputAmount}
              placeholderTextColor={theme.palette.focusBlock.contrastText + theme.secondaryTextOpacity}
              placeholder="Quantidade"
              keyboardType="numeric"
              onChangeText={setAmount}
            />
            <SCModal.TextInput
              ref={inputPrice}
              placeholderTextColor={theme.palette.focusBlock.contrastText + theme.secondaryTextOpacity}
              placeholder="Preço"
              keyboardType="numeric"
              onChangeText={setPrice}
            />
            <SCModal.Text>Selecione a data da transação</SCModal.Text>
            <Button
              title={date !== undefined ? date.toDateString() : "Data da Transação"}
              onPress={() => setShowDatePicker(true)}
              color={theme.palette.secondary.main}
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
      <ListFocusBlock data={Object.keys(formattedData)} renderFunction={renderFunction} isLoading={isLoading} />
    </AppBarLayout>
  );
}
