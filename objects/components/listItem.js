//Creates items to show in listview based on api data
import {Pressable, Text, View} from "react-native";
import React from "react";
import {styles} from "./style";

 export function Item ({landMarkObject},i18n) {
     return(
     <View style={styles.container}>
         <Pressable onPress={() => addToFavorites(landMarkObject)}>
             <Text style={styles.itemStyle}>
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