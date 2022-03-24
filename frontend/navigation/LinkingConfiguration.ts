/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Login: {
        screens: {
          LoginScreen: "login",
        },
      },
      Create: {
        screens: {
          CreateScreen: "create",
        },
      },
      DogProfile: {
        screens: {
          DogProfile: "DogProfile",
        },
      },
      Home: {
        screens: {
          HomeScreen: "home",
        },
      },
      WalkPageNavigator: {
        screens: {
          WalkScreen: "walkpagenavigator",
        },
      },
      GetInfo: {
        screens: {
          WalkScreen: "getinfo",
        }
      },
      Summary: {
        screens: {
          SummaryScreen: "Summary",
        },
      },
    },
  },
};

export default linking;
