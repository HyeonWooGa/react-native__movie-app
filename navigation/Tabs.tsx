import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "tomato" },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "purple",
        headerTitleStyle: { color: "tomato" },
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    >
      <Tab.Screen name="Movies" component={Movie} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}
