import React from 'react';
import { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import { paperTheme, paperDarkTheme } from "../../core/theme";
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    ScrollView,
    Image,
    Dimensions,
    SafeAreaView,
} from 'react-native';

export default function WalkPage({ navigation }) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [mapRegion, setMapRegion] = useState(null)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await (await Location.getCurrentPositionAsync({})).coords;
            setMapRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            })
            setLocation(location);

        })();
    }, []);
    const userFirstName = 'Milo'

    const routes = [
        {
            name: 'Casual Stroll',
            geopoint: [0, 0]
        },
        {
            name: 'Recent Walk',
            geopoint: [23, 129]
        },
        {
            name: 'Popular Route',
            geopoint: [92, 133]
        },
    ]

    const trackButtonHandler = () => {
        navigation.navigate('WalkTracking');
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>
                    Hi {userFirstName}, {"\n"}
                    Ready to start today's walk?
                </Text>
                <View style={styles.mapSection}>
                    <MapView 
                        style={styles.mapPreview}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        initialRegion={mapRegion}
                    >
                        <Pressable style={styles.startTrackButton} onPress={trackButtonHandler} />
                    </ MapView>
                    <View pointerEvents='none' style={styles.startTrackIconContainer}>
                        <Image
                            style={styles.startTrackIcon}
                            source={require('../assets/images/white-location.png')}
                        />
                    </View>
                    <View pointerEvents='none' style={styles.startTrackTextContainer}>
                        <Text style={styles.startTrackText}>begin tracking</Text>
                    </View>
                </View>

                <Text style={styles.subtitle}>
                    Favorites Around You
                </Text>
                <ScrollView horizontal={true}>
                    <View style={styles.favoritesItem}>
                        <Pressable style={styles.favoritesButton} onPress={() => {}} >
                            <Image
                                source={require('../assets/images/food-icon.png')}
                                style={{width: 27, height: 27}}
                            />
                        </Pressable>
                        <Text style={styles.favoritesText}>Starbucks</Text>
                    </View>
                    <View style={styles.favoritesItem}>
                        <Pressable style={styles.favoritesButton} onPress={() => {}} >
                            <Image
                                source={require('../assets/images/fun-icon.png')}
                                style={{width: 27, height: 27}}
                            />
                        </Pressable>
                        <Text style={styles.favoritesText}>Westfield</Text>
                    </View>
                    <View style={styles.favoritesItem}>
                        <Pressable style={styles.favoritesButton} onPress={() => {}} >
                            <Image
                                source={require('../assets/images/shopping-icon.png')}
                                style={{width: 25, height: 27}}
                            />
                        </Pressable>
                        <Text style={styles.favoritesText}>Petco</Text>
                    </View>
                    <View style={styles.favoritesItem}>
                        <Pressable style={styles.favoritesButton} onPress={() => {}} >
                            <Image
                                source={require('../assets/images/park-icon.png')}
                                style={{width: 23, height: 27}}
                            />
                        </Pressable>
                        <Text style={styles.favoritesText}>Botanical Park</Text>
                    </View>

                </ScrollView>
                
                <Text style={styles.subtitle}>
                    Weekly Report
                </Text>
                <View style={styles.statsSection}>
                    <View style={[styles.statsCards, styles.stats1]}>
                        <Text style={styles.statsCaption}>
                            Average Distance
                        </Text>
                        <Text style={styles.averageNum}>
                            4.82 in
                        </Text>
                        <View style={styles.flexRowStats}>
                            <Image
                                style={styles.tinyIcon}
                                source={require('../assets/images/stats-up.png')}
                            />
                            <Text style={styles.greenText}>
                                5.3%
                            </Text>
                        </View>
                    </View>
                    <View style={styles.statsCards}>
                        <Text style={styles.statsCaption}>
                            Average Time
                        </Text>
                        <Text style={styles.averageNum}>
                            1  <Text style={styles.smallText}>hour  </Text>22  <Text style={styles.smallText}>minutes</Text>
                        </Text>
                        <View style={styles.flexRowStats}>
                            <Image
                                style={styles.tinyIcon}
                                source={require('../assets/images/stats-down.png')}
                            />
                            <Text style={styles.redText}>
                                10.3%
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#F5EFE0',
    },
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#F5EFE0',
    },
    title: {
        fontSize: 24,
        fontFamily: "braveold",
        paddingVertical: 20,
    },
    mapSection: {
        flex: 2,
    },
    mapPreview: {
        flex: 1,
        height: 200,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startTrackButton: {
        position: 'absolute',
        height: 30,
        width: 150,
        borderRadius: 6,
        backgroundColor: '#2F80ED',
        zIndex: 1,
    },
    startTrackIconContainer: {
        position: 'absolute',
        zIndex: 2,
        marginLeft: 100,
        marginTop: 90,
    },
    startTrackIcon: {
        height: 21,
        width: 14,
    },
    startTrackTextContainer: {
        position: 'absolute',
        flex: 1,
        zIndex: 2,
        marginTop: 91,
        marginLeft: 127,
    },
    startTrackText: {
        height: 30,
        width: 100,
        color: 'white',
    },
    favoritesItem: {
        width: 80,
        alignItems: 'center',
    },
    favoritesButton: {
        // sizing
        height: 55,
        width: 55,
        backgroundColor: 'white',
        borderRadius: 50,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // shadowing
        shadowColor: 'black',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    favoritesText: {
        textAlign: 'center',
    },

    flexRowStats: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    subtitle: {
        fontSize: 24,
        fontFamily: "braveold",
        paddingVertical: 20,
    },
    statsSection: {
        height: 100,
        flex: 1,
        flexDirection: 'row',
    },
    statsCards: {
        borderRadius: 7,
        flex: 1,
        backgroundColor: '#FBF9F3',
        padding: 10,
    },
    stats1: {
        marginRight: 20,
    },
    statsCaption: {
        fontSize: 12,
    },
    averageNum: {
        fontSize: 20,
        fontFamily: "braveold",
        margin: 3
    },
    smallText: {
        fontSize: 12
    },
    tinyIcon: {
        width: 30,
        height: 30
    },
    greenText: {
        color: '#48BB78'
    },
    redText: {
        color: '#F56565'
    },



});