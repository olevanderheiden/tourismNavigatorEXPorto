import React, {useEffect, useState} from "react";
import {Text, StyleSheet, View, PermissionsAndroid, Platform, Button } from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as location from 'expo-localization';
import {getLocales} from "expo-localization";




export default function ViewMap({i18n}) {

//Aquire device location data
    const [location,setLocation] = useState({});
    useEffect(()=>{
        (async ()=>{
            let {status} = await location.requestForegroundPermissionsAsync()
            if (status === 'granted'){
                console.log("permission granted!")
                return
            }
            else
            {
                console.log("no permission granted!")
            }
            const loc = await location.getCurrentPositionAsync()

            setLocation(JSON.parse(loc));

            console.log("location data: ",location)
        })()
    })

    //aquire marker locations from api
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const getLocations = async () => {
        try {
            const response = await fetch('https://stud.hosted.hr.nl/1034047/api2.json');
            const json = await response.json();
            setData(json['items']);
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };


    //avtivate marker location aquiëre funtion only once first loaded.
    useEffect(() => {
        getLocations();
    }, []);

//check if data set with markers is loaded if so proceed otherwise wait.
    if (!loaded) {
        return (
            <View>
                <Text>
                    {i18n.t("loading")}
                </Text>
            </View>)
    } else {
        // console.log(data)
        return (
            <React.Fragment>
                <Text style={styles.title}>
                    {i18n.t("Welcome")}
                </Text>

                <MapView style={styles.map}
                         howsUserLocation
                         showsMyLocationButton
                         initialRegion={{
                             latitude: 41.1496,
                             longitude: -8.6110,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                >
                    {
                        data.map((landMark) => (<Marker

                            coordinate={
                            {
                                latitude: landMark.latitude,
                                longitude: landMark.longitude
                            }

                        }
                            title={
                                landMark.title.nl
                            }
                            description={

                                landMark.description.nl
                            }
                        />))
                    }
                </MapView>
            </React.Fragment>)
    }
}


const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    safe: {
        flex: 1,
    },
    title: {
        textAlign: "center"
    }
});