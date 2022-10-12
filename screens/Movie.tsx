import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Movie() {
  return (
    <Container>
      <Swiper
        loop
        timeout={3.5}
        controlsEnabled={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
      </Swiper>
    </Container>
  );
}
