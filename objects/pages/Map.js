import React, {useEffect, useState} from "react";
import {Text, View, PermissionsAndroid, Platform, Button} from "react-native";
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';
import {getLocales} from "expo-localization";
import {green100} from "react-native-paper/src/styles/themes/v2/colors";
import {styles} from "../components/style";
import AsyncStorage from '@react-native-async-storage/async-storage';


const callAsyncStorage = async () => {
    try {
        const favorites = await AsyncStorage.getItem('favorites');
    } catch (error) {
        console.error('Error storing favorites in AsyncStorage:', error);
    }
};


export default function ViewMap({i18n}, {lang}, theme) {


//Acquire device location data

    const [location,setLocation] = useState(null);

    useEffect(()=>{
        (async ()=>{
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted'){
                return
            }


            const loc = await Location.getCurrentPositionAsync()

            setLocation(loc);


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


    //avtivate marker location require function only once first loaded.
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

        return (
            <React.Fragment>
                <Text style={theme === 'l'? styles.title:styles.titleDark}>
                    {i18n.t("Welcome")}
                </Text>

                <MapView style={styles.map}
                         howsUserLocation
                         showsMyLocationButton
                         userInterfaceStyle={theme}
                         initialRegion={{

                             latitude: location.coords.latitude !== null ? location.coords.latitude
                             : 41.14961,
                             longitude: location.coords.longitude !== null ? location.coords.longitude: -8.61099,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                >
                    {location.coords.latitude &&( <Marker coordinate={
                        {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }
                    }
                    title={
                        i18n.t('myLocation')
                    }
                    pinColor={green100}
                    />)}
                    {
                        data.map((landMark) => (<Marker

                            coordinate={
                            {
                                latitude: landMark.latitude,
                                longitude: landMark.longitude
                            }

                        }
                            title={

                                i18n.locale === "nl"
                                        ? landMark.title.nl
                                        : i18n.locale === "pt"
                                            ? landMark.title.pt
                                            : landMark.title.en
                            }
                            description={

                                i18n.locale === "nl"
                                    ? landMark.description.nl
                                    : i18n.locale === "pt"
                                        ? landMark.description.pt
                                        : landMark.description.en
                            }

                        />))
                    }
                </MapView>
            </React.Fragment>)
    }
}
