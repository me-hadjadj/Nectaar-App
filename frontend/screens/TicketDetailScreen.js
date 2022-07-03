import { LogBox, ScrollView, TouchableOpacity } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Card } from "@rneui/themed";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// import pour permetre au user de revenir sur la page précédente
import {
  Ionicons,
  Feather,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

function TicketDetailScreen(props) {
  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  const { titre, date, emplacement, photos, places } = props.route.params;

  // pour que l'icône puisse faire défiler la suite du texte
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  let refBottom = useRef(null);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const toggleExpanded2 = () => {
    setCollapsed2(false);
    setTimeout(() => refBottom.current.scrollToEnd({ animated: true }), 300);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      ref={refBottom}
    >
      <Image
        style={styles.image}
        source={{ uri: photos }}
      ></Image>

      <Ionicons
        name="arrow-back-circle-sharp"
        size={40}
        color="#CABEA8"
        style={{ position: "absolute", top: 30, left: 10 }}
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.TitleStyle}>
        <Text style={styles.textTitle}>
          {titre}
        </Text>
      </View>


      <View style={{ justifyContent: "space-between" }}>
        <Card containerStyle={styles.card}>
          <Text style={styles.textTitleCard}>
            Récapitulatif de votre réservation
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 7,
              paddingLeft: 5,
            }}
          >
            <Feather name="map-pin" size={24} color="#A165A7" />
            <Text
              name="map-pin"
              size={24}
              color="#a165a7"
              style={styles.paragraph}
            >
              {emplacement}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 7,
              paddingLeft: 5,
            }}
          >
            <Entypo name="calendar" size={24} color="#A165A7" />
            <Text
              name="map-pin"
              size={24}
              color="#a165a7"
              style={styles.paragraph}
            >
              {new Date(date).toLocaleDateString()}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 7,
              paddingLeft: 5,
            }}
          >
            <FontAwesome name="ticket" size={24} color="#A165A7" />
            <Text
              name="map-pin"
              size={24}
              color="#a165a7"
              style={styles.paragraph}
            >
              {places} places réservées
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 7,
              paddingLeft: 5,
            }}
          >
            <MaterialIcons name="email" size={24} color="#A165A7" />
            <Text
              name="map-pin"
              size={24}
              color="#a165a7"
              style={styles.paragraph}
            >
              partager votre réservation
            </Text>
          </View>
        </Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {props.route.params.qrcode === true
            ? <Image
              source={require("../assets/qr-frame.png")}
              style={styles.qrCodeTicket} />
            : <></>}

        </View>
      </View>
    </ScrollView>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },

  image: {
    width: "100%",
    height: 230,
    marginBottom: 10,
  },


  TitleStyle: {
    alignItems: "center",
  },


  textTitle: {
    fontFamily: "BowlbyOne-Regular",
    fontSize: 21,
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
    color: "#3F3F85",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },

  card: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 30,
    borderColor: '#a165a7'
  },

  textTitleCard: {
    fontFamily: "BowlbyOne-Regular",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 40,
    color: "#3F3F85"
  },

  paragraph: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    paddingLeft: 20,
    paddingRight: 50,
    color: "#3F3F85",
  },

  // QR code des screen ticket détaillé //
  qrCodeTicket: {
    height: 450,
    resizeMode: "contain",
    // marginTop: 12,

  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    //elevation: 3,
    backgroundColor: "#a165a7",
  },


});

export default TicketDetailScreen;
