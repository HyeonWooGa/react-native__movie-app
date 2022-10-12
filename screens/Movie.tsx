import React from "react";
import { Text, Pressable } from "react-native";
import styled from "styled-components/native";

const Btn = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export default function Movie({ navigation: { navigate } }: any) {
  return (
    <Btn
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.3 : 1.0,
        },
      ]}
    >
      <Title>Movie</Title>
    </Btn>
  );
}
