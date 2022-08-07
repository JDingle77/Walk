import React from "react";
import { useState, useEffect, useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import WalkModalPicker from "../components/WalkModalPicker";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/dev";
import { Marker } from "react-native-svg";
import { getValueFor } from "../functions/SecureStore";
import { refreshAccess } from "../functions/RefreshHandler";

type LatLng = {
  latitude: Number;
  longitude: Number;
};

type PeeLatLng = {
  pee_latitude: Number;
  pee_longitude: Number;
};

type PoopLatLng = {
  poop_latitude: Number;
  poop_longitude: Number;
};

type DrinkLatLng = {
  drink_latitude: Number;
  drink_longitude: Number;
};

type InteractionLatLng = {
  interaction_latitude: Number;
  interaction_longitude: Number;
};

export default function WalkTracking({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [currLocation, setCurrLocation] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  const [mapRegion, setMapRegion] = useState(null);
  const [coordinatesList, setCoordinatesList] = useState<Array<LatLng>>([]);
  const [duration, setDuration] = useState(0);
  const [durationFields, setDurationFields] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    str: "00:00:00",
  });
  const [distance, setDistance] = useState(0.0);
  const [actionListVisible, setActionListVisible] = useState(false);
  const mountedRef = useRef(true);
  const [peeCoords, setPeeCoords] = useState<Array<PeeLatLng>>([]);
  const [poopCoords, setPoopCoords] = useState<Array<PoopLatLng>>([]);
  const [drinkCoords, setDrinkCoords] = useState<Array<DrinkLatLng>>([]);
  const [interactionCoords, setInteractionCoords] = useState<
    Array<InteractionLatLng>
  >([]);

  //
  const [begin, setBegin] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  let [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
  });

  async function postRoutes(userRoute: {
    //defining what userRoute has to be since typescript
    route_name: string;
    coordinates: LatLng[];
    peeIcon: PeeLatLng[];
    poopIcon: PoopLatLng[];
    drinkIcon: DrinkLatLng[];
    interactionIcon: InteractionLatLng[];
    start_time: Date;
    end_time: Date;
  }) {
    // console.log("------------------");
    // console.log(userRoute);
    var access_token = "";
    await getValueFor("access_token").then(
      (response) => (access_token = response!)
    );
    await fetch("http://localhost:8000/maps/route/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify(userRoute),
    })
      .then((response) => {
        return Promise.all([response.json(), response.status]);
      })
      .then(([data, status]) => {
        if (status >= 200 && status < 300) {
          // request successful
          navigation.navigate("Summary");
          console.log(data);
        } else if (status == 400) {
          // bad request
          console.log("Bad Request");
        } else if (status == 401) {
          // access token expired, get new access token and retry
          refreshAccess()
            .then(() => {
              console.log("Retry request");
              postRoutes(userRoute);
            })
            .catch(() => {
              // refresh token expired, force user to login again
              navigation.navigate("Login");
            });
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const getLocation = async () => {
      if (!mountedRef.current) return null;
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
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
        latitude: parseFloat(location.latitude.toFixed(6)),
        longitude: parseFloat(location.longitude.toFixed(6)),
      });
    };

    getLocation();

    const watchLocation = onRegionChange();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (
      coordinatesList.length == 1 &&
      coordinatesList[0].latitude == 0.0 &&
      coordinatesList[0].longitude == 0.0
    ) {
      setCoordinatesList([]);
    }
    setCoordinatesList((prevList) => [
      ...prevList,
      {
        latitude: parseFloat(currLocation.latitude.toFixed(6)),
        longitude: parseFloat(currLocation.longitude.toFixed(6)),
      },
    ]);
  }, [currLocation]);

  useEffect(() => {
    //temp solution to get the start time
    if (begin === false) {
      let startDay = new Date();
      setStartTime(startDay);
      setBegin(true);
    }

    const interval = setInterval(() => {
      const old_duration = duration;
      setDuration(duration + 1);
      updateDurationFields(old_duration);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [duration]);

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
    } else if (new_seconds == 60) {
      new_seconds = 0;
      new_minutes += 1;

      if (new_minutes < 60) {
        setDurationFields((prev) => ({
          ...prev,
          seconds: new_seconds,
          minutes: new_minutes,
          str: timeToStr(new_hours, new_minutes, new_seconds),
        }));
      } else if (new_minutes == 60) {
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
  };

  const timeToStr = (hour: number, min: number, sec: number) => {
    const str_hour = hour <= 9 ? `0${hour}` : hour;
    const str_min = min <= 9 ? `0${min}` : min;
    const str_sec = sec <= 9 ? `0${sec}` : sec;
    return str_hour + ":" + str_min + ":" + str_sec;
  };

  const onRegionChange = async () => {
    const watchLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Lowest,
        distanceInterval: 10,
        timeInterval: 5000,
      },
      (loc) => {
        // update mapRegion
        setMapRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        // console.log({
        //     latitude: loc.coords.latitude,
        //     longitude: loc.coords.longitude,
        // });

        setCurrLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        // update total distance
      }
    );
    return watchLocation;
  };

  const toggleActionListVisible = () => {
    setActionListVisible(!actionListVisible);
  };

  const endWalkHandler = () => {
    let endDay = new Date();
    setEndTime(endDay);
    setBegin(false);
    // navigation.pop();
    
    const userRoute = {
      route_name: "test",
      coordinates: coordinatesList,
      peeIcon: peeCoords,
      poopIcon: poopCoords,
      drinkIcon: drinkCoords,
      interactionIcon: interactionCoords,
      start_time: startTime,
      end_time: endDay,
    };

    console.log(userRoute);
    postRoutes(userRoute);
  };

  const addPee = () => {
    setPeeCoords((prevList) => [
      ...prevList,
      {
        pee_latitude: parseFloat(currLocation.latitude.toFixed(6)),
        pee_longitude: parseFloat(currLocation.longitude.toFixed(6)),
      },
    ]);
  };

  const addPoop = () => {
    setPoopCoords((prevList) => [
      ...prevList,
      {
        poop_latitude: parseFloat(currLocation.latitude.toFixed(6)),
        poop_longitude: parseFloat(currLocation.longitude.toFixed(6)),
      },
    ]);
  };

  const addDrink = () => {
    setDrinkCoords((prevList) => [
      ...prevList,
      {
        drink_latitude: parseFloat(currLocation.latitude.toFixed(6)),
        drink_longitude: parseFloat(currLocation.longitude.toFixed(6)),
      },
    ]);
  };

  const addInteraction = () => {
    setInteractionCoords((prevList) => [
      ...prevList,
      {
        interaction_latitude: parseFloat(currLocation.latitude.toFixed(6)),
        interaction_longitude: parseFloat(currLocation.longitude.toFixed(6)),
      },
    ]);
  };

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
        {poopCoords.map((coord, i) => {
          let newCoord = {
            latitude: coord.poop_latitude,
            longitude: coord.poop_longitude,
          };
          return (
            <MapView.Marker coordinate={newCoord}>
              <Image
                source={require("../assets/images/poop-icon.png")}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
              />
            </MapView.Marker>
          );
        })}
        {peeCoords.map((coord, i) => {
          //console.log(coord)
          let newCoord = {
            latitude: coord.pee_latitude,
            longitude: coord.pee_longitude,
          };
          return (
            <MapView.Marker coordinate={newCoord}>
              <Image
                source={require("../assets/images/pee-icon.png")}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
              />
            </MapView.Marker>
          );
        })}
        {drinkCoords.map((coord, i) => {
          let newCoord = {
            latitude: coord.drink_latitude,
            longitude: coord.drink_longitude,
          };
          return (
            <MapView.Marker coordinate={newCoord}>
              <Image
                source={require("../assets/images/drink-icon.png")}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
              />
            </MapView.Marker>
          );
        })}
        {interactionCoords.map((coord, i) => {
          let newCoord = {
            latitude: coord.interaction_latitude,
            longitude: coord.interaction_longitude,
          };
          return (
            <MapView.Marker coordinate={newCoord}>
              <Image
                source={require("../assets/images/interaction-icon.png")}
                style={{ width: 26, height: 28 }}
                resizeMode="contain"
              />
            </MapView.Marker>
          );
        })}

        <TouchableOpacity
          onPress={toggleActionListVisible}
          style={styles.actionButton}
        />

        <TouchableOpacity
          onPress={endWalkHandler}
          style={styles.endWalkButton}
        />
      </MapView>
      <View pointerEvents="none" style={styles.pawIconContainer}>
        <Image
          source={require("../assets/images/white-paw.png")}
          style={styles.pawIcon}
        />
      </View>
      <View pointerEvents="none" style={styles.endWalkTextContainer}>
        <Text style={styles.endWalkText}>End Walk</Text>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.text}>{durationFields.str}</Text>
        <Text style={styles.text}>0.0 mi</Text>
      </View>
      <Modal visible={actionListVisible} transparent={true}>
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
    backgroundColor: "#F5EFE0",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.89,
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  bottomBar: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.27,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "#F5EFE0",
    flexDirection: "row",
  },
  floatingButtons: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 100,
    backgroundColor: "#5A433E",
    marginBottom: -40,
  },
  pawIconContainer: {
    position: "absolute",
    flex: 1,
    marginTop: Dimensions.get("window").height * 0.89 - 73,
    marginLeft: 32,
  },
  pawIcon: {
    width: 45,
    height: 45,
  },
  endWalkButton: {
    width: 110,
    height: 35,
    backgroundColor: "#E9B95E",
    borderRadius: 7,
    marginLeft: Dimensions.get("window").width - 145,
  },
  endWalkTextContainer: {
    position: "absolute",
    flex: 1,
    marginLeft: Dimensions.get("window").width - 109,
    marginTop: Dimensions.get("window").height * 0.89 - 48,
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
  },
});
