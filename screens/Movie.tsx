import React from "react";
import { Text, Pressable } from "react-native";

export default function Movie({ navigation: { navigate } }: any) {
  return (
    <Pressable
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={({ pressed }) => [
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          opacity: pressed ? 0.3 : 1.0,
        },
      ]}
    >
      <Text>Movie</Text>
    </Pressable>
  );
}
