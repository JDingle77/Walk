import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Dimensions} from "react-native";
import TextInput from "../components/TextInput";
import { Text, View } from "../components/Themed";
import { Button } from "react-native-paper";

const phoneWidth =  Dimensions.get("window").width;
const phoneHeight =  Dimensions.get("window").height;
const boxHeight = (48*phoneHeight)/844;
const boxWidth = (312*phoneWidth)/407

const GetInfoScreen = () => {
  
    console.log(phoneHeight)

    const [breed, setBreed] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [location, setLocation] = useState("");
    
    function uploadInfo() {
        console.log("Success")
    }

  return (
    <View style={stylesheet._iPhone_11_Pro___X___2}>
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
            <TextInput
              style={stylesheet._Text_Field_Location}
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
            <Button
                style={stylesheet._Rectangle_39}
                mode="contained"
                onPress={() => uploadInfo()}
                uppercase={false}>
                Continue
            </Button>
   

       
    </View>
  );
};



const stylesheet = StyleSheet.create({
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
        width: boxWidth,
        height: boxHeight,
        fontFamily: "Montserrat",
        borderRadius: 5,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "rgba(90, 67, 62, 1)",
        left: phoneWidth*0.115,
        right: "auto",
        top: phoneHeight*0.502,
        bottom: "auto",
        transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
      _Rectangle_39: {
        position: "absolute",
        width: 299,
        height: 56, 
        left: phoneWidth*0.133,
        right: "auto",
        top: phoneHeight* 0.756,
        bottom: "auto",
        opacity: 1,
        borderRadius: 28,
        transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
        backgroundColor: "rgba(233, 185, 94, 1)",
      },
})

export default GetInfoScreen;
