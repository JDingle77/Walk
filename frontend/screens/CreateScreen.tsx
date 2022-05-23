import React, { useState } from "react";
import styles from "../stylesheets/globalStyles";
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
            style={styles.inputField}
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
        <View style={styles.creamContainer}>
          <View style={stylesheet.titleContainer}>
            <Text style={styles.title}>
              Create your account
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
            value={UserData.email}
            onChangeText={text => handleChange(text, "email")} 
            // value={email}
            // onChangeText={(text) => {
            //   setEmail(text);
            // }}
          />
          <TextInput
            style={styles.inputField}
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
            style={styles.inputField}
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
          <View style={stylesheet.buttonContainer}>
            <Button
              style={styles.button}
              mode="contained"
              onPress={() => createProfile()}
              labelStyle={styles.buttonLabel}
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
          <View style={styles.separator} />
          <View style={stylesheet.logoContainer}>
              <View style={stylesheet.registerContainer}>
                <Text style={styles.p}>
                  Or register with
                </Text>
              </View>
              <View style={stylesheet.logoCircle}>
                <Image
                  style={stylesheet.logoImage}
                  source={{ uri: imageUrl_google__1__1 }}
                />
              </View>
              <View style={stylesheet.logoCircle}>
                <Image
                  style={stylesheet.logoImage}
                  source={{ uri: imageUrl_facebook_app_symbol_1 }}
                />
              </View>
              <View style={stylesheet.logoCircle}>
                <Image
                  style={stylesheet.logoImage}
                  resizeMode="contain"
                  source={{ uri: imageUrl_Apple_logo_black_3 }}
                />
              </View>
          </View>
          <View style={[stylesheet.loginContainer]}>
            <Text style={styles.p}>
              Already have an account?
            </Text>
            <Button
              labelStyle={styles.bold}
              mode="text"
              onPress={() => navigation.navigate("Login")}
              uppercase={false}
              color="black"
            >
              Log In
            </Button>
            <Button
              labelStyle={styles.bold}
              mode="text"
              onPress={() => navigation.navigate("Summary")}
              uppercase={false}
              color="black"
            >
              Summary
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const stylesheet = StyleSheet.create({
  titleContainer: {
    marginTop: 120,
  },
  buttonContainer: {
    marginVertical: 12,
  },
  loginContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
  },
  registerContainer: {
    marginLeft: (32 / 375) * Dimensions.get("window").width,
    marginRight: "auto",
  },
  logoCircle: {
    height: 49,
    width: 49,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "rgba(90, 67, 62, 0.5)",
    justifyContent: "center",
    alignItems: "center",

  },
  logoImage: {
    width: 31.096155166625977,
    height: 31.096155166625977,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // borderWidth: 1,
  }
});

const imageUrl_google__1__1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/806a62e1d2bb832c559e5b61722125b4";
const imageUrl_facebook_app_symbol_1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/1be7591b0844bc8f203a34b768fb86f3";
const imageUrl_Apple_logo_black_3 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/5644c57036f36ab6004217c806442a9e";

export default Create;
