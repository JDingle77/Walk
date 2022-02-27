import React from 'react'
import { StyleSheet, Text, Image } from 'react-native';
import { View } from '../components/Themed';
import { Button } from "react-native-paper";

export default function SummaryPage() {
  return (
    <View style={styles.container} >
      <View style={{ width: '100%' }}>
        <Text style={styles.title} >
          Summary Page
        </Text>
        <Image 
          style={styles.image}
          source={require('../assets/images/summary-image.png')} 
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}> 
        <Text style={styles.h1}>Nov 4 2021 - Casual Stroll</Text>
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
    alignItems: "center",
    justifyContent: "center",
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
    color: '#000000',
  },
});