import React, { useState } from "react";
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
import styles from "../stylesheets/globalStyles";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

import { useUserData, UserDataType } from "../hooks/userContext";

import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  "GetInfo"
>;

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
const boxWidth = (312 * phoneWidth) / 407;


const GetInfoScreen = ({ navigation }: Props) => {

  const [breed, setBreed] = useState("");
  
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [shift, setShift] = useState(false);
  const [date, setDate] =useState(new Date());
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Unspecified', value: 'Unspecified'}
  ]);
  
  const onChange = (event, selectedDate) => {
    //console.log(selectedDate);
    var date = new Date(selectedDate);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();
    const fullDate = month + "-" + dt + "-" + year;
    console.log(fullDate) 
   // console.log(date)
    setShow(false);
    setBirthday(fullDate);
    setDate(selectedDate);
  };


  //useContext stuff
  const { UserData, setUserData } = useUserData()!;

  const handleChange = (text: string, name: string): void => {
      // console.log(name);
      setUserData({
        ...UserData,
        [name]: text
      });
  };

  function uploadInfo() {
    console.log(date);
  }

  return (
    <KeyboardAvoidingView
      style={stylesheet.backGround}
      behavior={"position"}
      enabled={shift}
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
          value={UserData.dogBreed}
          onFocus={() => setShift(false)}
          onChangeText={text => handleChange(text, "dogBreed")}
        />
      </View>

      
     <View style={stylesheet._Text_Field_Gender}>
        <TextInput
          style={stylesheet._Input_Box_Style}
          label="Gender"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          value={UserData.dogGender}
          onFocus={() => setShift(false)}
          onChangeText={text => handleChange(text, "dogGender")}
        />
      </View>
        <View style={open? stylesheet.drop_down_picker_view: stylesheet.drop_down_picker_view_hide}>

        
        <DropDownPicker
            style = {[{borderWidth: 0, width: phoneWidth* 0.77, height: phoneHeight * 0, }, open? {opacity: 0}:{opacity: 0}]}
            placeholder=""
            textStyle={{fontSize: -2}}
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            disableBorderRadius={true}
            props={{
              activeOpacity:0
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
          onFocus={() => {
            setShift(true);
            setShow(true)
          }}
          onChangeText={(text) => {
            setBirthday(text);
          }}
        />
      
        
    
    </View>  
    <View style ={stylesheet.pickerView}>
      <View style = {stylesheet.bdayText_container}>
      <Image 
            source={{uri: "https://img.icons8.com/ios/50/000000/calendar--v1.png"}} 
            style={{zIndex: 9, height: 30, width: 30, bottom: phoneHeight* 0.008}}
          />
      </View>
        <View style = {stylesheet.pickerStyle}>
        <DateTimePicker
            style={{width: 200, height: 35}}
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChange}
        />
        </View>
        
    </View>
      {/* <View style={stylesheet._Text_Field_Location}>
        <TextInput
          style={stylesheet._Input_Box_Style}
          label="Location"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          value={UserData.dogLocation}
          onFocus={() => setShift(true)}
          onChangeText={text => handleChange(text, "dogLocation")}
        />
      </View> */}    
      <View style={stylesheet._Rectangle_39}>
        <Button
          style={[styles.button]}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate("Summary")}
        >
          Continue
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const stylesheet = StyleSheet.create({
  bdayText_container:{
    top: phoneHeight*0.018,
    left: phoneWidth * 0.66,
    height: phoneHeight*0.035,
    width: phoneWidth* 0.25,
    alignItems: 'center',
  },
  bdayText:{
    fontFamily: "Montserrat",
    fontSize: 15,
  },
  picker:{
    height: 500,
    flex:1
  },
  pickerStyle:{
    opacity: 0,
    borderRadius: 5,
    borderWidth: 0.5,
    width: boxWidth,
    height: boxHeight,
    left: phoneWidth * 0.15,
    top: phoneHeight * 0.01
  },
  pickerView:{
    position: "absolute",
    alignSelf: "center",
    top: phoneHeight * 0.520,
    flexDirection: "row",
    height: phoneHeight * 0.075,
  },

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
    //borderWidth: 5,
    zIndex: 3,
  },
  drop_down_picker_view:{
    position: "absolute",
    alignSelf: "center",
    top: phoneHeight * 0.416,
    //borderWidth: 5,
    zIndex: 4,
  },
  drop_down_picker_view_hide:{
    position: "absolute",
    alignSelf: "center",
    top: phoneHeight * 0.416,
    //borderWidth: 5,
    zIndex: 4,
    opacity: 0,
  },
  _Text_Field_Birthday: {
    position: "absolute",
    alignSelf: "center",
    top: phoneHeight * 0.506,
    zIndex: -1
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
