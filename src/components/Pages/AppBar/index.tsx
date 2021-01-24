import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { SCBanner, SCStickyHeader, SCBigHeader, SCContent, SCMaterialIcons, SCPage, SCSmallHeader } from "./styles";

interface iProps {
  title: string;
  children?: React.ReactNode;
}

export default function AppBarPage({ title, children }: iProps) {
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
    <SCPage onScroll={handleScroll} stickyHeaderIndices={[1]}>
      <SCBanner height={bannerHeight}>
        <SCBigHeader opacity={bannerOpacity} marginTop={bannerPadding}>
          {title}
        </SCBigHeader>
      </SCBanner>
      <SCStickyHeader>
        <SCMaterialIcons name="arrow-back-ios" />
        <SCSmallHeader opacity={headerOpacity}>{title}</SCSmallHeader>
      </SCStickyHeader>
      <SCContent>{children}</SCContent>
    </SCPage>
  );
}
