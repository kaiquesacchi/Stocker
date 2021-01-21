import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

interface iSCBannerProps {
  height: number;
}

const SCBanner = styled.View<iSCBannerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${(props) => props.height + "px"};
`;

const SCStickyHeader = styled.View`
  background-color: black;
  padding: 40px 20px 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SCMaterialIcons = styled(MaterialIcons)`
  font-size: 25px;
  color: white;
`;

interface iSCBigHeaderProps {
  opacity: number;
  marginTop: number;
}
const SCBigHeader = styled.Text<iSCBigHeaderProps>`
  color: white;
  font-size: 40px;
  opacity: ${(props) => props.opacity};
  margin-top: ${(props) => props.marginTop + "px"};
`;

interface iSCSmallHeader {
  opacity: number;
}
const SCSmallHeader = styled.Text<iSCSmallHeader>`
  color: white;
  font-size: 25px;
  margin-left: 10px;

  opacity: ${(props) => props.opacity};
`;

const SCPage = styled.ScrollView`
  width: 100%;
  min-height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
`;

const SCContent = styled.View`
  min-height: ${() => Dimensions.get("window").height - 95 + "px"};
`;

export { SCBanner, SCStickyHeader, SCBigHeader, SCContent, SCMaterialIcons, SCPage, SCSmallHeader };