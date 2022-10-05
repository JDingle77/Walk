import React from "react";
import { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";

export default function MapViewer({ route, navigation }) {

  const {mapData, mapRegion} = route.params
  console.log(mapData)
  console.log("test")

  return (
    <View style={styles.container}>
      <MapView
      provider={PROVIDER_GOOGLE}
      style = {styles.map}
      region = {mapRegion}>

        <Polyline
          coordinates={mapData["coordinates"]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={6}
        />
        
        {mapData["poopIcon"].map((coord,i) => {
          let newCoord = {
            latitude: Number(coord.poop_latitude),
            longitude: Number(coord.poop_longitude),
          };
          return (
            <MapView.Marker coordinate={newCoord}>
              <Image
                source={require("../assets/images/poop-icon.png")}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
              />
            </MapView.Marker>
          );
        })}
        {mapData["peeIcon"].map((coord, i) => {
          //console.log(coord)
          let newCoord = {
            latitude: Number(coord.pee_latitude),
            longitude: Number(coord.pee_longitude),
          };
          return (
            <MapView.Marker coordinate={newCoord}>
              <Image
                source={require("../assets/images/pee-icon.png")}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
              />
            </MapView.Marker>
          );
        })}
        {mapData["drinkIcon"].map((coord,i) => {
          let newCoord = {
            latitude: Number(coord.drink_latitude),
            longitude: Number(coord.drink_longitude),
          };
          return (
            <MapView.Marker coordinate={newCoord}>
              <Image
                source={require("../assets/images/drink-icon.png")}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
              />
            </MapView.Marker>
          );
        })}
        {mapData["interactionIcon"].map((coord, i) => {
          let newCoord = {
            latitude: Number(coord.interaction_latitude),
            longitude: Number(coord.interaction_longitude),
          };
          return (
            <MapView.Marker coordinate={newCoord}>
              <Image
                source={require("../assets/images/interaction-icon.png")}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
              />
            </MapView.Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#F5EFE0",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  floatingButtons: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#5A433E",
    marginBottom: -40,
  },
  pawIconContainer: {
    position: "absolute",
    flex: 1,
    marginTop: Dimensions.get("window").height * 0.89 - 73,
    marginLeft: 32,
  },
  pawIcon: {
    width: 45,
    height: 45,
  },
  endWalkButton: {
    width: 110,
    height: 35,
    backgroundColor: "#E9B95E",
    borderRadius: 7,
    marginLeft: Dimensions.get("window").width - 145,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  endWalkTextContainer: {
    position: "absolute",
    flex: 1,
    marginLeft: Dimensions.get("window").width - 109,
    marginTop: Dimensions.get("window").height * 0.89 - 48,
  },
  endWalkText: {
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: "400",
  },
  text: {
    fontSize: 18,
    fontFamily: "Montserrat",
    fontWeight: "400",
  },
});
