import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        tabBarActiveTintColor: isDark ? "white" : "black",
        headerStyle: {
          backgroundColor: isDark ? "black" : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : "black",
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
