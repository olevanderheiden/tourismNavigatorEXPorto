//Creates items to show in listview based on api data
import {Pressable, Text, useColorScheme, View} from "react-native";
import React from "react";
import {styles} from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage';

const onPressItemFavorite = async (landMarkObject) => {
    try {

        const favorites = await AsyncStorage.getItem('favorites');
        let parsedFavorites = [];

        if (favorites !== null) {
            parsedFavorites = JSON.parse(favorites);
        }

        // Toggle the favorite status
        if (parsedFavorites.includes(landMarkObject.title.en)) {
            // Remove from favorites
            const updatedFavorites = parsedFavorites.filter((title) => title !== landMarkObject.title.en);
            setIsFavorite(false);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        } else {
            // Add to favorites
            parsedFavorites.push(landMarkObject.title.en);
            setIsFavorite(true);
            await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
        }
    } catch (error) {
        console.error('Error storing favorites in AsyncStorage:', error);
    }
};

 export function Item ({landMarkObject},i18n,setIsFavorite) {

     const theme = useColorScheme();
     console.log(`test2: ${theme}`);
     return(
     <View style={theme === 'dark'? styles.containerDark: styles.container}>
         <Pressable onPress={() => onPressItemFavorite(landMarkObject)}>
             <Text style={theme === 'dark' ? styles.itemStyleDark: styles.itemStyle}>
                 {
                     i18n.locale === "nl"
                         ? landMarkObject.title.nl
                         : i18n.locale === "pt"
                             ? landMarkObject.title.pt
                             : landMarkObject.title.en
                 }
             </Text>
         </Pressable>
     </View>
     )
 }