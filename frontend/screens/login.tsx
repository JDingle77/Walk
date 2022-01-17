import * as React from "react";
import { useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import TextInput from "../components/TextInput";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

const Login = ({ navigation }: RootTabScreenProps<"Login">) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  return (
      <View style={styles.container}>
        <View style={{ width: '80%'}}>
          <Text style={styles.title}>Sign in to your account</Text>
        </View>
        <TextInput
          label="Your email"
          enablesReturnKeyAutomatically
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          // style={styles.separator}
        />
        <TextInput
          label="Your password"
          enablesReturnKeyAutomatically
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          autoCapitalize="none"
          autoComplete="none"
          textContentType="password"
        />
        <Button
          color={"black"}
          onPress={() =>
            email.value != "" && password.value != ""
              ? navigation.navigate("Home")
              : Alert.alert("Please fill out both fields.")
          }
        >
          Sign In
        </Button>
      </View>
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
    marginBottom: 30
  },
  separator: {
    width: '80%'
  },
});

export default Login;
