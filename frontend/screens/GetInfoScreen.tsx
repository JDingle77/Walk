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
    { label: "Unspecified", value: "Unspecified" },
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
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        navigation.navigate("Home");
      })
      .catch((err) => console.error(err));
  }

  return (
    <View style={[styles.creamContainer, {flexDirection: "column", justifyContent: "center"}]}>
    <KeyboardAvoidingView
      style={stylesheet.backGround}
      behavior={"position"}
      enabled={shift}
    >
      <View style={styles.titleView}>
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
        {/* <View style={[{borderWidth: 1,}, styles.inputField]}>
          <TextInput
            // style={styles.inputField}
            style={stylesheet.gender}
            label="Gender"
            autoCapitalize="none"
            autoComplete="email" //??
            textContentType="emailAddress"
            value={gender}
            onFocus={() => setShift(false)}
          /> */}
          <DropDownPicker
            style={[styles.inputField, {marginVertical: 12}]}
            // style={[stylesheet.gender, {opacity: 0}]}
            dropDownContainerStyle={stylesheet.dropdown}
            placeholder="Gender"
            textStyle={{ color: !gender ? "grey" : "black" }}
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
        {/* </View> */}
          {/* <View style={[styles.inputField, {flex: 0}]}> */}
            {/* <TextInput
              style={styles.inputField}
              label="Birthday"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              value={birthday}
              onFocus={() => {
                setShift(true);
                setShow(true);
              }}
              onChangeText={(text) => {
                setBirthday(text);
              }}
            /> */}
            {/* <Icon style={{padding: 10}} name="calendar-today" size={20} color="#000"/> */}
          {/* </View> */}
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
          <View style={stylesheet.searchSection}>
              {/* <Image
                source={{
                  uri: "https://img.icons8.com/ios/50/000000/calendar--v1.png",
                }}
                style={{
                  zIndex: 9,
                  height: 30,
                  width: 30,
                  bottom: phoneHeight * 0.008,
                }}
              /> */}
              <Text style={{flex: 4, left: 12,}}>{birthday ? birthday : "Birthday"}</Text>
              {/* <View style={{flex: 1, height: "100%",}}> */}
              <Icon style={{padding: 10, zIndex: 0,}} name="calendar-today" size={20} color="#000"/>
              {/* </View> */}
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
          disabled={ //IDK why its not disabling
            UserData.dogProfile.breed === "" ||
            UserData.dogProfile.gender === "" ||
            UserData.dogProfile.birthday === null
          }
        >
          Continue
        </Button>
    </KeyboardAvoidingView>
    </View>
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
  // gender: {
  //   position: "absolute",
  //   width: "100%",
  //   height: 48,
  // },
  // input: {
  //   flex: 1,
  //   paddingTop: 10,
  //   paddingRight: 10,
  //   paddingBottom: 10,
  //   paddingLeft: 0,
  //   backgroundColor: '#fff',
  //   color: '#424242',
  // },
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 48,
    // width: Dimensions.get("window").width - 64,
    // height: 48,
    // borderRadius: 5,
    // borderWidth: 0.5,
    // borderColor: "rgba(90, 67, 62, 1)",
    // left: 32,
    // backgroundColor: "rgba(255, 255, 255, 1)",

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
  // bdayText_container: {
  //   top: phoneHeight * 0.018,
  //   left: phoneWidth * 0.66,
  //   height: phoneHeight * 0.035,
  //   width: phoneWidth * 0.25,
  //   alignItems: "center",
  // },
  // bdayText: {
  //   fontFamily: "Montserrat",
  //   fontSize: 15,
  // },
  // picker: {
  //   height: 500,
  //   flex: 1,
  // },
  // pickerStyle: {
  //   opacity: 1,
  //   borderRadius: 5,
  //   borderWidth: 0.5,
  //   width: boxWidth,
  //   height: boxHeight,
  // },

  backGround: {
    flex: 1,
    backgroundColor: "rgba(245, 239, 224, 1)",
    flexDirection: "column", 
    justifyContent: "center"
  },
  // textView: {
  //   marginTop: phoneHeight * 0.07,
  // },
  // titleText: {
  //   fontFamily: "braveold",
  //   fontSize: 50,
  //   left: phoneWidth * 0.115,
  // },
  //_Text_Field_##### position the input box relative to the screen
  // _Text_Field_Breed: {
  //   position: "absolute",
  //   alignSelf: "center",
  //   top: phoneHeight * 0.306,
  // },
  // _Text_Field_Gender: {
  //   position: "absolute",
  //   alignSelf: "center",
  //   top: phoneHeight * 0.406,
  //   //borderWidth: 5,
  //   zIndex: 3,
  // },
  // drop_down_picker_view: {
  //   position: "absolute",
  //   alignSelf: "center",
  //   top: phoneHeight * 0.416,
  //   //borderWidth: 5,
  //   zIndex: 4,
  // },
  // drop_down_picker_view_hide: {
  //   position: "absolute",
  //   alignSelf: "center",
  //   top: phoneHeight * 0.416,
  //   //borderWidth: 5,
  //   zIndex: 4,
  //   opacity: 0,
  // },
  // _Text_Field_Birthday: {
  //   position: "absolute",
  //   alignSelf: "center",
  //   top: phoneHeight * 0.506,
  //   zIndex: -1,
  // },
  // _Text_Field_Location: {
  //   position: "absolute",
  //   alignSelf: "center",
  //   top: phoneHeight * 0.606,
  // },
  //Inputbox style
  // _Input_Box_Style: {
  //   fontFamily: "Montserrat",
  //   borderRadius: 5,
  //   borderWidth: 0.5,
  //   borderStyle: "solid",
  //   borderColor: "rgba(90, 67, 62, 1)",
  //   width: boxWidth,
  //   height: boxHeight,
  //   transform: [{ translateX: 0 }, { translateY: 0 }, { rotate: "0deg" }],
  //   backgroundColor: "rgba(255, 255, 255, 1)",
  // },
  //button style
  // _Rectangle_39: {
  //   position: "absolute",
  //   width: 299,
  //   height: 56,
  //   right: "auto",
  //   top: phoneHeight * 0.756,
  //   alignContent: "center",
  //   justifyContent: "center",
  //   alignSelf: "center",
  // },
  // buttonContainer: {
  //   borderWidth: 10,
  // },
});

export default GetInfoScreen;
