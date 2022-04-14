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
                        {/* <View style={styles.startTrackButton}>
                            <Pressable style={styles.startTrackPressable} onPress={trackButtonHandler} >
                                <View style={styles.flexRowTrackButton}>
                                    <Icon style={styles.startTrackIcon} name='location-pin' color='#5A433E'/>
                                    <Text style={styles.startTrackText}>begin tracking</Text>
                                </View>
                            </Pressable>
                        </View> */}
                        <Pressable style={styles.startTrackButton} onPress={trackButtonHandler} >
                            {/* <View style={styles.flexRowTrackButton}>
                            </View> */}
                            <Icon style={styles.startTrackIcon} name='location-pin' color='#5A433E' />
                            <Image
                                style={styles.startTrackIcon}
                                source={require('../assets/images/black-location.png')}
                            />
                            <Text style={styles.startTrackText}>begin tracking</Text>
                        </Pressable>
                    </ MapView>
                </View>
                
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
                <Text style={styles.subtitle}>
                    Choose a Route
                </Text>
                <ScrollView style={styles.routesSection} horizontal={true}>
                    <Pressable onPress={trackButtonHandler} style={styles.routesCards}>
                        <MapView
                            style={styles.routesMap}
                            provider={PROVIDER_GOOGLE}
                            scrollEnabled={false}
                        />
                        <View style={styles.routeInfo}>
                        <Text>Casual Stroll</Text>
                        </View>
                        <View style={styles.routeStats}>
                            <Text>2.70 km</Text>
                            <Text>0:32:34 time to complete</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={trackButtonHandler} style={styles.routesCards}>
                        <MapView style={styles.routesMap} provider={PROVIDER_GOOGLE}/>
                        <View style={styles.routeInfo}>
                        <Text>Casual Stroll</Text>
                        </View>
                        <View style={styles.routeStats}>
                            <Text>2.70 km</Text>
                            <Text>0:32:34 time to complete</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={trackButtonHandler} style={styles.routesCards}>
                        <MapView style={styles.routesMap} provider={PROVIDER_GOOGLE}/>
                        <View>
                            <Text style={styles.routeTitle}>Casual Stroll</Text>
                        </View>
                        <View style={styles.routeStats}>
                            <Text>2.70 km</Text>
                            <Text>0:32:34 time to complete</Text>
                        </View>
                    </Pressable>
                </ScrollView>
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
        height: 30,
        width: 150,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#5A433E',
        backgroundColor: 'white',
    },
    // startTrackPressable: {
    //     flex: 1,
    //     position: 'relative'
    // },
    flexRowTrackButton: {
        height: 50,
        width: 150,
        position: 'absolute',
    },
    startTrackIcon: {
        position: 'absolute',
        height: 21,
        width: 14,
        marginRight: 5,
        marginLeft: 15,
        marginTop: 3,
        // marginTop: 90,
        // marginLeft: 105,
    },
    startTrackText: {
        position: 'absolute',
        height: 200,
        width: 300,
        color: '#5A433E',
        marginLeft: 35,
        marginTop: 3,
        // marginTop: 90,
        // marginLeft: 125,
    },
    flexRowStats: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "braveold",
        paddingVertical: 20,
    },
    statsSection: {
        paddingRight: 30,
        height: 100,
        flex: 1,
        flexDirection: 'row',
    },
    statsCards: {
        borderRadius: 7,
        flex: 1,
        borderWidth: 1,
        borderColor: '#5A433E',
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
    routesSection: {
        flex: 2,
        flexDirection: 'row',
    },
    routesCards: {
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.16,
        shadowRadius: 5,
        width: 250,
        height: 230,
        marginRight: 20,
    },
    routesMap: {
        flex: 1,
        borderRadius: 30,
    },
    routeTitle: {
        fontSize: 16
    },
    routeSubtitle: {

    },
    routeStats: {

    }
});