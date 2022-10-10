import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Image, Text } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    await Font.loadAsync(Ionicons.font);
    await Asset.loadAsync(require("./photo.jpeg"));
    await Image.prefetch(
      "https://d33wubrfki0l68.cloudfront.net/4245a6b338cc1b008aa1265c213c1e75be207801/2eaf7/img/oss_logo.svg"
    );
  };
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return <Text>We are done loading!</Text>;
}
