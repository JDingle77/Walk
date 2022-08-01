import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import TextInput from "../components/TextInput";
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
    fetch("http://10.0.0.187:8000/auth/login/", {
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
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        save("access_token",response.access);
        save("refresh_token",response.refresh);
        navigation.navigate("WalkPageNavigator");
      })
      .catch((err) => console.error(err));
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={stylesheet.container}>
          <View style={stylesheet.gContainer}>
            <View style={stylesheet.gCircle}></View>
            <Image
              style={stylesheet.gLogo}
              source={{ uri: imageUrl_google__1__1 }}
            ></Image>
          </View>
          <View style={stylesheet.fContainer}>
            <View style={stylesheet.fCircle}></View>
            <Image
              style={stylesheet.fLogo}
              source={{ uri: imageUrl_facebook_app_symbol_1 }}
            ></Image>
          </View>
          <View style={stylesheet.aContainer}>
            <View style={stylesheet.aCircle}></View>
            <Image
              style={stylesheet.aLogo}
              source={{ uri: imageUrl_Apple_logo_black_3 }}
            ></Image>
          </View>
          <TextInput
            style={stylesheet.email}
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
            style={stylesheet.password}
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
          <View
            style={[
              stylesheet.title,
              { display: "flex", flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text
              style={[
                stylesheet.title,
                {
                  position: "relative",
                  flexGrow: 1,
                  left: 0,
                  top: 0,
                  height: "auto",
                  transform: [{ translateX: 0 }, { translateY: 0 }],
                },
              ]}
            >
              Sign in to your account
            </Text>
          </View>
          <View style={stylesheet.button}>
            <Button
              style={stylesheet.oval}
              mode="contained"
              onPress={() => login()}
              labelStyle={stylesheet.signIn}
              uppercase={false}
              disabled={email !== "" && password !== "" ? false : true}
            >
              Sign In
            </Button>
          </View>
          <View style={stylesheet.orSignInWith}>
            <Text
              style={[
                stylesheet.orSignInWith,
                {
                  position: "relative",
                  flexGrow: 1,
                  left: 0,
                  top: 0,
                  height: "auto",
                  transform: [{ translateX: 0 }, { translateY: 0 }],
                },
              ]}
            >
              Or sign in with
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const stylesheet = StyleSheet.create({
  signIn: {
    left: 0,
    top: 5,
    fontFamily: "MontserratBold",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    width: Dimensions.get("window").width - 76,
    height: 56,
    top: (528 / 812) * Dimensions.get("window").height,
    left: 38,
  },
  oval: {
    width: Dimensions.get("window").width - 76,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(233, 185, 94, 1)",
  },
  email: {
    position: "absolute",
    width: Dimensions.get("window").width - 64,
    height: 48,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    top: (333 / 812) * Dimensions.get("window").height,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  password: {
    position: "absolute",
    width: Dimensions.get("window").width - 64,
    height: 48,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    top: (381 / 812) * Dimensions.get("window").height,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(245, 239, 224, 1)",
  },
  gContainer: {
    position: "absolute",
    width: 49,
    height: 49,
    left: (174 / 375) * Dimensions.get("window").width,
    top: (695 / 812) * Dimensions.get("window").height,
  },
  gCircle: {
    height: 49,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "rgba(90, 67, 62, 0.5)",
  },
  gLogo: {
    position: "absolute",
    width: 31.096155166625977,
    height: 31.096155166625977,
    left: 8.951904296875,
    top: 8.95196533203125,
  },
  fContainer: {
    position: "absolute",
    width: 49,
    height: 49,
    left: (233 / 375) * Dimensions.get("window").width,
    top: (695 / 812) * Dimensions.get("window").height,
  },
  fCircle: {
    height: 49,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "rgba(90, 67, 62, 0.5)",
  },
  fLogo: {
    position: "absolute",
    width: 31.100000381469727,
    height: 31.100000381469727,
    left: 8,
    top: 8,
  },
  aContainer: {
    position: "absolute",
    width: 49,
    height: 49,
    left: (292 / 375) * Dimensions.get("window").width,
    top: (695 / 812) * Dimensions.get("window").height,
  },
  aCircle: {
    height: 49,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "rgba(90, 67, 62, 0.5)",
  },
  aLogo: {
    position: "absolute",
    width: 27,
    height: 32,
    left: 11,
    top: 8,
  },
  title: {
    position: "absolute",
    width: Dimensions.get("window").width - 64,
    height: 101,
    left: 32,
    top: (193 / 812) * Dimensions.get("window").height,
    fontFamily: "braveold",
    fontWeight: "500",
    lineHeight: 50.400001525878906,
    fontSize: 40,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "left",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  orRegisterWith: {
    position: "absolute",
    left: (32 / 375) * Dimensions.get("window").width,
    top: (627 / 812) * Dimensions.get("window").height,
    fontFamily: "Montserrat",
    fontWeight: "400",
    lineHeight: 14,
    fontSize: 14,
    color: "rgba(90, 67, 62, 1)",
    letterSpacing: 0.1,
  },
  orSignInWith: {
    position: "absolute",
    left: (39 / 375) * Dimensions.get("window").width,
    top: (713 / 812) * Dimensions.get("window").height,
    fontFamily: "Montserrat",
    fontWeight: "400",
    lineHeight: 14,
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  back: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: 26,
    top: 40,
    fontFamily: "Montserrat",
    fontWeight: "400",
    lineHeight: 14,
    fontSize: 18,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
});

const imageUrl_google__1__1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/1bcf29983084491ac3fb6c067de1ce88";
const imageUrl_facebook_app_symbol_1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/5e48653633720b1448aebd03f9ed3b1b";
const imageUrl_Apple_logo_black_3 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/4db2a0d8322a359d5f8771bb8f98c5f6";
