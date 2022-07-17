import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import TextInput from "../components/TextInput";
import { Button } from "react-native-paper";
import { Icon } from 'react-native-elements';
import styles from "../stylesheets/globalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";

import { useUserData, UserDataType } from "../hooks/userContext";
import { save } from "../functions/SecureStore";

import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, "GetInfo">;

type Props = {
  navigation: NavigationProp;
};

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
const boxWidth =  Dimensions.get("window").width - 64;
// const boxWidth = (312 * phoneWidth) / 407;

const GetInfoScreen = ({ navigation }: Props) => {

  const [birthday, setBirthday] = useState("");
  const [shift, setShift] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [items, setItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Not specified" },
  ]);

  const onChange = (event, selectedDate: Date) => {
    //console.log(selectedDate);
    var date = new Date(selectedDate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();
    const fullDate = month + "-" + dt + "-" + year;
    console.log(fullDate);
    // console.log(date)
    setShow(false);
    setBirthday(fullDate);
    setDate(selectedDate);
    handleChange(date, "birthday");
  };

  //useContext stuff
  const { UserData, setUserData } = useUserData()!;

  const handleChange = (text: any, name: string): void => {
    // console.log(name);
    setUserData({
      ...UserData,
      dogProfile: {
        ...UserData.dogProfile,
        [name]: text,
      }
    });
  };

  useEffect(() => {
    handleChange(gender, "gender");
  }, [gender]);

  function uploadInfo() {
    fetch("http://localhost:8000/auth/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    })
      .then((response) => {return Promise.all([response.json(), response.status])})
      .then(([data,status]) => {
        if (status >= 200 && status < 300)
        {
          console.log(data);
          save("access_token",data.access);
          save("refresh_token",data.refresh);
          navigation.navigate("WalkPageNavigator");
        }
        else
        {
          console.log(data);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <KeyboardAvoidingView
      style={styles.creamContainer}
      behavior={"position"}
      enabled={shift}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Let's get some Info!</Text>
      </View>
      <View style={styles.separator} />
      <View>
        <TextInput
          style={styles.inputField}
          label="Breed"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          value={UserData.dogProfile.breed}
          onFocus={() => setShift(false)}
          onChangeText={(text) => handleChange(text, "breed")}
        />
          <DropDownPicker
            style={[styles.inputField, {marginVertical: 12}]}
            dropDownContainerStyle={stylesheet.dropdown}
            placeholder="Gender"
            placeholderStyle={{
              color: "grey",
            }}
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            props={{
              activeOpacity: 1,
            }}
          />
        <View style={stylesheet.birthdayContainer}>
          <View style={stylesheet.dateTimeContainer}>
            <DateTimePicker
              style={stylesheet.dateTime}
              testID="dateTimePicker"
              value={date}
              mode="date"
              maximumDate={new Date()}
              is24Hour={true}
              onChange={onChange}
            />
          </View>
          <View style={stylesheet.birthdayDisplayContainer}>
              <Text style={[stylesheet.birthdayText, { color: birthday ? "black" : "grey" }]}>{birthday ? birthday : "Birthday"}</Text>
              <Icon style={stylesheet.icon} name="calendar-today" size={20} color="#000"/>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            uploadInfo();
          }}
          labelStyle={styles.buttonLabel}
          uppercase={false}
          disabled={
            UserData.dogProfile.gender === "" 
          }
        >
          Continue
        </Button>
    </KeyboardAvoidingView>
  );
};

const stylesheet = StyleSheet.create({
  dropdown: {
    width: Dimensions.get("window").width - 64,
    height: 48 * 3,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  birthdayDisplayContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
  },
  birthdayContainer: {
    width: Dimensions.get("window").width - 64,
    height: 48,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "rgba(90, 67, 62, 1)",
    left: 32,
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginVertical: 12,
  },
  dateTimeContainer: {
    position: "absolute",
    opacity: 0,
    zIndex: 1,
    width: boxWidth,
    height: boxHeight,
    borderWidth: 1,
  },
  dateTime: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
  },
  icon: {
    padding: 10, 
    zIndex: 0,
  },
  birthdayText: {
    flex: 4, 
    left: 12,
  },
});

export default GetInfoScreen;