import React, { useState } from "react";
import styles from "../stylesheets/globalStyles";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

interface ThirdPartyLoginsProps {
  AuthType: string;
}

const ThirdPartyLogins = (props: ThirdPartyLoginsProps) => {
  return (
    <View style={stylesheet.logoContainer}>
      <View style={stylesheet.registerContainer}>
        <Text style={styles.p}>Or {props.AuthType} with</Text>
      </View>
      <View style={stylesheet.innerlogoBox}>
        <View style={stylesheet.logoCircle}>
          <Image
            style={stylesheet.logoImage}
            source={{ uri: imageUrl_google__1__1 }}
          />
        </View>
        <View style={stylesheet.logoCircle}>
          <Image
            style={stylesheet.logoImage}
            source={{ uri: imageUrl_facebook_app_symbol_1 }}
          />
        </View>
        <View style={stylesheet.logoCircle}>
          <Image
            style={stylesheet.logoImage}
            resizeMode="contain"
            source={{ uri: imageUrl_Apple_logo_black_3 }}
          />
        </View>
      </View>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  registerContainer: {
    marginLeft: (32 / 375) * Dimensions.get("window").width,
    marginRight: "auto",
  },
  logoCircle: {
    height: 49,
    width: 49,
    borderRadius: 1000,
    borderWidth: 2,
    borderColor: "rgba(90, 67, 62, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 7,
  },
  logoImage: {
    width: 31.096155166625977,
    height: 31.096155166625977,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    //borderWidth: 1,
  },
  innerlogoBox: {
    flexDirection: "row",
    marginRight: 30,
    //borderWidth: 1,
  },
});

const imageUrl_google__1__1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/806a62e1d2bb832c559e5b61722125b4";
const imageUrl_facebook_app_symbol_1 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/1be7591b0844bc8f203a34b768fb86f3";
const imageUrl_Apple_logo_black_3 =
  "https://sizze-figma-plugin-images-upload.s3.us-east-2.amazonaws.com/5644c57036f36ab6004217c806442a9e";

export default ThirdPartyLogins;
