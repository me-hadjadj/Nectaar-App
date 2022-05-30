import { LogBox, ScrollView, TouchableOpacity } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import React from "react";
import { StyleSheet, View, Text, Image, Animated } from "react-native";
import { Card } from "@rneui/themed";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

// import pour permetre au user de revenir sur la page précédente
import { Ionicons, AntDesign } from "@expo/vector-icons";

function TicketValidation(props) {
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
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={[
          styles.view,
          {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Ionicons
          name="chevron-back-circle"
          size={40}
          color="white"
          style={[styles.icone]}
        />

        <Text h4 style={[styles.text, {}]}>
          Votre ticket
        </Text>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Card
          title="Céline Dion à l'Accor Arena"
          style={{ marginBottom: "50" }}
        >
          {/*react-native-elements Card*/}
          <Image
            source={require("../assets/celine.png")}
            style={styles.image}
          ></Image>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 7,
              paddingLeft: 5,
            }}
          ></View>
        </Card>
        <Card
          containerStyle={{ alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              marginTop: 6,
              fontSize: 18,
            }}
          >
            Passez un excellent moment !{" "}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 7,
              paddingLeft: 5,
            }}
          ></View>
        </Card>
        <View
          style={{
            alignItems: "center",
            height: 300,
          }}
        >
          <AntDesign
            size={150}
            style={(styles.checklist, { marginTop: 30, color: "#a165a7" })}
            name="checkcircle"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },

  text: {
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "BowlbyOne-Regular",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
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

  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#a165a7",
  },

  icone: {
    paddingTop: 40,
    paddingBottom: 5,
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  textTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
  },

  imageCategorie: {
    width: "100%",
    height: 160,
    top: 10,
    marginBottom: 10,
  },
  textStyle: {
    marginLeft: 10,
    top: 10,
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
  },
  paragraph: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    paddingLeft: 20,
    paddingRight: 50,
  },
  paragraph2: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    paddingLeft: 20,
    paddingRight: 50,
    paddingBottom: 20,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 90,
  },
  textTitleCard: {
    fontFamily: "BowlbyOne-Regular",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 40,
  },
  qrCode: {
    resizeMode: "contain",
    marginTop: 12,
    height: 100,
    width: 110,
  },

  // QR code des screen ticket détaillé //
  qrCodeTicket: {
    resizeMode: "contain",
    // marginTop: 12,
    height: 450,
    width: 450,
  },

  view: {
    backgroundColor: "#F0810D",
    width: "100%",
  },
  hairline: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#C4C4C4",
    height: 4,
    width: 76,
    borderRadius: 20,
  },
  endPage: {
    marginBottom: 20,
  },

  image: {
    width: 300,
    height: 300,
  },

  checklist: {
    color: "#a165a7",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TicketValidation;
