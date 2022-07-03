import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  LogBox,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import ModalLike from "../components/ModalLike";

import React, { Component } from "react";
import { useEffect, useState } from "react";
LogBox.ignoreLogs(["Warning: ..."]);
import { Card } from "react-native-paper";
import { connect } from "react-redux";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

function TicketsScreen(props) {
  useEffect(() => {
    if (!props.displayToken) {
      props.navigation.navigate("Login");
    } else {
      //Fonction qui va récupérer les évènements à venir au lancement du composant
      async function getReservationList() {
        var rawResponse = await fetch(
          "https://backend-nectaar-app.herokuapp.com/events/getReservationList",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${props.displayToken}`,
          }
        );
        var response = await rawResponse.json();

        //Filtrer sur les évènements à venir
        var futurreservation = response.user.reservation.filter((e) => {
          var eventDate = new Date(e.idEvents.dates);
          var today = new Date(Date.now());
          if (eventDate > today) {
            return true;
          }
        });
        futurreservation.sort((a, b) => a.idEvents.dates > b.idEvents.dates);
        setUserReservationList(futurreservation);
      }
      const updateReservationList = props.navigation.addListener("focus", () =>
        getReservationList()
      );
      return updateReservationList;
    }
  }, []);

  //Variable d'état qui va stocker les évènements de l'utilisateur
  const [userReservationList, setUserReservationList] = useState([]);

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

  var stateModalike;
  //Vérification du token pour afficher la Modal pour la notation
  if (props.displayToken) {
    stateModalike = <ModalLike />;
  }

  if (props.displayToken) {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text h4 style={styles.text}>
            Mes Tickets
          </Text>
          {stateModalike}
          <Text h4 style={styles.textTitle}>
            Vos prochains événements
          </Text>

          {userReservationList
            ? userReservationList.map((event, index) => {
                return (
                  <View key={index} style={styles.viewCategorie}>
                    <Image
                      style={styles.imageCategorie}
                      source={{ uri: event.idEvents.photos }}
                      PlaceholderContent={<ActivityIndicator />}
                    />

                    <Text //Forcer à une seule ligne avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                      style={styles.textStyle}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {event.idEvents.categorie}
                    </Text>
                    <TouchableOpacity //Rendre la Card Clickable
                      onPress={() =>
                        props.navigation.navigate("TicketDetail", {
                          photos: event.idEvents.photos,
                          titre: event.idEvents.titre,
                          emplacement: event.idEvents.emplacement,
                          date: event.idEvents.dates,
                          places: event.NumberOfPlacesTaken,
                          qrcode: true,
                        })
                      }
                    >
                      <Card style={styles.card}>
                        <View style={styles.view}>
                          <View>
                            <Image
                              style={styles.qrCode}
                              source={require("../assets/qr-frame.png")}
                              PlaceholderContent={<ActivityIndicator />}
                            />
                          </View>
                          <View>
                            <Text //Forcer à une seule ligne avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                              h4
                              style={styles.textTitleCard}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {event.idEvents.titre}
                            </Text>
                            <Text //Forcer à une seule ligne avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                              style={styles.paragraph}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {event.idEvents.emplacement}
                            </Text>
                            <Text //Forcer à une seule ligne avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                              style={styles.paragraph2}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {new Date(
                                event.idEvents.dates
                              ).toLocaleDateString()}
                            </Text>
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  </View>
                );
              })
            : undefined}

          <View // Séparateur entre les Cards
            style={styles.hairline}
          />

          <View // Laisser un espace en bas pour eviter que la dernière Card soit à cheval sur le menu du bas
            style={styles.endPage}
          />
        </ScrollView>
      </View>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  modal: {
    flex: 1,
  },
  text: {
    backgroundColor: "#CABEA8",
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
  textTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
  },
  viewCategorie: {
    flex: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  imageCategorie: {
    width: "100%",
    height: 160,
    top: 10,
    marginBottom: 20,
  },
  textStyleTitle: {
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
    marginTop: 10,
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
  view: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginLeft: 10,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyleButton: {
    fontFamily: "BowlbyOne-Regular",
    color: "black",
    fontSize: 22,
  },
  button: {
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginTop: 80,
    borderColor: "#000000",
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 8,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 1.68,

    elevation: 1,
  },
  buttonOpen: {
    backgroundColor: "#FFFFFF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 15,
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
});

function mapStateToProps(state) {
  return { displayToken: state.token };
}

export default connect(mapStateToProps, null)(TicketsScreen);
