import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Dimensions, KeyboardAvoidingView, Platform} from "react-native";
import TextInput from "../components/TextInput";
import { Text, View } from "../components/Themed";
import { Button } from "react-native-paper";
import styles from '../stylesheets/globalStyles'
import { ScrollView } from "react-native-gesture-handler";

// import {
//   useFonts,
//   Montserrat_400Regular,
//   Montserrat_700Bold,
// } from "@expo-google-fonts/dev"

// let [fontsLoaded] = useFonts({
//     Montserrat: Montserrat_400Regular,
//     MontserratBold: Montserrat_700Bold,
// })


const phoneWidth =  Dimensions.get("window").width;
const phoneHeight =  Dimensions.get("window").height;
const boxHeight = (48*phoneHeight)/844;
const boxWidth = (312*phoneWidth)/407

const GetInfoScreen = () => {
  

    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [location, setLocation] = useState("");
    
    function uploadInfo() {
        console.log("Success")
    }

  return (
   
      // <KeyboardAvoidingView  
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      //   enabled keyboardVerticalOffset={Platform.select({ios: 80, android: 500})}
      //   style={stylesheet.test}>
        <View style={stylesheet._iPhone_11_Pro___X___2} >
          <Text style={stylesheet.titleText}>Let's get some Info!</Text>
          <TextInput
              style={stylesheet._Text_Field_Breed}
              label="Breed"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              enablesReturnKeyAutomatically
              value={breed}
              onChangeText={(text) => {
                setBreed(text);
              }}
            />
            <TextInput
              style={stylesheet._Text_Field_Gender}
              label="Gender"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              enablesReturnKeyAutomatically
              value={gender}
              onChangeText={(text) => {
                setGender(text);
              }}
            />
            <TextInput
              style={stylesheet._Text_Field_Birthday}
              label="Birthday"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              enablesReturnKeyAutomatically
              value={birthday}
              onChangeText={(text) => {
                setBirthday(text);
              }}
            />
            <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={stylesheet._Text_Field_Location}
             >
              <TextInput
                style={stylesheet._Text_Field_Style}
                label="Location"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                enablesReturnKeyAutomatically
                value={location}
                onChangeText={(text) => {
                  setLocation(text);
                }}
              />
            </KeyboardAvoidingView>
           
            <View style = {stylesheet._Rectangle_39} >
              <Button 
                style={[styles.button]} 
                labelStyle={styles.buttonLabel}> 
                Continue
              </Button>
            </View>
          </View>
      // </KeyboardAvoidingView>

    
  );
};

//todo
//its working but not expandning in the direction we want



const stylesheet = StyleSheet.create({
    test: {
      height: phoneHeight,
      width: phoneWidth,

    },
    titleText:{
      position: 'absolute',
      fontFamily: "braveold",
      fontSize: 50,
      left: phoneWidth*0.115,
    },
    buttonContainer:{
      borderWidth: 10
    },
    _iPhone_11_Pro___X___2: {
        position: "absolute",
        width: Dimensions.get("window").width,
        height: 812,
        borderRadius: 0,
        overflow: "hidden",
        transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
        backgroundColor: "rgba(245, 239, 224, 1)",
      },
      _Text_Field_Breed: {
        position: "absolute",
        width: boxWidth,
        height: boxHeight,
        fontFamily: "Montserrat",
        borderRadius: 5,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "rgba(90, 67, 62, 1)",
        left: phoneWidth*0.115,
        right: "auto",
        top: phoneHeight* 0.246,
        bottom: "auto",
        transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
      _Text_Field_Gender : {
        position: "absolute",
        width: boxWidth,
        height: boxHeight,
        fontFamily: "Montserrat",
        borderRadius: 5,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "rgba(90, 67, 62, 1)",
        left: phoneWidth*0.115,
        right: "auto",
        top: phoneHeight*0.331,
        bottom: "auto",
        transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
      _Text_Field_Birthday:{
        position: "absolute",
        width: boxWidth,
        height: boxHeight,
        fontFamily: "Montserrat",
        borderRadius: 5,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "rgba(90, 67, 62, 1)",
        left: phoneWidth*0.115,
        right: "auto",
        top: phoneHeight*0.417,
        bottom: "auto",
        transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
      _Text_Field_Location:{
        position: "absolute",
        left: phoneWidth*0.115,
        right: "auto",
        top: phoneHeight*0.602,
        bottom: "auto",
        borderWidth: 5,
      },
      _Text_Field_Style:{
        width: boxWidth,
        height: boxHeight,
        fontFamily: "Montserrat",
        borderRadius: 5,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "rgba(90, 67, 62, 1)",
        transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
      _Rectangle_39: {
        position: "absolute",
        width: 299,
        height: 56, 
        right: "auto",
        top: phoneHeight* 0.756,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
})

export default GetInfoScreen;
