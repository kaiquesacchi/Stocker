import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

interface iSCBannerProps {
  height: number;
  isAltBanner: boolean;
}

export const Banner = styled.View<iSCBannerProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isAltBanner ? "flex-end" : "center")};

  height: ${(props) => props.height + "px"};
`;

export const StickyHeader = styled.View`
  background-color: ${(props) => props.theme.palette.background.main};
  padding: 40px 20px 20px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StickyHeaderTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const StickyHeaderButtons = styled.View`
  flex-direction: row;
`;

interface iSCSmallHeader {
  opacity: number;
}
export const SmallHeader = styled.Text<iSCSmallHeader>`
  color: ${(props) => props.theme.palette.background.contrastText};
  font-size: 25px;

  opacity: ${(props) => props.opacity};
`;

export const Icons = styled(Ionicons)`
  margin-right: 10px;
  color: ${(props) => props.theme.palette.background.contrastText}; ;
`;

interface iSCBigHeaderProps {
  opacity: number;
  marginTop: number;
}
export const BigHeader = styled.Text<iSCBigHeaderProps>`
  color: ${(props) => props.theme.palette.background.contrastText};
  font-size: 40px;
  opacity: ${(props) => props.opacity};
  margin-top: ${(props) => props.marginTop + "px"};
`;
export const AltBanner = styled.View<iSCBigHeaderProps>`
  opacity: ${(props) => props.opacity};
  top: 20px;
`;

export const Page = styled.ScrollView`
  width: 100%;
  background-color: ${(props) => props.theme.palette.background.main};
  flex-direction: column;
`;

interface iSCContent {
  hasNavigationBar?: boolean;
}
export const Content = styled.View<iSCContent>`
  background-color: ${(props) => props.theme.palette.background.main};
  min-height: ${(props) => {
    let result = Dimensions.get("window").height - 73.5 - 20;
    if (props.hasNavigationBar) result -= 44.7;
    return result + "px";
  }};
`;
