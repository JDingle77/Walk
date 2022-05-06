import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Image, SafeAreaView, FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import styles from "../stylesheets/globalStyles";

export default function SummaryPage() {
  const [summaryData, setSummaryData] = useState([]);

  function getSummary() {
    fetch("http://localhost:8000/maps/get_summary/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxOTM0MTk1LCJpYXQiOjE2NTE0NTA2NDYsImp0aSI6ImRmZTIzNzEyOTgwZTQ2YTc4ODM2MzQ1Zjg4NDE0ZTk4IiwidXNlcl9pZCI6IjEwNDM3NDY0LTEyNGYtNDhjYy05OGZmLTE4ZGYzYmRhZmI2ZCJ9.R99egWC_f_Mn7Li-E_zcC_5j09e7Z7e4EX-n45aip6Y"
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setSummaryData(response.response)
      })
      .catch((err) => console.error(err));
  }

  function getSummaryStats() {
    fetch("http://localhost:8000/maps/get_summary_statistics/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxOTM0MTk1LCJpYXQiOjE2NTE0NTA2NDYsImp0aSI6ImRmZTIzNzEyOTgwZTQ2YTc4ODM2MzQ1Zjg4NDE0ZTk4IiwidXNlcl9pZCI6IjEwNDM3NDY0LTEyNGYtNDhjYy05OGZmLTE4ZGYzYmRhZmI2ZCJ9.R99egWC_f_Mn7Li-E_zcC_5j09e7Z7e4EX-n45aip6Y"
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getSummary()
  }, [summaryData]);

  return (
    <SafeAreaView style={styles.container} >
      <View style={localStyles.topContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title} >
            Summary
          </Text>
        </View>
        <View style={{height: '65%'}}>
          <Image
            style={styles.image}
            source={require('../assets/images/summary-image.png')}
            resizeMode="contain"
          />
        </View>
        <View style={localStyles.speedBarContainer}>
          <Text style={styles.p}>Slow</Text>
          <Image
            style={styles.image}
            source={require('../assets/images/speed-bar.png')}
            resizeMode="contain"
          />
          <Text style={styles.p}>Fast</Text>
        </View>
      </View>
      <View style={localStyles.bottomContainer}>
        <View style={styles.header}>
          <Text style={styles.h1}>Nov 4 2021 - Casual Stroll</Text>
        </View>

        <FlatList
          style={styles.list}
          data={summaryData}
          renderItem={(obj) => {
              return (
                  <View style={styles.row}>
                    <View style={styles.cell}>
                      <Text style={styles.p}>{obj.item.title}</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={[styles.p,  {textAlign: 'right'}]}>{obj.item.data}</Text>
                    </View>
                  </View>
              );
          }}
          />

      <Button style={styles.button} labelStyle={styles.buttonLabel} onPress={() => getSummaryStats}>
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
  speedBarContainer: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1
  },
});
