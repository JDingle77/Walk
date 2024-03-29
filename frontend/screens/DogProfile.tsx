import * as React from "react";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInput from "../components/TextInput";
import { Text, View } from "../components/Themed";
import styles from "../stylesheets/globalStyles";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

import { useUserData, UserDataType } from "../hooks/userContext";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "DogProfile"
>;

type Props = {
  navigation: NavigationProp;
};

const DogProfile = ({ navigation }: Props) => {
  const [buttonSelected, setSelect] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [ownerNameError, setOwnerNameError] = useState("");
  const [usernameLabel, setUsernameLabel] = useState("")
  const [dogLabel, setDogLabel] = useState("")
  const [ownerLabel, setOwnerLabel] = useState("")

  //useContext stuff
  const { UserData, setUserData } = useUserData()!;

  const handleChange = (text: string, name: string): void => {
      // console.log(name);
      setUserData({
        ...UserData,
        dogProfile: {
          ...UserData.dogProfile,
          [name]: text,
        },
      });
  };

  let usernameErrorMessage: string
  let nameErrorMessage: string
  let ownerNameErrorMessage: string
  let usernameLabelMessage: string
  let dogLabelMessage: string
  let ownerLabelMessage: string

  useEffect(
    () => {
      if (UserData.dogProfile.username === "") {
        usernameErrorMessage = "This field cannot be left empty"
        usernameLabelMessage = "Your dog's username"
      } else {
        usernameErrorMessage = ""
        usernameLabelMessage = ""
      }

      if (UserData.dogProfile.name === "") {
        nameErrorMessage = "This field cannot be left empty"
        dogLabelMessage = "Your dog's name"
      } else {
        nameErrorMessage = ""
        dogLabelMessage = ""
      }

      if (UserData.dogProfile.owner_name === "") {
        ownerNameErrorMessage = "This field cannot be left empty"
        ownerLabelMessage = "Owner's username"
      } else {
        ownerNameErrorMessage = ""
        ownerLabelMessage = ""
      }

      setUsernameError(usernameErrorMessage)
      setNameError(nameErrorMessage)
      setOwnerNameError(ownerNameErrorMessage)
      setUsernameLabel(usernameLabelMessage)
      setDogLabel(dogLabelMessage)
      setOwnerLabel(ownerLabelMessage)
    },
    [UserData],
  )

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{
        height: Dimensions.get("window").height,
        backgroundColor: "#F5EFE0",
      }}
    >
      <View style={styles.separator}></View>
      <View style={styles.separator}></View>
      <View style={styles.creamContainer}>
        <View style={localStyles.image}>
          <Image
            style={localStyles.imageSize}
            source={require("../assets/images/dogProfile.png")}
          />
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Your Dog's Profile</Text>
        </View>
        <View style={styles.separator}></View>
        <View>
          <TextInput
            style={styles.inputField}
            enablesReturnKeyAutomatically
            label={usernameLabel}
            autoCapitalize="none"
            autoComplete="none"
            value={UserData.dogProfile.username}
            onChangeText={text => handleChange(text, "username")}
            errorText={usernameError}
          />
          <TextInput
            label={dogLabel}
            style={styles.inputField}
            value={UserData.dogProfile.name}
            autoCapitalize="none"
            autoComplete="none"
            onChangeText={text => handleChange(text, "name")}
            textContentType="name"
            errorText={nameError}
          />
          <TextInput
            label={ownerLabel}
            style={styles.inputField}
            value={UserData.dogProfile.owner_name}
            autoCapitalize="none"
            autoComplete="none"
            onChangeText={text => handleChange(text, "owner_name")}
            textContentType="name"
            errorText={ownerNameError}
          />
        </View>
        <View style={styles.separator}></View>
        {/* <Pressable
          style={[styles.button, { opacity: buttonSelected ? 0.8 : 1 }]}
          onPress={() => {
            setSelect(!buttonSelected);
            navigation.navigate("GetInfo")
          }}
        >
          <Text style={styles.buttonLabel}> Continue</Text>
        </Pressable> */}
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            setSelect(!buttonSelected);
            navigation.navigate("GetInfo")
          }}
          labelStyle={styles.buttonLabel}
          uppercase={false}
          disabled={ //IDK why its not disabling
            UserData.dogProfile.username === "" ||
            UserData.dogProfile.name === "" ||
            UserData.dogProfile.owner_name === ""
          }
        >
          Continue
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

const localStyles = StyleSheet.create({
  image: {
    alignSelf: "flex-start",
    width: 0.4 * Dimensions.get("window").width,
    height: 0.4 * Dimensions.get("window").width,
    padding: 10,
  },
  imageSize: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },

});

export default DogProfile;
