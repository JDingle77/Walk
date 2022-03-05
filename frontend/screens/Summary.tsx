import React from 'react'
import { StyleSheet, Text, Image, SafeAreaView, FlatList } from 'react-native';
import { View } from '../components/Themed';
import { Button } from "react-native-paper";
import { pink100 } from 'react-native-paper/lib/typescript/styles/colors';

export default function SummaryPage() {
  const recipes = [ //test data; get data later
    {
        id: 0,
        title: 'Distance',
        data: '0.20 mi',
    },
    {
        id: 1,
        title: 'Time',
        data: '00:04:32',
    },
    {
        id: 2,
        title: 'Avg Speed (mph)',
        data: '2.65',
    },
    {
        id: 3,
        title: 'Pee Stops',
        data: '5',
    },
    {
        id: 4,
        title: 'Poop Drops',
        data: '3',
    },
    {
        id: 5,
        title: 'Water Breaks',
        data: '2',
    }
  ];

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.topContainer}>
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
        <View style={styles.speedBarContainer}>
          <Text style={styles.p}>Slow</Text>
          <Image 
            style={styles.image}
            source={require('../assets/images/speed-bar.png')} 
            resizeMode="contain"
          />
          <Text style={styles.p}>Fast</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.header}>
          <Text style={styles.h1}>Nov 4 2021 - Casual Stroll</Text>
        </View>

        <FlatList
          style={styles.list}
          data={recipes}
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

      <Button style={styles.button} labelStyle={styles.buttonLabel}> 
        Continue
      </Button>
      </View>
      
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgb(252,251,247)',
    // borderWidth: 3,
    // borderColor: 'blue',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(244,238,225)",
    // borderWidth: 3,
    // borderColor: 'blue',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgb(252,251,247)',
    // borderWidth: 3,
    // borderColor: "pink",
  },
  titleView: {
    flex: 1,
    width: '90%', 
    // borderWidth: 3, 
    // borderColor: 'green'
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
    // borderWidth: 1,
    // width: '100%',
    height: '30%',
    // marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  speedBarContainer: {
    flex: 1, 
    flexDirection: 'row', 
    width: '80%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    // borderWidth: 1
  },
  header: {
    height: 30,
    backgroundColor: 'rgb(252,251,247)',
    width: '100%',
    flex: 0.3,
  },
  list : {
    flex: 1,
    width:'100%', 
    // borderWidth: 3, 
    // borderColor: 'red'
  },
  row: {
    flex: 1, 
    flexDirection: 'row', 
    alignSelf: 'center',
    width: '95%',
    // borderWidth: 1, 
    // borderColor: 'orange',
  },
  cell: {
    width: '50%', 
    padding: 5,
    // borderWidth: 1, 
    backgroundColor: 'rgb(252,251,247)',
    // borderColor: 'purple', //testing
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
    alignSelf: 'center',
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