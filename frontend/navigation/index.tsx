/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import LoginScreen from "../screens/login";
import HomeScreen from "../screens/home";
import CreateScreen from "../screens/CreateScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { paperTheme, paperDarkTheme } from "../../core/theme";
import WalkPageNavigator from "./WalkPageStack";
import GetInfoScreen from "../screens/GetInfoScreen"

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? paperDarkTheme : paperTheme}
    >
      <Stack.Navigator
        initialRouteName="GetInfo"
        screenOptions={{
          headerStyle: { backgroundColor: paperTheme.colors.primary },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerBackTitleStyle: { color: "white" },
            headerBackTitle: "Back",
            headerTintColor: "white",
            headerTitle: "Login",
          }}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{
            headerBackTitleStyle: { color: "white" },
            headerBackTitle: "Back",
            headerTintColor: "white",
            headerTitle: "Create",
          }}
        />
        <Stack.Screen
          name="WalkPageNavigator"
          component={WalkPageNavigator}
          options={{
            headerBackTitleStyle: { color: "white" },
            headerBackTitle: "Back",
            headerTintColor: "white",
            headerTitle: "WalkPage",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerBackTitleStyle: { color: "white" },
            headerBackTitle: "Back",
            headerTintColor: "white",
            headerTitle: "Home",
          }}
        />
        <Stack.Screen
          name="GetInfo"
          component={GetInfoScreen}
          options={{
            headerBackTitleStyle: { color: "white" },
            headerBackTitle: "Back",
            headerTintColor: "white",
            headerTitle: "GetInfo",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
