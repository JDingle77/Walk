import React from "react";
import { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Icon } from "react-native-elements";

import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Image,
} from "react-native";

export default function WalkPage({ navigation }) {
  const currenLocation = {
    latitude: 37.78,
    longitude: -112.43,
  };
  const userFirstName = "Milo";

  const routes = [
    {
      name: "Casual Stroll",
      geopoint: [0, 0],
    },
    {
      name: "Recent Walk",
      geopoint: [23, 129],
    },
    {
      name: "Popular Route",
      geopoint: [92, 133],
    },
  ];

  const trackButtonHandler = () => {
    navigation.navigate("WalkTracking");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Hi {userFirstName}, {"\n"}
        Ready to start today's walk?
      </Text>
      <View style={styles.mapSection}>
        <MapView
          style={styles.mapPreview}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
        >
          <View style={styles.startTrackButton}>
            <Pressable onPress={trackButtonHandler}>
              <View style={styles.flexRow}>
                <Icon name="location-pin" color="#5A433E" />
                <Text style={styles.startTrackText}>begin tracking</Text>
              </View>
            </Pressable>
          </View>
        </MapView>
      </View>

      <Text style={styles.subtitle}>Weekly Report</Text>
      <View style={styles.statsSection}>
        <View style={[styles.statsCards, styles.stats1]}>
          <Text style={styles.statsCaption}>Average Distance</Text>
          <Text style={styles.averageNum}>4.82 km</Text>
          <View style={styles.flexRow}>
            <Image
              style={styles.tinyIcon}
              source={require("../assets/images/stats-up.png")}
            />
            <Text style={styles.greenText}>5.3%</Text>
          </View>
        </View>
        <View style={styles.statsCards}>
          <Text style={styles.statsCaption}>Average Time</Text>
          <Text style={styles.averageNum}>
            1 <Text style={styles.smallText}>hour </Text>22{" "}
            <Text style={styles.smallText}>minutes</Text>
          </Text>
          <View style={styles.flexRow}>
            <Image
              style={styles.tinyIcon}
              source={require("../assets/images/stats-down.png")}
            />
            <Text style={styles.redText}>10.3%</Text>
          </View>
        </View>
      </View>
      <Text style={styles.subtitle}>Choose a Route</Text>
      <ScrollView style={styles.routesSection} horizontal={true}>
        <Pressable onPress={trackButtonHandler} style={styles.routesCards}>
          <MapView
            style={styles.routesMap}
            provider={PROVIDER_GOOGLE}
            scrollEnabled={false}
          />
          <View style={styles.routeInfo}>
            <Text>Casual Stroll</Text>
          </View>
          <View style={styles.routeStats}>
            <Text>2.70 km</Text>
            <Text>0:32:34 time to complete</Text>
          </View>
        </Pressable>
        <Pressable onPress={trackButtonHandler} style={styles.routesCards}>
          <MapView style={styles.routesMap} provider={PROVIDER_GOOGLE} />
          <View style={styles.routeInfo}>
            <Text>Casual Stroll</Text>
          </View>
          <View style={styles.routeStats}>
            <Text>2.70 km</Text>
            <Text>0:32:34 time to complete</Text>
          </View>
        </Pressable>
        <Pressable onPress={trackButtonHandler} style={styles.routesCards}>
          <MapView style={styles.routesMap} provider={PROVIDER_GOOGLE} />
          <View>
            <Text style={styles.routeTitle}>Casual Stroll</Text>
          </View>
          <View style={styles.routeStats}>
            <Text>2.70 km</Text>
            <Text>0:32:34 time to complete</Text>
          </View>
        </Pressable>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    backgroundColor: "#F5EFE0",
  },
  title: {
    fontSize: 24,
    fontFamily: "braveold",
    paddingVertical: 20,
  },
  mapSection: {
    flex: 2,
    paddingRight: 30,
  },
  mapPreview: {
    flex: 1,
    height: 200,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  startTrackButton: {
    height: 30,
    width: 150,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#5A433E",
    backgroundColor: "white",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  startTrackText: {
    color: "#5A433E",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "braveold",
    paddingVertical: 20,
  },
  statsSection: {
    paddingRight: 30,
    height: 100,
    flex: 1,
    flexDirection: "row",
  },
  statsCards: {
    borderRadius: 7,
    flex: 1,
    borderWidth: 1,
    borderColor: "#5A433E",
    backgroundColor: "#FBF9F3",
    padding: 10,
  },
  stats1: {
    marginRight: 20,
  },
  statsCaption: {
    fontSize: 12,
  },
  averageNum: {
    fontSize: 20,
    fontFamily: "braveold",
    margin: 3,
  },
  smallText: {
    fontSize: 12,
  },
  tinyIcon: {
    width: 30,
    height: 30,
  },
  greenText: {
    color: "#48BB78",
  },
  redText: {
    color: "#F56565",
  },
  routesSection: {
    flex: 2,
    flexDirection: "row",
  },
  routesCards: {
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.16,
    shadowRadius: 5,
    width: 250,
    height: 230,
    marginRight: 20,
  },
  routesMap: {
    flex: 1,
    borderRadius: 30,
  },
  routeTitle: {
    fontSize: 16,
  },
  routeSubtitle: {},
  routeStats: {},
});
