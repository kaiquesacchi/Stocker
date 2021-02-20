import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-native";

import { Button, Dimensions, TextInput, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LineChart } from "react-native-chart-kit";

import AppBarLayout, { iButton } from "../../components/Layouts/AppBar";
import ListFocusBlock from "../../components/FocusBlocks/List";
import BaseDialog from "../../components/Dialog/Base";
import BottomBarActionButtons from "../../components/BottomBars/ActionButtons";

import StockDataController from "../../controllers/StockData";
import MyWalletController, { iWalletStockRegistry, iTrade } from "../../controllers/MyWallet";

import { iGoogleFinanceStockData } from "../../services/GoogleFinanceAPI";
import CurrencyService from "../../services/Currency";
import DateService from "../../services/Date";

import useLoadingStockDataContext from "../../context/LoadingStockData";
import useTheme from "../../context/Theme";

import * as SC from "./styles";
import * as SCModal from "./stylesModal";
import CheckBox from "@react-native-community/checkbox";

export default function StockDetails({ match }: any) {
  const [theme] = useTheme();
  const history = useHistory();
  const [isLoading] = useLoadingStockDataContext();

  //#region Loading Data. =============================================================================================
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
  const [onWallet, setOnWallet] = useState<iWalletStockRegistry>();

  const loadData = useCallback(
    async (symbol) => {
      try {
        const result = await StockDataController.getBySymbol(symbol);
        setData(result);
        setFormattedData({
          Código: result.Symbol,
          "Nome da Empresa": result.Name,
          "Preço Atual": result.Price !== null ? "R$" + CurrencyService.toReadable(result.Price) : "Não Disponível",
          "Mudança Percentual do Dia":
            result.Change !== null ? CurrencyService.toReadable(result.Change) + "%" : "Não Disponível",
          "Relação Preço Lucro (P/L)":
            result["P/E"] !== null ? CurrencyService.toReadable(result["P/E"]) : "Não Disponível",
          "Lucro por Ação (LPA)": result["EPS"] !== null ? CurrencyService.toReadable(result["EPS"]) : "Não Disponível",
          "Alta do Dia": result.High !== null ? "R$" + CurrencyService.toReadable(result.High) : "Não Disponível",
          "Baixa do Dia": result.Low !== null ? "R$" + CurrencyService.toReadable(result.Low) : "Não Disponível",
        });
      } catch (e) {
        if (e === "Stock not found.") alert("Ação não encontrada.");
        else {
          alert("Erro desconhecido.");
          console.warn(e);
        }
        history.goBack();
      }
    },
    [setData, setFormattedData]
  );

  const loadOnWallet = useCallback(
    async (symbol: string) => {
      const result = await MyWalletController.getBySymbol(symbol);
      setOnWallet(result);
    },
    [setOnWallet]
  );

  useEffect(() => {
    const symbol = match.params.stockSymbol;
    loadData(symbol);
    loadOnWallet(symbol);
  }, [history]);
  //#endregion

  //#region Modal Config. =============================================================================================
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
        loadOnWallet(data.Symbol);
      })
      .catch(() => alert("Erro ao salvar transação"))
      .finally(() => setModalVisible(false));
  };
  //#endregion

  //#region Remove Trades. ============================================================================================
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedList, setSelectedList] = useState<boolean[]>([]);

  const startRemoving = () => {
    if (!onWallet || !onWallet.trades) return;
    setSelectedList(onWallet.trades.map((_) => false));
    setIsSelecting(true);
  };

  const handleSelect = (index: number) => {
    if (!isSelecting) return;
    let selectedListCopy = [...selectedList];
    selectedListCopy[index] = !selectedListCopy[index];
    setSelectedList(selectedListCopy);
  };

  const remove = () => {
    if (!onWallet || !onWallet.trades) return;
    MyWalletController.removeTrades(
      data.Symbol,
      selectedList.flatMap((bool, index) => (bool ? index : []))
    )
      .then(() => {
        loadOnWallet(data.Symbol);
      })
      .catch((error) => {
        alert("Erro ao salvar transação");
        console.dir(error);
      })
      .finally(() => {
        setIsSelecting(false);
      });
  };

  //#endregion

  //#region Render Functions. =========================================================================================
  const buttons: iButton[] = [{ name: "add", onPress: handleOpenModal }];
  const buttonsWithDelete: iButton[] = [
    { name: "add", onPress: handleOpenModal },
    { name: "trash-bin-outline", onPress: startRemoving },
  ];

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
        color: () => theme.palette.primary.main,
        labelColor: () => theme.palette.background.contrastText,
        backgroundGradientFrom: theme.palette.background.main,
        backgroundGradientTo: theme.palette.background.main,
        propsForBackgroundLines: {
          stroke: theme.palette.background.contrastText + "50",
        },
      }}
      width={Dimensions.get("window").width}
      height={230}
      withDots={false}
      withHorizontalLines={true}
      withVerticalLines={false}
      segments={3}
      withOuterLines={false}
      withVerticalLabels={false}
      withShadow={false}
      yAxisLabel="R$"
    />
  );

  const renderInfo = (key: keyof typeof formattedData, index: number) => (
    <SC.ItemList key={index} first={index === 0}>
      <SC.TitleText>{key}</SC.TitleText>
      <SC.ValueText>{formattedData[key]}</SC.ValueText>
    </SC.ItemList>
  );

  const renderTrades = (trade: iTrade, index: number) => (
    <SC.AvatarItem key={index} first={index === 0} onPress={() => handleSelect(index)}>
      {isSelecting && (
        <CheckBox
          value={selectedList[index] || false}
          tintColors={{ true: theme.palette.primary.main, false: theme.palette.focusBlock.contrastText }}
          disabled
        />
      )}
      <SC.Icon name={trade.amount > 0 ? "caret-up-circle" : "caret-down-circle"} size={60} />
      <View>
        <SC.TitleText>{DateService.toReadable(trade.date)}</SC.TitleText>
        <SC.ValueText>{`${Math.abs(trade.amount)} cotas a R$${CurrencyService.toReadable(
          trade.unitaryPrice
        )} cada.`}</SC.ValueText>
      </View>
    </SC.AvatarItem>
  );
  //#endregion

  return (
    <View style={{ flex: 1 }}>
      <AppBarLayout
        title={data.Symbol}
        backButton
        buttons={isSelecting ? [] : onWallet && onWallet.trades.length !== 0 ? buttonsWithDelete : buttons}
        altBanner={altBanner}
        hasNavigationBar={isSelecting}>
        <BaseDialog
          header="Registrar uma Transação"
          confirmText="Salvar"
          handleConfirm={handleSaveTrade}
          hideModal={() => {
            setModalVisible(false);
          }}
          modalVisible={modalVisible}>
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
          {showDatePicker && (
            <DateTimePicker mode="date" value={date} onChange={handleDateChange} maximumDate={new Date()} />
          )}
        </BaseDialog>
        <ListFocusBlock data={Object.keys(formattedData)} renderFunction={renderInfo} isLoading={isLoading} />
        {onWallet && <ListFocusBlock title="Minhas Transações" data={onWallet.trades} renderFunction={renderTrades} />}
      </AppBarLayout>
      {isSelecting && (
        <BottomBarActionButtons
          textAction="Excluir"
          onPressCancel={() => setIsSelecting(false)}
          onPressAction={remove}
        />
      )}
    </View>
  );
}
