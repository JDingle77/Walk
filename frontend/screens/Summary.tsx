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
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUyNjcxMDczLCJpYXQiOjE2NTI1ODQ2NzMsImp0aSI6Ijc2ZmFlNDE4MDU1ZTQxMzNiMzU2OWYwNzI5YTljYWFiIiwidXNlcl9pZCI6ImUzZmQ2MjdmLTU4NmMtNGIxNS1iYjUzLWExNWI0OTdkMTIxZiJ9.4yfFGpMBt_r2N2xfc_8_Qch2yC4WExByzf_SlW1G5A0"
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
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
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUyNjcxMDczLCJpYXQiOjE2NTI1ODQ2NzMsImp0aSI6Ijc2ZmFlNDE4MDU1ZTQxMzNiMzU2OWYwNzI5YTljYWFiIiwidXNlcl9pZCI6ImUzZmQ2MjdmLTU4NmMtNGIxNS1iYjUzLWExNWI0OTdkMTIxZiJ9.4yfFGpMBt_r2N2xfc_8_Qch2yC4WExByzf_SlW1G5A0"
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getSummary();
    getSummaryStats();
    return () => {
      setSummaryData([]); // This worked for me
    };
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
