import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import TextInput from "../components/TextInput";
import AppLoading from "expo-app-loading";
import ThirdPartyLogins from "../components/ThirdPartyLogins";
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
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [emailLabel, setEmailLabel] = useState("");
  const [passwordLabel, setPasswordLabel] = useState("");
  const [confirmLabel, setConfirmLabel] = useState("");
  const { UserData, setUserData } = useUserData()!;

  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratBold: Montserrat_700Bold,
  });

  let errorMessage: string;
  let emailLabelMessage: string;
  let passwordLabelMessage: string;
  let confirmLabelMessage: string;

  useEffect(() => {
    errorMessage =
      UserData.password === confirm && confirm !== ""
        ? ""
        : "Passwords must match";
    setConfirmError(errorMessage);
  }, [confirm]);

  useEffect(() => {
    emailLabelMessage = UserData.email === "" ? "Your email" : "";
    passwordLabelMessage = UserData.password === "" ? "Your password" : "";
    confirmLabelMessage = confirm === "" ? "Confirm password" : "";
    setEmailLabel(emailLabelMessage);
    setPasswordLabel(passwordLabelMessage);
    setConfirmLabel(confirmLabelMessage);
  }, [UserData.email, UserData.password, confirm]);

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
          setError("Specified email already in use.");
        } else {
          setError("Specified email invalid");
        }
      })
      .catch((err) => console.error(err));
  }

  const handleChange = (text: string, name: string): void => {
    // console.log(name);
    setUserData({
      ...UserData,
      [name]: text,
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
        <View style={[styles.creamContainer, stylesheet.spaceBetween]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create your account</Text>
          </View>

          <View>
            <TextInput
              style={styles.inputField}
              label={emailLabel}
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              enablesReturnKeyAutomatically
              value={UserData.email}
              onChangeText={(text) => handleChange(text, "email")}
              errorText={error}
            />

            <TextInput
              style={styles.inputField}
              label={passwordLabel}
              autoCapitalize="none"
              autoComplete="none"
              textContentType="password"
              enablesReturnKeyAutomatically
              value={UserData.password}
              onChangeText={(text) => handleChange(text, "password")}
            />
            <TextInput
              style={styles.inputField}
              label={confirmLabel}
              autoCapitalize="none"
              autoComplete="none"
              textContentType="password"
              enablesReturnKeyAutomatically
              value={confirm}
              onChangeText={(text) => {
                setConfirm(text);
              }}
              errorText={confirmError}
            />

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

          <View>
            <ThirdPartyLogins AuthType="register" />

            <View style={[stylesheet.loginContainer]}>
              <Text style={styles.p}>Already have an account?</Text>
              <Button
                labelStyle={styles.bold}
                mode="text"
                onPress={() => navigation.navigate("Login")}
                uppercase={false}
                color="black"
              >
                Log In
              </Button>
            </View>
          </View>

          <View />
        </View>
      </ScrollView>
    );
  }
};

//try space between
const stylesheet = StyleSheet.create({
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
  spaceBetween: {
    justifyContent: "space-between",
  },
});

export default Create;
