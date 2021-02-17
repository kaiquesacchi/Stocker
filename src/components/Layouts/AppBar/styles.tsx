import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

interface iSCBannerProps {
  height: number;
  isAltBanner: boolean;
}

const SCBanner = styled.View<iSCBannerProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isAltBanner ? "flex-end" : "center")};

  height: ${(props) => props.height + "px"};
`;

const SCTopMargin = styled.View`
  width: 100%;
  height: 20px;
`;

const SCStickyHeader = styled.View`
  background-color: ${(props) => props.theme.palette.background.main};
  padding: 20px 20px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SCStickyHeaderTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SCStickyHeaderButtons = styled.View`
  flex-direction: row;
`;

interface iSCSmallHeader {
  opacity: number;
}
const SCSmallHeader = styled.Text<iSCSmallHeader>`
  color: ${(props) => props.theme.palette.background.contrastText};
  font-size: 25px;

  opacity: ${(props) => props.opacity};
`;

const SCMaterialIcons = styled(MaterialIcons)`
  margin-right: 10px;
  color: ${(props) => props.theme.palette.background.contrastText}; ;
`;

interface iSCBigHeaderProps {
  opacity: number;
  marginTop: number;
}
const SCBigHeader = styled.Text<iSCBigHeaderProps>`
  color: ${(props) => props.theme.palette.background.contrastText};
  font-size: 40px;
  opacity: ${(props) => props.opacity};
  margin-top: ${(props) => props.marginTop + "px"};
`;
const SCAltBanner = styled.View<iSCBigHeaderProps>`
  opacity: ${(props) => props.opacity};
  margin-top: ${(props) => props.marginTop + "px"};
`;

const SCPage = styled.ScrollView`
  width: 100%;
  background-color: ${(props) => props.theme.palette.background.main};
  flex-direction: column;
`;

interface iSCContent {
  hasNavigationBar?: boolean;
}
const SCContent = styled.View<iSCContent>`
  background-color: ${(props) => props.theme.palette.background.main};
  min-height: ${(props) => {
    let result = Dimensions.get("window").height - 93.5;
    if (props.hasNavigationBar) result -= 44.7;
    return result + "px";
  }};
`;

export {
  SCBanner,
  SCTopMargin,
  SCStickyHeader,
  SCBigHeader,
  SCAltBanner,
  SCContent,
  SCMaterialIcons,
  SCPage,
  SCSmallHeader,
  SCStickyHeaderTitle,
  SCStickyHeaderButtons,
};
