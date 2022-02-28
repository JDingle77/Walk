import * as React from "react";
import { useState } from "react";
import { StyleSheet, Dimensions, Pressable } from "react-native";
import TextInput from "../components/TextInput";
import { Text, View } from "../components/Themed";

const DogProfile = () => {
    const [dogUsername, setDogUsername] = useState("");
    const [dogName, setDogName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [buttonSelected, setSelect] = useState(false)

    return (
        <View style={styles.container}>
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
                    value={dogUsername}
                    onChangeText={(text) => {
                        setDogUsername(text)
                    }}
                    textContentType="name"
                />
                <TextInput
                    label="Your dog's name"
                    style={styles.textInput}
                    value={dogName}
                    autoCapitalize="none"
                    autoComplete="none"
                    onChangeText={(text) => {
                        setDogName(text)
                    }}
                    textContentType="name"
                />
                <TextInput
                    label="Owner's username"
                    style={styles.textInput}
                    value={ownerName}
                    autoCapitalize="none"
                    autoComplete="none"
                    onChangeText={(text) => {
                        setOwnerName(text)
                    }}
                    textContentType="name"
                />
            </View>
            <View style={styles.separator}></View>
            <Pressable
                style={[styles.continueButton, { opacity: buttonSelected ? 0.8 : 1 }]}
                onPress={() => {
                    setSelect(!buttonSelected)
                }
                }
            >
                <Text style={styles.continueTitle}> Continue</Text>
            </Pressable>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
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
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#E9B95E',
    },
    continueTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        fontFamily: "montserrat",
    },
    separator: {
        marginBottom: 40,
    },
    textInput: {
        fontFamily: "montserrat",
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