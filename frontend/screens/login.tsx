import React, { useState } from "react";
import styles from "../stylesheets/globalStyles";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import TextInput from "../components/TextInput";
import ThirdPartyLogins from "../components/ThirdPartyLogins";
import AppLoading from "expo-app-loading";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/dev";
import { Button } from "react-native-paper";
import { save } from "../functions/SecureStore";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, "Login">;

type Props = {
  navigation: NavigationProp;
};

export default function Login({ navigation }: Props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
  });

  function login() {
    fetch("http://localhost:8000/auth/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_admin: true,
        email: email,
        password: password,
      }),
    })
      .then((response) => {return Promise.all([response.json(), response.status])})
      .then(([data, status]) => {
        if (status >= 200 && status < 300)
        {
          console.log(data);
          save("access_token",data.access);
          save("refresh_token",data.refresh);
          navigation.navigate("WalkPageNavigator");
        }
        else
        {
          console.log(data.detail);
        }
      })
      .catch((err) => console.error(err));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.creamContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Sign in to your account
            </Text>
          </View>
          <View style={styles.separator} />

          <TextInput
            style={styles.inputField}
            label="Your email"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            enablesReturnKeyAutomatically
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.inputField}
            label="Your password"
            autoCapitalize="none"
            autoComplete="none"
            textContentType="password"
            enablesReturnKeyAutomatically
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Button
          style={styles.button}
          mode="contained"
          onPress={() => login()}
          labelStyle={styles.buttonLabel}
          uppercase={false}
          disabled={ //IDK why its not disabling
            email === "" || password === ""
          }
        >
          Sign In
        </Button>
        <View style={styles.separator} />
        <ThirdPartyLogins AuthType="sign in" />
        </View>
      </ScrollView>
    );
  }
}