import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent, 
  TextInputChangeEventData,
  Alert
} from "react-native";
import { Button } from "react-native-paper";
import TextInput from "../components/TextInput";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/dev";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

import { useContext } from "react";
import { useUserData, UserDataType } from "../hooks/userContext";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Create"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Create = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const { UserData, setUserData } = useUserData()!;

  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratBold: Montserrat_700Bold,
  });

  function createProfile() {
    fetch("http://localhost:8000/auth/validEmail/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: UserData.email,
      }),
    })
      .then((response) => response.status)
      .then((status) => {
        if (status == 200) {
          navigation.navigate("DogProfile");
        } else if (status == 409) {
          Alert.alert("Specified email already in use.");
        } else {
          Alert.alert("Specified email invalid");
        }
      })
      .catch((err) => console.error(err));
  }

  const handleChange = (text: string, name: string): void => {
    // console.log(name);
    setUserData({
      ...UserData,
      [name]: text
    });
  };

  //password "red" box when not the same
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* <View>
          <TextInput
            style={stylesheet.email}
            label="Your email"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            enablesReturnKeyAutomatically
            value={UserData.email}
            onChangeText={(text) => {
              setUserData({ email: text, password: text });
            }}
          />
        </View> */}
        <View style={stylesheet.container}>
          <TextInput
            style={stylesheet.email}
            label="Your email"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            enablesReturnKeyAutomatically
            value={UserData.email}
            onChangeText={text => handleChange(text, "email")} 
            // value={email}
            // onChangeText={(text) => {
            //   setEmail(text);
            // }}
          />
          <TextInput
            style={stylesheet.password}
            label="Your password"
            autoCapitalize="none"
            autoComplete="none"
            textContentType="password"
            enablesReturnKeyAutomatically
            value={UserData.password}
            onChangeText={text => handleChange(text, "password")}
            // value={password}
            // onChangeText={(text) => {
            //   setPassword(text);
            // }}
          />
          <TextInput
            style={stylesheet.confirm}
            label="Confirm password"
            autoCapitalize="none"
            autoComplete="none"
            textContentType="password"
            enablesReturnKeyAutomatically
            value={confirm}
            onChangeText={(text) => {
              setConfirm(text);
            }}
          />
          <View style={[stylesheet.title]}>
            <Text
              style={[
                stylesheet.title,
                {
                  left: 0,
                  top: 0,
                },
              ]}
            >
              Create your account
            </Text>
          </View>
          <View style={stylesheet.button}>
            <Button
              style={stylesheet.oval}
              mode="contained"
              onPress={() => createProfile()}
              labelStyle={stylesheet.signUp}
              uppercase={false}
              disabled={
                UserData.email !== "" &&
                UserData.password !== "" &&
                confirm !== "" &&
                UserData.password === confirm
                  ? false
                  : true
              }
            >
              Sign Up
            </Button>
          </View>
          <View style={[stylesheet.logIn]}>
            <Text style={[{ fontFamily: "Montserrat", fontWeight: "400" }]}>
              Already have an account?
            </Text>
            <Button
              labelStyle={[{ fontFamily: "MontserratBold", fontWeight: "900" }]}
              mode="text"
              onPress={() => navigation.navigate("Login")}
              uppercase={false}
              color="black"
            >
              Log In
            </Button>
          </View>
          <View style={[stylesheet.orRegisterWith]}>
            <Text
              style={[
                stylesheet.orRegisterWith,
                {
                  left: 0,
                  top: 0,
                },
              ]}
            >
              Or register with
            </Text>
          </View>
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
        </View>
      </ScrollView>
    );
  }
};

const stylesheet = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(245, 239, 224, 1)",
  },
  email: {
    position: "absolute",
    width: Dimensions.get("window").width - 64,
    height: 48,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    top: (254 / 812) * Dimensions.get("window").height,
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
    top: (303 / 812) * Dimensions.get("window").height,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  confirm: {
    position: "absolute",
    width: Dimensions.get("window").width - 64,
    height: 48,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    top: (352 / 812) * Dimensions.get("window").height,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  title: {
    position: "absolute",
    width: Dimensions.get("window").width - 64,
    height: 101,
    left: 32,
    top: (112 / 812) * Dimensions.get("window").height,
    fontFamily: "braveold",
    fontWeight: "500",
    lineHeight: 50.400001525878906,
    fontSize: 40,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "left",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  button: {
    position: "absolute",
    width: Dimensions.get("window").width - 76,
    height: 56,
    top: (490 / 812) * Dimensions.get("window").height,
    left: 38,
  },
  oval: {
    width: Dimensions.get("window").width - 76,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(233, 185, 94, 1)",
  },
  signUp: {
    left: 0,
    top: 5,
    fontFamily: "MontserratBold",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  logIn: {
    top: (600 / 812) * Dimensions.get("window").height,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  gContainer: {
    position: "absolute",
    width: 49,
    height: 49,
    left: (174 / 375) * Dimensions.get("window").width,
    top: (610 / 812) * Dimensions.get("window").height,
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
    top: (610 / 812) * Dimensions.get("window").height,
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
    top: (610 / 812) * Dimensions.get("window").height,
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
});

const imageUrl_google__1__1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/806a62e1d2bb832c559e5b61722125b4";
const imageUrl_facebook_app_symbol_1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/1be7591b0844bc8f203a34b768fb86f3";
const imageUrl_Apple_logo_black_3 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/5644c57036f36ab6004217c806442a9e";

export default Create;
