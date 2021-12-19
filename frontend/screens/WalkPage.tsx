import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

export default function Map() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Hi, Ready to start today's walk?
            </Text>
            <View style={styles.mapSection}>
                <View style={styles.mapPreview}>
                </View>
            </View>
            
            <Text style={styles.subtitle}>
                Weekly Report
            </Text>
            <View style={styles.statsSection}>
                <View style={styles.stats1}>

                </View>
                <View style={styles.stats2}>

                </View>
            </View>
            <Text style={styles.subtitle}>
                Choose a Route
            </Text>
            <View style={styles.routesSection}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30, 
        backgroundColor: '#F5EFE0',
    },
    title: {
        fontSize: 24,
        paddingVertical: 20
    },
    mapSection: {
        flex: 2,
        paddingRight: 30,
    },
    mapPreview: {
        flex: 1,
        height: '30%',
        backgroundColor: '#989898',
        borderRadius: 30,
    },
    subtitle: {
        fontSize: 20,
        paddingVertical: 20,
    },
    statsSection: {
        paddingRight: 30,
        flex: 1,
        flexDirection: 'row',
    },
    stats1: {
        backgroundColor: 'skyblue',
        flex: 1,
        marginRight: 30,
        borderRadius: 7,
    },
    stats2: {
        backgroundColor: 'coral',
        flex: 1,
        borderRadius: 7,
    },
    routesSection: {
        backgroundColor: 'pink',
        flex: 2
    }
});