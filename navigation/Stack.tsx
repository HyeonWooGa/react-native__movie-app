import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";

const ScreenOne = ({ navigation: { navigate } }: any) => (
  <Pressable onPress={() => navigate("Two")}>
    <Text>Go to Two</Text>
  </Pressable>
);
const ScreenTwo = ({ navigation: { navigate } }: any) => (
  <Pressable onPress={() => navigate("Three")}>
    <Text>Go To Three</Text>
  </Pressable>
);
const ScreenThree = ({ navigation: { setOptions } }: any) => (
  <Pressable onPress={() => setOptions({ title: "Hello World" })}>
    <Text>Change Title</Text>
  </Pressable>
);

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
}
