import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { useHistory } from "react-router-native";

import * as SC from "./styles";

export interface iButton {
  name: string;
  onPress: () => void;
}

interface iProps {
  title: string;
  backButton?: boolean;
  altBanner?: React.ReactNode;
  hasNavigationBar?: boolean;
  buttons?: iButton[];
  children?: React.ReactNode;
}

export default function AppBarLayout({ title, backButton, altBanner, hasNavigationBar, buttons, children }: iProps) {
  const history = useHistory();

  const handleBackButton = () => {
    history.goBack();
  };

  const bannerHeight = 250;

  const [bannerPadding, setBannerPadding] = useState(0);
  const [bannerOpacity, setBannerOpacity] = useState(1);
  const [headerOpacity, setHeaderOpacity] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let pageYOffset = event.nativeEvent.contentOffset.y;
    if (pageYOffset < 0) pageYOffset = 0; // When gliding upwards, may turn negative for a few frames.
    if (pageYOffset <= bannerHeight) {
      setBannerPadding(pageYOffset + 50);
      setHeaderOpacity(1 - (bannerHeight - pageYOffset) / (pageYOffset + 0.1));
      setBannerOpacity((bannerHeight - pageYOffset) / (pageYOffset + 0.1));
    } else {
      if (headerOpacity < 1) setHeaderOpacity(1);
    }
  };

  return (
    <SC.Page onScroll={handleScroll} stickyHeaderIndices={[1]}>
      <SC.Banner height={bannerHeight} isAltBanner={!!altBanner}>
        {altBanner ? (
          <SC.AltBanner opacity={bannerOpacity} marginTop={bannerPadding}>
            {altBanner}
          </SC.AltBanner>
        ) : (
          <SC.BigHeader opacity={bannerOpacity} marginTop={bannerPadding}>
            {title}
          </SC.BigHeader>
        )}
      </SC.Banner>
      <SC.StickyHeader>
        <SC.StickyHeaderTitle>
          {backButton && <SC.Icons name="chevron-back" onPress={handleBackButton} size={30} />}
          <SC.SmallHeader opacity={headerOpacity}>{title}</SC.SmallHeader>
        </SC.StickyHeaderTitle>
        <SC.StickyHeaderButtons>
          {buttons?.map((button, index) => (
            <SC.Icons key={index} name={button.name} onPress={button.onPress} size={30} />
          ))}
        </SC.StickyHeaderButtons>
      </SC.StickyHeader>
      <SC.Content hasNavigationBar={hasNavigationBar}>{children}</SC.Content>
    </SC.Page>
  );
}
