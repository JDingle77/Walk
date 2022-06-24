import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Button } from "react-native-paper";
import {getValueFor} from "../functions/SecureStore";
import { refreshHandler } from "../functions/RefreshHandler";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: NavigationProp;
};

const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Home Page</Text>
      <Button
        onPress={() => getValueFor("access_token").then((response) => console.log(response))
        }>
          Hello World
      </Button>
      <Button onPress={async () => {
          let isExpired = await refreshHandler();
          if(isExpired) {
            navigation.navigate("Login")
      }}
      }>
          Test Refresh
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default Home;
