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
 import DogProfile from "../screens/DogProfile";
 import Summary from "../screens/Summary";
 import CreateScreen from "../screens/CreateScreen";
 import { RootStackParamList } from "../types";
 import LinkingConfiguration from "./LinkingConfiguration";
 import { paperTheme, paperDarkTheme } from "../../core/theme";
 import WalkPageNavigator from "./WalkPageStack";
 import GetInfoScreen from "../screens/GetInfoScreen"
 import { Appbar, Button } from "react-native-paper";
 import { UserDataProvider, useUserData } from "../hooks/userContext";
 
 export default function Navigation({
   colorScheme,
 }: {
   colorScheme: ColorSchemeName;
 }) {
   const Stack = createStackNavigator<RootStackParamList>();
 
   return (
     <UserDataProvider>
     <NavigationContainer
       // linking={LinkingConfiguration}
       theme={colorScheme === "dark" ? paperDarkTheme : paperTheme}
     >
       <Stack.Navigator
         initialRouteName="Create"
         screenOptions={{
           headerStyle: { backgroundColor: paperTheme.colors.primary },
         }}
       >
         <Stack.Screen
           name="Login"
           component={LoginScreen}
           options={({ navigation }) => ({
             headerTransparent: true,
             headerTitle: "",
             headerLeft: () => (
               <Button
                 labelStyle={{ color: "black" }}
                 onPress={() => navigation.navigate("Create")}
               >
                 Back
               </Button>
             ),
           })}
         />
         <Stack.Screen
           name="Create"
           component={CreateScreen}
           options={{
             headerShown: false,
           }}
         />
         <Stack.Screen
           name="DogProfile"
           component={DogProfile}
           options={({ navigation }) => ({
             headerTransparent: true,
             headerTitle: "",
             headerLeft: () => (
               <Button
                 labelStyle={{ color: "black" }}
                 onPress={() => navigation.navigate("Create")}
               >
                 Back
               </Button>
             ),
           })}
         />
         <Stack.Screen
           name="Summary"
           component={Summary}
           options={({ navigation }) => ({
             headerTransparent: true,
             headerTitle: "",
             headerLeft: "",
             headerRight: () => (
               <Button
                 labelStyle={{ color: "black" }}
                 onPress={() => {
                  navigation.navigate("WalkPage")
                 }}
               >
                 close
               </Button>
             ),
           })}
         />
         <Stack.Screen
           name="WalkPageNavigator"
           component={WalkPageNavigator}
           options={{
            headerShown: false,
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
           options={({ navigation }) => ({
             headerTransparent: true,
             headerTitle: "",
             headerLeft: () => (
               <Button
                 labelStyle={{ color: "black" }}
                 onPress={() => navigation.navigate("DogProfile")}
               >
                 Back
               </Button>
             ),
           })}
         />
       </Stack.Navigator>
     </NavigationContainer>
     </UserDataProvider>
   );
 }