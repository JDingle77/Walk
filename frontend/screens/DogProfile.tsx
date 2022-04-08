import * as React from "react";
import { useState } from "react";
import { StyleSheet, Dimensions, Pressable, Image, ScrollView } from "react-native";
import TextInput from "../components/TextInput";
import { Text, View } from "../components/Themed";

import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

import { useUserData, UserDataType } from "../hooks/userContext";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Create"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const DogProfile = ({ navigation }: Props) => {
    //don't need these anymore
    const [dogUsername, setDogUsername] = useState("");
    const [dogName, setDogName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [buttonSelected, setSelect] = useState(false)

    //useContext stuff
    const { UserData, setUserData } = useUserData()!;

    const handleChange = (text: string, name: string): void => {
        // console.log(name);
        setUserData({
          ...UserData,
          [name]: text
        });
    };


    return (
        <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={{ height: Dimensions.get("window").height, backgroundColor: '#F5EFE0' }}
        >
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image style={styles.imageSize} source={require('../assets/images/dogProfile.png')} />
                </View>
                <View style={{ width: "90%" }}>
                    <Text style={styles.title}>Your Dog's</Text>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <View style={styles.separator}>
                </View>
                <View>
                    <TextInput
                        style={styles.textInput}
                        enablesReturnKeyAutomatically
                        label="Your dog's username"
                        autoCapitalize="none"
                        autoComplete="none"
                        value={UserData.dogUsername}
                        onChangeText={text => handleChange(text, "dogUsername")}
                        textContentType="name"
                    />
                    <TextInput
                        label="Your dog's name"
                        style={styles.textInput}
                        value={UserData.dogName}
                        autoCapitalize="none"
                        autoComplete="none"
                        onChangeText={text => handleChange(text, "dogName")}
                        textContentType="name"
                    />
                    <TextInput
                        label="Owner's username"
                        style={styles.textInput}
                        value={UserData.ownerName}
                        autoCapitalize="none"
                        autoComplete="none"
                        onChangeText={text => handleChange(text, "ownerName")}
                        textContentType="name"
                    />
                </View>
                <View style={styles.separator}></View>
                <Pressable
                    style={[styles.continueButton, { opacity: buttonSelected ? 0.8 : 1 }]}
                    onPress={() => navigation.navigate("Summary")}
                >
                    <Text style={styles.continueTitle}> Continue</Text>
                </Pressable>
            </View >
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    image: {
        alignSelf: 'flex-start',
        width: 0.4 * Dimensions.get('window').width,
        height: 0.4 * Dimensions.get('window').width,
        padding: 10,
    },
    imageSize: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "left",
        fontFamily: "braveold",
    },
    continueButton: {
        width: 0.8 * Dimensions.get('window').width,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 100,
        backgroundColor: '#E9B95E',
    },
    continueTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        fontFamily: "Montserrat",
    },
    separator: {
        marginBottom: 40,
    },
    textInput: {
        fontFamily: "Montserrat",
        width: 0.9 * Dimensions.get('window').width,
        borderRadius: 5,
        borderWidth: 0.5,
        borderStyle: "solid",
        borderColor: "rgba(90, 67, 62, 1)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        justifyContent: "center",
    },
});

export default DogProfile;