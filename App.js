import {StatusBar} from 'expo-status-bar';
import {Text, View, SafeAreaView, Platform, useColorScheme} from 'react-native';
import ViewMap from './objects/pages/Map';
import {getLocales, getCalendars} from "expo-localization";
import {I18n} from "i18n-js";
import {NavigationContainer} from "@react-navigation/native";
import MapAssets from "./objects/pages/Map";
import SettingsView from "./objects/pages/SettingsView";
import React, {useEffect, useState} from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Favorites from "./objects/pages/Favorites";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import nl from "./objects/locelisation/nl.json"
import en from "./objects/locelisation/en.json"
import pt from "./objects/locelisation/pt.json"
import {AsyncStorage} from 'react-native';
import {blue100, blue200, blue900} from "react-native-paper/src/styles/themes/v2/colors";
import ListView from "./objects/pages/ListView";
import {styles} from "./objects/components/style";



const Tab = createMaterialBottomTabNavigator();
export default function App() {
    const [theme, setTheme] = useState(useColorScheme());

    //Location prop
    const [location,setLocation] = useState({});


    const [lang, setlang] = useState(getLocales()[0].languageCode);



//localisation config
    const i18n = new I18n({
        ...nl,
        ...en,
        ...pt,
    });
    i18n.locale = lang;
    i18n.enableFallback = true;

    useEffect(() => {
        i18n.locale = lang;
    }, [lang]);

    return (
        <NavigationContainer>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: blue100,
                paddingTop: Platform.OS === 'android' ? 30 : 0,
                height: '100%'
            }}>
                <Tab.Navigator
                    initialRouteName="Home"
                    id='NavFooter'
                    activeColor="green"
                    inactiveColor='slategray'
                    barStyle={{backgroundColor: blue100}}
                >

                    <Tab.Screen
                        name="Home"
                        options={
                            {
                                labeled: false,
                                tabBarLabel: i18n.t('Home'),
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="home" color={color} size={26}/>
                                ),
                            }
                        }
                    >{
                        (props) => (<ViewMap i18n={i18n} location={location} setLocation={setLocation}/>)
                    }</Tab.Screen>

                    <Tab.Screen
                        name="List"
                        options={
                            {
                                labeled: false,
                                tabBarLabel: i18n.t('ListView'),
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26}/>
                                ),
                            }
                        }
                    >{
                        (props) => (<ListView i18n={i18n} location={location} setLocation={setLocation}/>)
                    }</Tab.Screen>


                    <Tab.Screen
                        name="Favorites"
                        options={
                            {
                                labeled: false,
                                tabBarLabel: i18n.t('Favorites'),
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="star" color={color} size={26}/>
                                ),
                            }
                        }
                    >{
                        (props) => (<Favorites i18n={i18n} location={location} setLocation={setLocation}/>)
                    }</Tab.Screen>


                    <Tab.Screen
                        name="Settings"
                        options={
                            {
                                labeled: false,
                                tabBarLabel: i18n.t('Settings'),
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="account-settings" color={color} size={26}/>
                                ),
                            }
                        }
                    >{
                        (props) => (<SettingsView i18n={i18n} lang = {lang} setLang = {setlang} />)
                    }</Tab.Screen>

                </Tab.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}
