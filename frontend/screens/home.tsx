import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';

const Home = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>This is the Home Page</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

  export default Home;