LogBox.ignoreLogs(["Warning: ..."]);
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  LogBox,
  Text,
  TouchableOpacity,
} from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreLogs(["expo-permissions ..."]);
import { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { connect } from "react-redux";

function MyPastReservations(props) {
  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  useEffect(() => {
    //Fonction qui va récupérer les évènements passés au lancement du composant
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

      //Filtrer sur les évènements passés
      var pastreservation = response.user.reservation.filter((e) => {
        var eventDate = new Date(e.idEvents.dates);
        var today = new Date(Date.now());
        if (eventDate < today) {
          return true;
        }
      });

      setUserReservationList(pastreservation);
    }
    getReservationList();
  }, []);

  //Variable d'état qui va stocker les évènements de l'utilisateur
  const [userReservationList, setUserReservationList] = useState([]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.text}>
        Réservations Passées
      </Text>

      <Text h4 style={styles.textTitle}>
        Vos réservations Passées
      </Text>
      <ScrollView>
        <View style={styles.viewCategorie}>
          {userReservationList
            ? userReservationList.map((event, index) => {
                return (
                  <TouchableOpacity //Rendre la Card Clickable
                    onPress={() =>
                      props.navigation.navigate("TicketDetail", {
                        photos: event.idEvents.photos,
                        titre: event.idEvents.titre,
                        emplacement: event.idEvents.emplacement,
                        date: event.idEvents.dates,
                        places: event.NumberOfPlacesTaken,
                        qrcode: false,
                      })
                    }
                  >
                    <Card key={index} style={styles.card}>
                      <View style={styles.viewImage}>
                        <View>
                          <Image
                            style={styles.imagePastResa}
                            source={{ uri: event.idEvents.photos }}
                            PlaceholderContent={<ActivityIndicator />}
                          />
                        </View>
                        <View>
                          <Text h4 style={styles.textTitleCard}>
                            {event.idEvents.titre}
                          </Text>
                          <Text //Forcer à deux lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                            style={styles.paragraph}
                            numberOfLines={3}
                            ellipsizeMode="tail"
                          >
                            {event.idEvents.description}
                          </Text>
                          <View style={styles.lastLignCard}>
                            {/* {starsColorGest(event.note)} */}
                            <View>
                              <Text
                                style={styles.paragraph2}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                Il y a{" "}
                                {Math.floor(
                                  (new Date(Date.now()) -
                                    new Date(event.idEvents.dates)) /
                                    86400000
                                )}{" "}
                                jours
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })
            : undefined}
        </View>

        <View style={styles.endPage} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
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
  lastLignCard: {
    flexDirection: "row",
    position: "absolute",
    bottom: -10,
  },
  lastLignStars: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingLeft: 20,
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
  paragraph: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 60,
  },
  paragraph2: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 80,
    color: "#0E0E66",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 160,
  },
  imagePastResa: {
    marginTop: 12,
    marginLeft: 22,
    marginRight: 22,
    height: 130,
    width: 100,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopStartRadius: 10,
  },
  textTitleCard: {
    fontFamily: "Poppins-SemiBold",
    color: "#F0810D",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 20,
  },
  viewImage: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

function mapStateToProps(state) {
  return { displayToken: state.token };
}
export default connect(mapStateToProps, null)(MyPastReservations);
