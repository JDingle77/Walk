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
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzNDAyODgyLCJpYXQiOjE2NTI1ODQ2NzMsImp0aSI6IjVhNzA3NzkwYzhjNzRjZDY4NTk3ODU0MmUwYWY3OWI1IiwidXNlcl9pZCI6ImUzZmQ2MjdmLTU4NmMtNGIxNS1iYjUzLWExNWI0OTdkMTIxZiJ9.8CtpUuut9yk_zq_PSIc0vnzRzodRo5Pf9lyi7siE9oM"
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
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzNDAyNDA1LCJpYXQiOjE2NTMzMTYwMDUsImp0aSI6IjMxNWVmYTRmYTY5YjRlOGU5ZDQwMzdkODFjZjMzNThmIiwidXNlcl9pZCI6IjYzNDc1N2RhLTMxMTQtNGM2OS1hN2M2LTJiZjVjZmRhMGZjZiJ9.A-MdB1ZeWHIuLzd_YJTjvMJoziF_OzXQwPD3CWesQlo"
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
    // return () => {
    //   setSummaryData([]); // This worked for me
    // };
  }, []);

  return (
    <SafeAreaView style={styles.container} >
      <View style={localStyles.topContainer}>
        <View style={styles.titleView}>
          <Text style={styles.h3} >
            Summary
          </Text>
        </View>
        <View style={localStyles.summaryImage}>
          <Image
            style={styles.image}
            source={require('../assets/images/summary-image.png')}
            resizeMode="contain"
          />
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

      <Button 
        style={styles.button} 
        labelStyle={styles.buttonLabel} 
        uppercase={false}
        onPress={() => getSummaryStats}>
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
