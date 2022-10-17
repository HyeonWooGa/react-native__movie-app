import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

type RootStackParamList = {
  Detail: { original_title: string };
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  useEffect(() => {
    setOptions({
      title: params.original_title ?? "No Title",
    });
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
};

export default Detail;
