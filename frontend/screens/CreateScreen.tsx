import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { Svg, Path } from "react-native-svg";
import TextInput from "../components/TextInput";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/dev";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Create'>;

type Props = {
  navigation: LoginScreenNavigationProp;
}

const Create = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratBold: Montserrat_700Bold,
  });

  function createProfile() {
    fetch("http://localhost:8000/auth/register/", {
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
      })
      .catch((err) => console.error(err));
  }
  //password "red" box when not the same
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ height: Dimensions.get("window").height }}
      >
        <View style={stylesheet._iPhone_11_Pro___X___2}>
          <TextInput
            style={stylesheet._Text_Field}
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
            style={stylesheet._Text_Field_2}
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
          <TextInput
            style={stylesheet._Text_Field_3}
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
          <View
            style={[
              stylesheet._Create_your_account,
              { display: "flex", flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text
              style={[
                stylesheet._Create_your_account,
                {
                  position: "relative",
                  left: 0,
                  top: 0,
                  height: "auto",
                  transform: [{ translateX: 0 }, { translateY: 0 }],
                },
              ]}
            >
              Create your account
            </Text>
          </View>
          <View style={stylesheet._Group_124}>
            <Button
              style={stylesheet._Rectangle_39}
              mode="contained"
              onPress={() => createProfile()}
              labelStyle={stylesheet.signUp}
              uppercase={false}
              disabled={
                email !== "" &&
                  password !== "" &&
                  confirm !== "" &&
                  password === confirm
                  ? false
                  : true
              }
            >
              Sign Up
            </Button>
          </View>
          <View
            style={[
              stylesheet.logIn,
              {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
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
            <Button
              labelStyle={[{ fontFamily: "MontserratBold", fontWeight: "900" }]}
              mode="text"
              onPress={() => navigation.navigate("Summary")}
              uppercase={false}
              color="black">
              Summary
              </Button>
          </View>
          <View
            style={[
              stylesheet._Or_register_with,
              { display: "flex", flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Text
              style={[
                stylesheet._Or_register_with,
                {
                  position: "relative",
                  left: 0,
                  top: 0,
                  height: "auto",
                  transform: [{ translateX: 0 }, { translateY: 0 }],
                },
              ]}
            >
              Or register with
            </Text>
          </View>
          <View style={stylesheet._Group_129}>
            <View style={stylesheet._Ellipse_23}></View>
            <Image
              style={stylesheet._google__1__1}
              source={{ uri: imageUrl_google__1__1 }}
            ></Image>
          </View>
          <View style={stylesheet._Group_130}>
            <View style={stylesheet._Ellipse_23_2}></View>
            <Image
              style={stylesheet._facebook_app_symbol_1}
              source={{ uri: imageUrl_facebook_app_symbol_1 }}
            ></Image>
          </View>
          <View style={stylesheet._Group_131}>
            <View style={stylesheet._Ellipse_23_3}></View>
          </View>
          <Image
            style={stylesheet._Apple_logo_black_3}
            source={{ uri: imageUrl_Apple_logo_black_3 }}
          ></Image>
        </View>
      </ScrollView>
    );
  }
};

const stylesheet = StyleSheet.create({
  _iPhone_11_Pro___X___2: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: 812,
    borderRadius: 0,
    overflow: "hidden",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(245, 239, 224, 1)",
  },
  _Text_Field: {
    position: "absolute",
    width: 312,
    height: 48,
    fontFamily: "Montserrat",
    borderRadius: 5,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    right: "auto",
    top: 254,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  _Trailing_Icon: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 0,
    overflow: "hidden",
    left: "auto",
    right: 12,
    top: "50%",
    transform: [{ translateX: 0 }, { translateY: -9 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    display: "none",
  },
  _Vector: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 12,
    borderRadius: 0,
    left: 0.75,
    right: 0.75,
    transform: [{ translateX: 0 }, { translateY: 3 }, { rotate: "0deg" }],
  },
  _Vector_2: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 4.5,
    borderRadius: 0,
    left: 6.75,
    right: 6.75,
    transform: [{ translateX: 0 }, { translateY: 6.75 }, { rotate: "0deg" }],
  },
  _Icon___Text: {
    position: "absolute",
    width: "auto",
    height: "auto",
    borderRadius: 0,
    left: 12,
    right: "auto",
    top: "50%",
    transform: [{ translateX: 0 }, { translateY: -9 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  _Leading_Icon: {
    position: "relative",
    width: 18,
    height: 18,
    borderRadius: 0,
    minWidth: 0,
    overflow: "hidden",
    transform: [{ translateX: 0 }, { translateY: 0 }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    flexShrink: 0,
    marginRight: 8,
    display: "none",
  },
  _Vector_3: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 13.673869132995605,
    borderRadius: 0,
    left: 1.16156005859375,
    right: 1.161102294921875,
    transform: [
      { translateX: 0 },
      { translateY: 2.2486343383789062 },
      { rotate: "0deg" },
    ],
  },
  _Text: {
    position: "relative",
    width: "auto",
    height: "auto",
    minWidth: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    fontFamily: "Montserrat",
    fontWeight: "400",
    textDecorationLine: "none",
    lineHeight: 18,
    fontSize: 16,
    color: "rgba(90, 67, 62, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    letterSpacing: 0.1,
    flexShrink: 0,
  },
  _Label: {
    position: "absolute",
    width: "auto",
    height: "auto",
    display: "none",
    left: 0,
    right: 0,
    top: -20,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    fontFamily: "Montserrat",
    fontWeight: "400",
    textDecorationLine: "none",
    lineHeight: 16,
    fontSize: 14,
    color: "rgba(118, 118, 118, 1)",
    textAlign: "left",
    textAlignVertical: "bottom",
    letterSpacing: 0.1,
  },
  _Text_Field_2: {
    position: "absolute",
    width: 312,
    height: 48,
    borderRadius: 5,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    right: "auto",
    top: 303,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  _Trailing_Icon_2: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 0,
    overflow: "hidden",
    left: "auto",
    right: 12,
    top: "50%",
    transform: [{ translateX: 0 }, { translateY: -9 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    display: "none",
  },
  _Vector_4: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 12,
    borderRadius: 0,
    left: 0.75,
    right: 0.75,
    transform: [{ translateX: 0 }, { translateY: 3 }, { rotate: "0deg" }],
  },
  _Vector_5: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 4.5,
    borderRadius: 0,
    left: 6.75,
    right: 6.75,
    transform: [{ translateX: 0 }, { translateY: 6.75 }, { rotate: "0deg" }],
  },
  _Icon___Text_2: {
    position: "absolute",
    width: "auto",
    height: "auto",
    borderRadius: 0,
    left: 12,
    right: "auto",
    top: "50%",
    transform: [{ translateX: 0 }, { translateY: -9 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  _Leading_Icon_2: {
    position: "relative",
    width: 18,
    height: 18,
    borderRadius: 0,
    minWidth: 0,
    overflow: "hidden",
    transform: [{ translateX: 0 }, { translateY: 0 }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    flexShrink: 0,
    marginRight: 8,
    display: "none",
  },
  _Vector_6: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 13.673869132995605,
    borderRadius: 0,
    left: 1.16156005859375,
    right: 1.161102294921875,
    transform: [
      { translateX: 0 },
      { translateY: 2.248626708984375 },
      { rotate: "0deg" },
    ],
  },
  _Text_2: {
    position: "relative",
    width: "auto",
    height: "auto",
    minWidth: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    fontFamily: "Montserrat",
    fontWeight: "400",
    textDecorationLine: "none",
    lineHeight: 18,
    fontSize: 16,
    color: "rgba(90, 67, 62, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    letterSpacing: 0.1,
    flexShrink: 0,
  },
  _Label_2: {
    position: "absolute",
    width: "auto",
    height: "auto",
    display: "none",
    left: 0,
    right: 0,
    top: -20,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    fontFamily: "Montserrat",
    fontWeight: "400",
    textDecorationLine: "none",
    lineHeight: 16,
    fontSize: 14,
    color: "rgba(118, 118, 118, 1)",
    textAlign: "left",
    textAlignVertical: "bottom",
    letterSpacing: 0.1,
  },
  _Text_Field_3: {
    position: "absolute",
    width: 312,
    height: 48,
    borderRadius: 5,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    right: "auto",
    top: 352,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  _Trailing_Icon_3: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 0,
    overflow: "hidden",
    left: "auto",
    right: 12,
    top: "50%",
    transform: [{ translateX: 0 }, { translateY: -9 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    display: "none",
  },
  _Vector_7: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 12,
    borderRadius: 0,
    left: 0.75,
    right: 0.75,
    transform: [{ translateX: 0 }, { translateY: 3 }, { rotate: "0deg" }],
  },
  _Vector_8: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 4.5,
    borderRadius: 0,
    left: 6.75,
    right: 6.75,
    transform: [{ translateX: 0 }, { translateY: 6.75 }, { rotate: "0deg" }],
  },
  _Icon___Text_3: {
    position: "absolute",
    width: "auto",
    height: "auto",
    borderRadius: 0,
    left: 12,
    right: "auto",
    top: "50%",
    transform: [{ translateX: 0 }, { translateY: -9 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  _Leading_Icon_3: {
    position: "relative",
    width: 18,
    height: 18,
    borderRadius: 0,
    minWidth: 0,
    overflow: "hidden",
    transform: [{ translateX: 0 }, { translateY: 0 }],
    backgroundColor: "rgba(255, 255, 255, 0)",
    flexShrink: 0,
    marginRight: 8,
    display: "none",
  },
  _Vector_9: {
    position: "absolute",
    color: "rgba(0,0,0,0)",
    width: "auto",
    height: 13.673869132995605,
    borderRadius: 0,
    left: 1.16156005859375,
    right: 1.161102294921875,
    transform: [
      { translateX: 0 },
      { translateY: 2.248626708984375 },
      { rotate: "0deg" },
    ],
  },
  _Text_3: {
    position: "relative",
    width: "auto",
    height: "auto",
    minWidth: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    fontFamily: "Montserrat",
    fontWeight: "400",
    textDecorationLine: "none",
    lineHeight: 18,
    fontSize: 16,
    color: "rgba(90, 67, 62, 1)",
    textAlign: "left",
    textAlignVertical: "top",
    letterSpacing: 0.1,
    flexShrink: 0,
  },
  _Label_3: {
    position: "absolute",
    width: "auto",
    height: "auto",
    display: "none",
    left: 0,
    right: 0,
    top: -20,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    fontFamily: "Montserrat",
    fontWeight: "400",
    textDecorationLine: "none",
    lineHeight: 16,
    fontSize: 14,
    color: "rgba(118, 118, 118, 1)",
    textAlign: "left",
    textAlignVertical: "bottom",
    letterSpacing: 0.1,
  },
  _Create_your_account: {
    position: "absolute",
    width: 210,
    height: 101,
    left: 32,
    right: "auto",
    transform: [{ translateX: 0 }, { translateY: 112 }, { rotate: "0deg" }],
    fontFamily: "braveold",
    fontWeight: "500",
    textDecorationLine: "none",
    lineHeight: 50.400001525878906,
    fontSize: 40,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "left",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  _Group_124: {
    position: "absolute",
    width: 299,
    height: 56,
    top: 15,
    transform: [{ translateX: 38 }, { translateY: 475 }, { rotate: "0deg" }],
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0)",
  },
  _Rectangle_39: {
    position: "absolute",
    width: 299,
    height: 56,
    borderRadius: 28,
    opacity: 1,
    left: 0,
    right: "auto",
    top: 0,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
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
    // left: 36,
    top: 600,
  },
  _Or_register_with: {
    position: "absolute",
    width: "auto",
    height: "auto",
    left: 32,
    right: "auto",
    transform: [{ translateX: 0 }, { translateY: 627 }, { rotate: "0deg" }],
    fontFamily: "Montserrat",
    fontWeight: "400",
    textDecorationLine: "none",
    lineHeight: 14,
    fontSize: 14,
    color: "rgba(90, 67, 62, 1)",
    textAlign: "center",
    textAlignVertical: "center",
    letterSpacing: 0.1,
  },
  _Group_129: {
    position: "absolute",
    width: 49,
    height: 49,
    transform: [{ translateX: 174 }, { translateY: 610 }, { rotate: "0deg" }],
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0)",
  },
  _Ellipse_23: {
    position: "absolute",
    width: 49,
    height: 49,
    borderRadius: 1000,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "rgba(90, 67, 62, 0.5)",
    left: 0,
    right: "auto",
    top: 0,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
  },
  _google__1__1: {
    position: "absolute",
    width: 31.096155166625977,
    height: 31.096155166625977,
    borderRadius: 0,
    opacity: 1,
    left: 8.951904296875,
    right: "auto",
    top: 8.95196533203125,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
  _Group_130: {
    position: "absolute",
    width: 49,
    height: 49,
    transform: [{ translateX: 233 }, { translateY: 610 }, { rotate: "0deg" }],
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0)",
  },
  _Ellipse_23_2: {
    position: "absolute",
    width: 49,
    height: 49,
    borderRadius: 1000,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "rgba(90, 67, 62, 0.5)",
    left: 0,
    right: "auto",
    top: 0,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
  },
  _facebook_app_symbol_1: {
    position: "absolute",
    width: 31.100000381469727,
    height: 31.100000381469727,
    borderRadius: 0,
    opacity: 1,
    left: 8,
    right: "auto",
    top: 8,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
  _Group_131: {
    position: "absolute",
    width: 49,
    height: 49,
    transform: [{ translateX: 292 }, { translateY: 610 }, { rotate: "0deg" }],
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0)",
  },
  _Ellipse_23_3: {
    position: "absolute",
    width: 49,
    height: 49,
    borderRadius: 1000,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "rgba(90, 67, 62, 0.5)",
    left: 0,
    right: "auto",
    top: 0,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
  },
  _Apple_logo_black_3: {
    position: "absolute",
    width: 27,
    height: 32,
    borderRadius: 0,
    opacity: 1,
    left: 303,
    right: "auto",
    top: 618,
    bottom: "auto",
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(0,0,0,0)",
  },
});

const imageUrl_google__1__1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/806a62e1d2bb832c559e5b61722125b4";
const imageUrl_facebook_app_symbol_1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/1be7591b0844bc8f203a34b768fb86f3";
const imageUrl_Apple_logo_black_3 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/5644c57036f36ab6004217c806442a9e";

export default Create;
