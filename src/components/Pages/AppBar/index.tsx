import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useHistory } from "react-router-native";
import {
  SCBanner,
  SCTopMargin,
  SCStickyHeader,
  SCBigHeader,
  SCAltBanner,
  SCContent,
  SCMaterialIcons,
  SCPage,
  SCSmallHeader,
} from "./styles";

interface iProps {
  title: string;
  backButton?: boolean;
  altBanner?: React.ReactNode;
  hasNavigationBar?: boolean;
  children?: React.ReactNode;
}

export default function AppBarPage({ title, backButton, altBanner, hasNavigationBar, children }: iProps) {
  const history = useHistory();

  const handleBackButton = () => {
    history.goBack();
  };

  const bannerHeight = 280;

  const [bannerPadding, setBannerPadding] = useState(0);
  const [bannerOpacity, setBannerOpacity] = useState(1);
  const [headerOpacity, setHeaderOpacity] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let pageYOffset = event.nativeEvent.contentOffset.y;
    if (pageYOffset < 0) pageYOffset = 0; // When gliding upwards, may turn negative for a few frames.
    if (pageYOffset <= bannerHeight) {
      setBannerPadding(pageYOffset);
      setHeaderOpacity(1 - (bannerHeight - pageYOffset) / (pageYOffset + 0.1));
      setBannerOpacity((bannerHeight - pageYOffset) / (pageYOffset + 0.1));
    } else {
      if (headerOpacity < 1) setHeaderOpacity(1);
    }
  };

  return (
    <SCPage onScroll={handleScroll} stickyHeaderIndices={[0, 2]}>
      <SCTopMargin />
      <SCBanner height={bannerHeight}>
        {altBanner ? (
          <SCAltBanner opacity={bannerOpacity} marginTop={bannerPadding}>
            {altBanner}
          </SCAltBanner>
        ) : (
          <SCBigHeader opacity={bannerOpacity} marginTop={bannerPadding}>
            {title}
          </SCBigHeader>
        )}
      </SCBanner>
      <SCStickyHeader>
        {backButton ? <SCMaterialIcons name="arrow-back-ios" onPress={handleBackButton} /> : <React.Fragment />}
        <SCSmallHeader opacity={headerOpacity}>{title}</SCSmallHeader>
      </SCStickyHeader>
      <SCContent hasNavigationBar={hasNavigationBar}>{children}</SCContent>
    </SCPage>
  );
}
