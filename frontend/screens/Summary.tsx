import React from 'react'
import { StyleSheet, Text, Image, SafeAreaView, FlatList } from 'react-native';
import { View } from '../components/Themed';
import { Button } from "react-native-paper";
import styles from '../stylesheets/globalStyles'

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

const localStyles = StyleSheet.create({
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
  speedBarContainer: {
    flex: 1, 
    flexDirection: 'row', 
    width: '80%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    // borderWidth: 1
  },
});