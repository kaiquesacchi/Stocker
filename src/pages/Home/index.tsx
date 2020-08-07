import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export default function Home() {
  return (
    <Page>
      <Text>Home</Text>
    </Page>
  );
}

const Page = styled.View`
  min-height: 100%;
  background-color: #102535;
`;
