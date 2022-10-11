import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Image, Text, useColorScheme } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

const loadFonts = (fonts: any[]) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images: any[]) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    // 아래의 작업들을 위해 Hooks 를 사용 안함
    /// init db
    /// get user avatar
    /// count nitification
    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./photo.jpeg"),
      "https://d1telmomo28umc.cloudfront.net/media/public/avatars/newbie-1653629365.jpg",
    ]);
    await Promise.all([...fonts, ...images]);
  };
  const isDark = useColorScheme() === "dark";
  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Tabs />
    </NavigationContainer>
  );
}
