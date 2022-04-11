import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import TextInput from "../components/TextInput";
import { Button } from "react-native-paper";
import styles from "../stylesheets/globalStyles";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "react-native-elements";

// import {
//   useFonts,
//   Montserrat_400Regular,
//   Montserrat_700Bold,
// } from "@expo-google-fonts/dev"

// let [fontsLoaded] = useFonts({
//     Montserrat: Montserrat_400Regular,
//     MontserratBold: Montserrat_700Bold,
// })

const phoneWidth = Dimensions.get("window").width;
const phoneHeight = Dimensions.get("window").height;
const boxHeight = (48 * phoneHeight) / 844;
const boxWidth = (312 * phoneWidth) / 407;

const GetInfoScreen = () => {
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [shift, setShift] = useState(false);

  function uploadInfo() {
    console.log("Success");
  }

  return (
    <KeyboardAvoidingView
      style={stylesheet.backGround}
      behavior={"position"}
      enabled={shift}
      //enabled
      // keyboardVerticalOffset={Platform.select({ios: 500, android: 500})}
    >
      <View style={stylesheet.textView}>
        <Text style={stylesheet.titleText}>Let's get some Info!</Text>
      </View>
      <View style={stylesheet._Text_Field_Breed}>
        <TextInput
          style={stylesheet._Input_Box_Style}
          label="Breed"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          value={breed}
          onFocus={() => setShift(false)}
          onChangeText={(text) => {
            setBreed(text);
          }}
        />
      </View>
      <View style={stylesheet._Text_Field_Gender}>
        <TextInput
          style={stylesheet._Input_Box_Style}
          label="Gender"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          value={gender}
          onFocus={() => setShift(false)}
          onChangeText={(text) => {
            setGender(text);
          }}
        />
      </View>
      <View style={stylesheet._Text_Field_Birthday}>
        <TextInput
          style={stylesheet._Input_Box_Style}
          label="Birthday"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          value={birthday}
          onFocus={() => setShift(false)}
          onChangeText={(text) => {
            setBirthday(text);
          }}
        />
      </View>
      <View style={stylesheet._Text_Field_Location}>
        <TextInput
          style={stylesheet._Input_Box_Style}
          label="Location"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          value={location}
          onFocus={() => setShift(true)}
          onChangeText={(text) => {
            setLocation(text);
          }}
        />
      </View>
      <View style={stylesheet._Rectangle_39}>
        <Button
          style={[styles.button]}
          labelStyle={styles.buttonLabel}
          onPress={() => uploadInfo()}
        >
          Continue
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const stylesheet = StyleSheet.create({
  backGround: {
    flex: 1,
    backgroundColor: "rgba(245, 239, 224, 1)",
  },
  textView: {
    marginTop: phoneHeight * 0.07,
  },
  titleText: {
    fontFamily: "braveold",
    fontSize: 50,
    left: phoneWidth * 0.115,
  },
  //_Text_Field_##### position the input box relative to the screen
  _Text_Field_Breed: {
    position: "absolute",
    alignSelf: "center",
    top: phoneHeight * 0.306,
  },
  _Text_Field_Gender: {
    position: "absolute",
    alignSelf: "center",
    top: phoneHeight * 0.406,
  },
  _Text_Field_Birthday: {
    position: "absolute",
    alignSelf: "center",
    top: phoneHeight * 0.506,
  },
  _Text_Field_Location: {
    position: "absolute",
    alignSelf: "center",
    top: phoneHeight * 0.606,
  },
  //Inputbox style
  _Input_Box_Style: {
    fontFamily: "Montserrat",
    borderRadius: 5,
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "rgba(90, 67, 62, 1)",
    width: boxWidth,
    height: boxHeight,
    transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  //button style
  _Rectangle_39: {
    position: "absolute",
    width: 299,
    height: 56,
    right: "auto",
    top: phoneHeight * 0.756,
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  buttonContainer: {
    borderWidth: 10,
  },
});

export default GetInfoScreen;
