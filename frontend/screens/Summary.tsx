import React from 'react'
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { View } from '../components/Themed';
import { Button, DataTable } from "react-native-paper";

export default function SummaryPage() {
  return (
    <SafeAreaView style={styles.container} >
      <View style={{height: '10%', width: '90%'}}>
        <Text style={styles.title} >
          Summary
        </Text>
      </View>
      <View style={{height: 300}}>
        <Image 
          style={styles.image}
          source={require('../assets/images/summary-image.png')} 
          resizeMode="contain"
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.h1}>Nov 4 2021 - Casual Stroll</Text>
      </View>
      <DataTable style={styles.table}>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>
            <Text style={styles.p}>Distance: </Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>
            <Text style={styles.p}>0.20 mi</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>
            <Text style={styles.p}>Time: </Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>
            <Text style={styles.p}>00:04:32</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>
            <Text style={styles.p}>Avg Speed (mph): </Text>
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>
            <Text style={styles.p}>2.65</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>
            <Text style={styles.p}>Pee Stops: </Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={styles.p}>5</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>
            <Text style={styles.p}>Poop Drops: </Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={styles.p}>3</Text>
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell>
            <Text style={styles.p}>Water Breaks: </Text>
          </DataTable.Cell>
          <DataTable.Cell>
            <Text style={styles.p}>2</Text>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <Button style={styles.button} labelStyle={styles.buttonLabel}> 
        Continue
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgb(243,239,226)',
  },
  title: {
    flex: 1,
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    fontFamily: "braveold",
  },
  image: {
    flex: 1,
    // width: '100%',
    // height: '30%',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  header: {
    height: 30,
    backgroundColor: 'rgb(252,251,247)',
    width: '100%',
    flex: 0.2,
  },
  table: {
    backgroundColor: 'rgb(252,251,247)',
    flex: 1, 
    flexDirection:'column', 
    width: '100%',
  },
  row: {
    borderBottomWidth: 0,
  },
  cell: {

  },
  h1: {
    fontSize: 24,
    fontFamily: 'Montserrat',
    fontWeight: "bold", //not doing anything
    color: "rgba(90, 67, 62, 1)",
    letterSpacing: 0.1,
    padding: 14,
  },
  p: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    color: "rgba(90, 67, 62, 1)",
    letterSpacing: 0.1,
  },
  button: {
    backgroundColor: 'rgb(226,186,108)',
    color: 'black',
    borderRadius: 28,
    width: 200,
  },
  buttonLabel: {
    fontFamily: "MontserratBold",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "rgba(90, 67, 62, 1)",
    letterSpacing: 0.1,
  },

});