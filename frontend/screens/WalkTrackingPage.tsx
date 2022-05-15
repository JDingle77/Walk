import React from 'react';
import { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    Image,
} from 'react-native';
import WalkModalPicker from '../components/WalkModalPicker';
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/dev";
import { Marker } from 'react-native-svg';

type LatLng = {
    latitude: Number,
    longitude: Number,
  }

export default function WalkTracking({ navigation }) {
    const [errorMsg, setErrorMsg] = useState(null);
    const [currLocation, setCurrLocation] = useState({latitude: 0.0, longitude: 0.0});
    const [mapRegion, setMapRegion] = useState(null);
    const [coordinatesList, setCoordinatesList] = useState<Array<LatLng>>([]);
    const [duration, setDuration] = useState(0);
    const [durationFields, setDurationFields] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        str: '00:00:00',
    })
    const [distance, setDistance] = useState(0.0);
    const [actionListVisible, setActionListVisible] = useState(false);
    const mountedRef = useRef(true);
    const [peeCoords, setPeeCoords] = useState<Array<LatLng>>([]);
    const [poopCoords, setPoopCoords] = useState<Array<LatLng>>([]);
    const [drinkCoords, setDrinkCoords] = useState<Array<LatLng>>([]);
    const [interactionCoords, setInteractionCoords] = useState<Array<LatLng>>([]);

    let [fontsLoaded] = useFonts({
        Montserrat: Montserrat_400Regular,
    });

    useEffect(() => {
        const getLocation = async () => {
            if (!mountedRef.current) return null;
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
            });

            setCurrLocation({
                latitude: location.latitude,
                longitude: location.longitude,
            });
        }
        
        getLocation();

        const watchLocation = onRegionChange()

        return () => {
            mountedRef.current = false;
        }
    }, []);

    useEffect(() => {
        if (coordinatesList.length == 1 && coordinatesList[0].latitude == 0.0 && coordinatesList[0].longitude == 0.0) {
            setCoordinatesList([]);
        }
        setCoordinatesList(prevList => [...prevList, {
            latitude: currLocation.latitude,
            longitude: currLocation.longitude,
        }]);
    }, [currLocation])

    useEffect(() => {
        const interval = setInterval(() => {
            const old_duration = duration;
            setDuration(duration + 1);
            updateDurationFields(old_duration);
        }, 1000);
        
        return () => {
            clearInterval(interval);
        }
    }, [duration])

    const updateDurationFields = (seconds: number) => {
        let new_seconds = (seconds % 60) + 1;
        let new_minutes = durationFields.minutes;
        let new_hours = durationFields.hours;
        
        if (new_seconds < 60) {
            setDurationFields((prev) => ({
                ...prev,
                seconds: new_seconds,
                str: timeToStr(new_hours, new_minutes, new_seconds),
            }));
        }
        else if (new_seconds == 60) {
            new_seconds = 0;
            new_minutes += 1;
            
            if (new_minutes < 60) {
                setDurationFields((prev) => ({
                    ...prev,
                    seconds: new_seconds,
                    minutes: new_minutes,
                    str: timeToStr(new_hours, new_minutes, new_seconds),
                }));
            }
            else if (new_minutes == 60) {
                new_minutes = 0;
                new_hours += 1;

                setDurationFields({
                    seconds: new_seconds,
                    minutes: new_minutes,
                    hours: new_hours,
                    str: timeToStr(new_hours, new_minutes, new_seconds),
                });
            }
        }
    }

    const timeToStr = (hour: number, min: number, sec: number) => {
        const str_hour = (hour <= 9 ? `0${hour}` : hour);
        const str_min = (min <= 9 ? `0${min}` : min);
        const str_sec = (sec <= 9 ? `0${sec}` : sec);
        return str_hour + ":" + str_min + ":" + str_sec;
    }

    const onRegionChange = async () => {
        const watchLocation = await Location.watchPositionAsync({
            accuracy: Location.Accuracy.Lowest,
            distanceInterval: 10,
            timeInterval: 5000,
        }, (loc) => {
            // update mapRegion
            setMapRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            })
            console.log({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });

            setCurrLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
            // update total distance
            
        });
        return watchLocation;
    }


    const toggleActionListVisible = () => {
        setActionListVisible(!actionListVisible);
    }

    const endWalkHandler = () => {
        navigation.pop();
    }

    const addPee = () => {
        setPeeCoords(prevList => [...prevList, {
            latitude: currLocation.latitude,
            longitude: currLocation.longitude,
        }]);
    }

    const addPoop = () => {
        setPoopCoords(prevList => [...prevList, {
            latitude: currLocation.latitude,
            longitude: currLocation.longitude,
        }]);
    }

    const addDrink = () => {
        setDrinkCoords(prevList => [...prevList, {
            latitude: currLocation.latitude,
            longitude: currLocation.longitude,
        }]);
    }

    const addInteraction = () => {
        setInteractionCoords(prevList => [...prevList, {
            latitude: currLocation.latitude,
            longitude: currLocation.longitude,
        }]);
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={mapRegion}
            >
                <Polyline
                    coordinates={coordinatesList}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={6}
                />
                {
                    poopCoords.map((coord, i) => {
                        return(
                            <MapView.Marker coordinate={coord}>
                                <Image
                                    source={require('../assets/images/poop-icon.png')}
                                    style={{width: 26, height: 28}}
                                    resizeMode="contain"
                                />
                            </MapView.Marker>
                        );
                    })
                }
                {
                    peeCoords.map((coord, i) => {
                        return(
                            <MapView.Marker coordinate={coord}>
                                <Image
                                    source={require('../assets/images/pee-icon.png')}
                                    style={{width: 26, height: 28}}
                                    resizeMode="contain"
                                />
                            </MapView.Marker>
                        );
                    })
                }
                {
                    drinkCoords.map((coord, i) => {
                        return(
                            <MapView.Marker coordinate={coord}>
                                <Image
                                    source={require('../assets/images/drink-icon.png')}
                                    style={{width: 26, height: 28}}
                                    resizeMode="contain"
                                />
                            </MapView.Marker>
                        );
                    })
                }
                {
                    interactionCoords.map((coord, i) => {
                        return(
                            <MapView.Marker coordinate={coord}>
                                <Image
                                    source={require('../assets/images/interaction-icon.png')}
                                    style={{width: 26, height: 28}}
                                    resizeMode="contain"
                                />
                            </MapView.Marker>
                        );
                    })
                }
                

                <TouchableOpacity onPress={toggleActionListVisible} style={styles.actionButton} />
                
                <TouchableOpacity onPress={endWalkHandler} style={styles.endWalkButton} />
                
            </MapView>
            <View pointerEvents='none' style={styles.pawIconContainer}>
                <Image
                    source={require('../assets/images/white-paw.png')}
                    style={styles.pawIcon}
                />
            </View>
            <View pointerEvents='none' style={styles.endWalkTextContainer}>
                <Text style={styles.endWalkText}>End Walk</Text>
            </View>
            
            
            
            <View style={styles.bottomBar}>
                <Text style={styles.text}>
                    {durationFields.str}
                </Text>
                <Text style={styles.text}>
                    0.0 mi
                </Text>
            </View>
            <Modal
                visible={actionListVisible}
                transparent={true}
            >
                <WalkModalPicker 
                    toggleActionListVisible={toggleActionListVisible}
                    addPee={addPee}
                    addPoop={addPoop}
                    addDrink={addDrink}
                    addInteraction={addInteraction}    
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#F5EFE0',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.89,
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    bottomBar: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.27,
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: '#F5EFE0',
        flexDirection: 'row',
    },
    floatingButtons: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    actionButton: {
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: '#5A433E',
        marginBottom: -40,
    },
    pawIconContainer: {
        position: 'absolute',
        flex: 1,
        marginTop: Dimensions.get('window').height * 0.89 - 73,
        marginLeft: 32,
    },
    pawIcon: {
        width: 45,
        height: 45,
    },
    endWalkButton: {
        width: 110,
        height: 35,
        backgroundColor: '#E9B95E',
        borderRadius: 7,
        marginLeft: Dimensions.get('window').width - 145,
    },
    endWalkTextContainer: {
        position: 'absolute',
        flex: 1,
        marginLeft: Dimensions.get('window').width - 109,
        marginTop: Dimensions.get('window').height * 0.89 - 48,
        
    },
    endWalkText: {
        fontSize: 16,
        fontFamily: "Montserrat",
        fontWeight: "400",
    },
    text: {
        fontSize: 18,
        fontFamily: "Montserrat",
        fontWeight: "400",
    }
});