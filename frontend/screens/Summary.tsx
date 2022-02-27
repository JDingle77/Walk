import React from 'react'
import { StyleSheet, Text, Image } from 'react-native';
import { View } from '../components/Themed';

export default function SummaryPage() {
  return (
    <View style={styles.container} >
      <Text style={styles.title} >
        Summary Page
      </Text>
      <Image 
        source={require('../assets/images/summary-image.png')} 
      />
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});