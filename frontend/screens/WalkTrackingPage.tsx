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
import { LocationSubscriber } from 'expo-location/build/LocationSubscribers';

type LatLng = {
    latitude: Number,
    longitude: Number,
  }

export default function WalkTracking({ navigation, client }) {
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
    const watchLocationRef = useRef(null);


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

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                region={mapRegion}
            >
                <Polyline
                    // coordinates={[
                    //     { latitude: 37.32634816, longitude: 37.32634816 },
                    //     { latitude: 37.32632152, longitude: 37.32632152 },
                    //     { latitude: 37.32629461, longitude: 37.32629461 },
                    //     { latitude: 37.3262638, longitude: 37.3262638 },
                    //     { latitude: 37.32623015, longitude: 37.32623015 },
                    //     { latitude: 37.3261991, longitude: 37.3261991 }
                    // ]}
                    coordinates={coordinatesList}
                    strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                    strokeWidth={6}
                />
                {/* <View style={styles.floatingButtons}>
                    <TouchableOpacity onPress={toggleActionListVisible} style={styles.actionButton}>
                        <Icon name="pets" color="white" size="35"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={styles.endWalkButton}>
                        <Text style={styles.text}>End Walk</Text>
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity onPress={toggleActionListVisible} style={styles.actionButton}>
                    {/* <Icon style={styles.pawIcon} name="pets" color="white" size="35"/> */}
                    <Image
                        style={styles.pawIcon}
                        source={require('../assets/images/white-paw.png')}
                    />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={endWalkHandler} style={styles.endWalkButton}>
                    <Text style={styles.endWalkText}>End Walk</Text>
                </TouchableOpacity>
            </MapView>
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
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.83,
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
    pawIcon: {
        position: 'absolute',
        width: 45,
        height: 45,
        marginTop: 13,
        marginLeft: 13,
        flex: 1,
        // marginTop: Dimensions.get('window').height * 0.73 - 73,
        // marginLeft: 32.5,
    },
    endWalkButton: {
        width: 100,
        height: 35,
        backgroundColor: '#E9B95E',
        borderRadius: 7,
        marginLeft: Dimensions.get('window').width - 140,
    },
    endWalkText: {
        position: 'absolute',
        flex: 1,
        marginTop: 8,
        marginLeft: 17,
        // marginLeft: Dimensions.get('window').width - 120,
        // marginTop: Dimensions.get('window').height * 0.73 - 50,
        fontSize: 16,
    },
    text: {
        fontSize: 16,
    }
});