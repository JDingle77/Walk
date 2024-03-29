import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Image, SafeAreaView, FlatList, View, ListRenderItem } from "react-native";
import { Button } from "react-native-paper";
import styles from "../stylesheets/globalStyles";

import { getValueFor } from "../functions/SecureStore";
import { refreshAccess } from "../functions/RefreshHandler";
import { backend_URL } from "../components/ApiUrl";

import MapViewer from "./WalkMapViewer";

export default function SummaryPage({ route, navigation }) {

  const { mapData, mapRegion } = route.params
  //console.log(mapData)

  const [summaryData, setSummaryData] = useState<any[]>([]);

  async function getSummary() {
    var access_token = "";
    await getValueFor("access_token").then(
      (response) => (access_token = response!)
    );
    await fetch(backend_URL+"/maps/get_summary/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    })
      .then((response) => {
        return Promise.all([response.json(), response.status]);
      })
      .then(([data, status]) => {
        if (status >= 200 && status < 300) {
          // request successful
          setSummaryData(data.response)
          // console.log(data);
        } else if (status == 400) {
          // bad request
          console.log("Bad Request");
        } else if (status == 401) {
          // access token expired, get new access token and retry
          refreshAccess()
            .then(() => {
              console.log("Retry request");
            })
            .catch(() => {
              // refresh token expired, force user to login again
              // navigation.navigate("Login");
            });
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getSummary();
    // getSummaryStats();
    return () => {
      setSummaryData([]); // for memory leaks or smt
    };
  }, []);

  //useEffect(() => {
  //  console.log(summaryData);
  //}, [summaryData]);

  return (
    <SafeAreaView style={styles.container} >
      <View style={localStyles.topContainer}>
        <View style={styles.titleView}>
          <Text style={styles.h3} >
            Summary
          </Text>
        </View>
        <View style={localStyles.summaryImage}>

          {/* <Button 
            style={styles.button} 
            labelStyle={styles.buttonLabel}
            onPress={() => navigation.navigate("MapViewer", {mapData: mapData, mapRegion: mapRegion})}> 
            View Map
          </Button> */}
          <MapViewer route={route} navigation={navigation} />


        </View>
      </View>
      <View style={localStyles.bottomContainer}>
        <View style={styles.header}>
          <Text style={styles.h1}>Nov 4 2021 - Casual Stroll</Text>
        </View>

        <FlatList
          style={styles.list}
          data={summaryData}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.cell}>
                <Text style={styles.p}>{item.title}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={[styles.p,  {textAlign: 'right'}]}>{item.data}</Text>
              </View>
            </View>
          )}
        />

      <Button 
        style={styles.button} 
        mode="contained"
        labelStyle={styles.buttonLabel} 
        uppercase={false}
        onPress={() => navigation.navigate("WalkPage")}>
        Continue
      </Button>
      </View>

    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(244,238,225)",
    // borderWidth: 3,
    // borderColor: 'blue',
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgb(252,251,247)",
    // borderWidth: 3,
    // borderColor: "pink",
  },
  summaryImage: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 3,
    // borderColor: "pink",
  },
});
