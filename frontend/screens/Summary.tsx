import React from 'react'
import { StyleSheet, Text, Image, SafeAreaView, FlatList } from 'react-native';
import { View } from '../components/Themed';
import { Button } from "react-native-paper";

export default function SummaryPage() {
  const recipes = [ //test data; get data later
    {
        id: 0,
        title: 'Distance',
        cook_time: '0.20 mi',
    },
    {
        id: 1,
        title: 'Time',
        cook_time: '00:04:32',
    },
    {
        id: 2,
        title: 'Avg Speed (mph)',
        cook_time: '2.65',
    },
    {
        id: 3,
        title: 'Pee Stops',
        cook_time: '5',
    },
    {
        id: 4,
        title: 'Poop Drops',
        cook_time: '3',
    },
    {
        id: 5,
        title: 'Water Breaks',
        cook_time: '2',
    }
  ];

  return (
    <SafeAreaView style={styles.container} >
      <View style={{height: '10%', width: '90%', borderWidth: 3, borderColor: 'green'}}>
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

      <FlatList
        style={{width:'100%', borderWidth: 3, borderColor: 'red'}}
        data={recipes}
        renderItem={(obj) => {
            return (
                <View style={{flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: 'orange'}}>
                  <View style={styles.cellLeft}>
                    <Text style={styles.p}>{obj.item.title}</Text>
                  </View>
                  <View style={styles.cellRight}>
                    <Text style={[styles.p,  {textAlign: 'right'}]}>{obj.item.cook_time}</Text>
                  </View>
                </View>
            );
        }}
        />
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
    borderWidth: 3,
    borderColor: 'blue',
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
  cellLeft: {
    width: '50%', 
    borderWidth: 1, 
    // borderColor: 'purple', //testing
  },
  cellRight: {
    width: '50%', 
    // borderWidth: 1, 
    // borderColor: 'pink', //testing
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