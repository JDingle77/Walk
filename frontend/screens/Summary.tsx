import React from 'react'
import { StyleSheet, Text, Image } from 'react-native';
import { View } from '../components/Themed';
import { Button, DataTable } from "react-native-paper";

export default function SummaryPage() {
  return (
    <View style={styles.datacontainer} >
      {/* <View style={{ width: '90%', backgroundColor: 'blue' }}>
        <Text style={styles.title} >
          Summary
        </Text>
        <Image 
          style={styles.image}
          source={require('../assets/images/summary-image.png')} 
          resizeMode="contain"
        />
      </View> */}
      <View style={styles.container}> 
        <Text style={{ backgroundColor: 'green'}}>Nov 4 2021 - Casual Stroll</Text>
        {/* <View style={styles.container}> */}
          <DataTable style={{flex: 1, backgroundColor: 'orange', width: '100%'}}>
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={styles.p}>Distance: </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={styles.p}>0.20 mi</Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        {/* </View> */}
      </View>
      <Button color={"black"} > 
        Continue
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
  },
  datacontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "braveold",
    marginBottom: 30,
  },
  image: {
    width: '100%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  h1: {
    fontSize: 30,
    fontFamily: 'Montserrat',
    fontWeight: '400', //not doing anything
    color: "rgba(90, 67, 62, 1)",
    letterSpacing: 0.1,
  },
  p: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: "rgba(90, 67, 62, 1)",
    letterSpacing: 0.1,
  }
});