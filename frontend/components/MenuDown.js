import {
  StyleSheet,
  View,
  LogBox,
  Text,
} from "react-native";
import AppLoading from "expo-app-loading";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import React from "react";
LogBox.ignoreLogs(["Warning: ..."]);
import * as Font from "expo-font";
  
  export default function MenuDown() {

    //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
    
      return (
        <View>
        <View // Séparateur
        style={styles.hairline2}
      />
      <View // Séparateur
        style={styles.hairline}
      />
      <Text style={styles.text}>Tu veux profiter d’un mois gratuit ?</Text>
      <Text style={styles.paragraph}>
        Obtiens 1 mois d’abonnement offert lorsque ton ami(e) deviens membre
        de Nectaar. 🎁
      </Text>
    
        <View style={styles.viewCategorie}>
          <Fontisto
            name="whatsapp"
            style={{ marginLeft:5,marginRight: 15, marginTop: 30 }}
            size={24}
            color="white"
          />
          <FontAwesome5
            name="facebook-messenger"
            style={{ marginRight: 15, marginTop: 30 }}
            size={24}
            color="white"
          />
          <FontAwesome5
            name="twitter"
            style={{ marginRight: 15, marginTop: 30 }}
            size={24}
            color="white"
          />
          <FontAwesome5
            name="facebook"
            style={{ marginRight: 15, marginTop: 30 }}
            size={24}
            color="white"
          />
          <FontAwesome
            name="linkedin"
            style={{ marginRight: 15, marginTop: 30 }}
            size={24}
            color="white"
          />
          <Fontisto
            name="instagram"
            style={{ marginRight: 15, marginTop: 30 }}
            size={24}
            color="white"
          />
          <FontAwesome5
            name="link"
            style={{ marginRight: 15, marginTop: 30 }}
            size={24}
            color="white"
          />
        </View>
        </View>
      );
    
  }
  const styles = StyleSheet.create({
    text: {
      paddingTop: 10,
      paddingBottom: 10,
      fontFamily: "BowlbyOne-Regular",
      fontWeight: "bold",
      color: "white",
      fontSize: 25,
      marginTop: 0,
      textAlign: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
  
      elevation: 6,
    },
    viewCategorie: {
      flexDirection: "row",
      justifyContent:'space-between',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
  
      elevation: 11,
    },
    paragraph: {
      fontSize: 16,
      fontFamily: "Poppins-Regular",
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      color: "white",
      textAlign: "center",
    },
    hairline: {
      marginTop: 3,
  
      alignSelf: "center",
  
      backgroundColor: "#69687F",
      height: 1,
      width: 64,
      borderRadius: 20,
    },
    hairline2: {
      marginTop: 8,
  
      alignSelf: "center",
  
      backgroundColor: "#69687F",
      height: 1,
      width: 64,
      borderRadius: 20,
    },
  });
  
  
 
  
  
  