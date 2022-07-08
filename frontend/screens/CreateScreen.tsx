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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Create your account
            </Text>
          </View>
          <View style={styles.separator} />
          <TextInput
            style={styles.inputField}
            // label={<Text style={{color: "black"}}>Your email</Text>}
            label="Your email"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            enablesReturnKeyAutomatically
            value={UserData.email}
            onChangeText={text => handleChange(text, "email")} 
            errorText={error}
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
          <View style={styles.separator} />
          
          <ThirdPartyLogins AuthType="register" />

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
              onPress={() => navigation.navigate("GetInfo")}
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
});

export default Create;
