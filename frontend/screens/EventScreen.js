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
  Badge,
  BackHandler,
  Dimensions,
} from "react-native";

import moment from "moment";
import "moment/locale/fr";

import { connect } from "react-redux";

// Icone qui permet de faire dérouler la suite du texte
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";

import { Button } from "react-native-elements";

import { Card } from "react-native-paper";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import React, { useState, useRef, useEffect } from "react";
import Collapsible from "react-native-collapsible";
import CounterInput from "react-native-counter-input";

const window = Dimensions.get("window");

function EventScreen(props) {
  const {
    titre,
    photos,
    description,
    dates,
    emplacement,
    token,
    eventId,
    remain,
  } = props.route.params;

  const [hours, setHours] = useState("");

  const [isLiked, setIsLiked] = useState(false);

  const [counter, setCounter] = useState(1);

  useEffect(() => {
    async function checkIfLiked() {
      if (props.displayToken) {
        let rawResponse = await fetch(
          "https://warm-ocean-55850.herokuapp.com/wishlist/getWishlist",
          {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${token}`,
          }
        );
        let response = await rawResponse.json();
        if (response) {
          var isLiked = false;
          for (let event of response.wishlist) {
            if (event._id === eventId) {
              isLiked = true;
              break;
            }
          }
          setIsLiked(isLiked);
        }
      }
    }
    const likeCheck = props.navigation.addListener("focus", () =>
      checkIfLiked()
    );
    return likeCheck;
  }, []);

  // pour que l'icône puisse faire défiler la suite du texte
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  let refBottom = useRef(null);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const toggleExpanded1 = () => {
    setHours("");
    setCollapsed2(false);
    setTimeout(() => refBottom.current.scrollToEnd({ animated: true }), 300);

    setHours("10:00");
  };
  const toggleExpanded2 = () => {
    setHours("");
    setCollapsed2(false);
    setTimeout(() => refBottom.current.scrollToEnd({ animated: true }), 300);
    setHours("12:00");
  };
  const toggleExpanded3 = () => {
    setHours("");
    setCollapsed2(false);
    setTimeout(() => refBottom.current.scrollToEnd({ animated: true }), 300);
    setHours("14:00");
  };
  const toggleExpanded4 = () => {
    setHours("");
    setCollapsed2(false);
    setTimeout(() => refBottom.current.scrollToEnd({ animated: true }), 300);
    setHours("16:00");
  };
  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  //Fonction qui va rajouter l'event dans la wishlist sur on clique sur le coeur
  let addToWishlist = async () => {
    if (token) {
      if (!isLiked) {
        let rawResponse = await fetch(
          "https://warm-ocean-55850.herokuapp.com/wishlist/addToWishlist",
          {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${token}&eventId=${eventId}`,
          }
        );
        let response = await rawResponse.json();
        if (response.result) {
          setIsLiked(true);
        }
      } else {
        let rawResponse = await fetch(
          "https://warm-ocean-55850.herokuapp.com/wishlist/deleteFromWishlist",
          {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${token}&eventId=${eventId}`,
          }
        );
        let response = await rawResponse.json();
        if (response.result) {
          setIsLiked(false);
        }
      }
    }
  };

  let addReservation = async () => {
    if (props.displayToken) {
      if (props.user.ticketsRemaining > counter) {
        var rawResponse = await fetch(
          "https://warm-ocean-55850.herokuapp.com/events/addReservation",
          {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${props.displayToken}&eventId=${eventId}&ticketCount=${counter}`,
          }
        );
        var response = await rawResponse.json();
        console.log(response);
        if (response.result) {
          props.updateTickets(counter);
          props.navigation.push("BookingValidation", {
            titre: titre,
            photos: photos,
            dates: dates,
            emplacement: emplacement,
            hours: hours,
            token: props.displayToken,
            eventId: eventId,
          });
        }
      } else {
        props.saveReturnScreen("EventScreen");
        props.navigation.navigate("Compte", { screen: "MySubscripton" });
      }
    } else {
      props.saveReturnScreen("EventScreen");
      props.navigation.navigate("Login");
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  var dateToDisplay = moment(dates);
  moment.locale("fr");
  var frenchDate = dateToDisplay.format("LL");
  return (
    // <View style={styles.container}>
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      ref={refBottom}
    >
      <Image style={styles.imageCategorie} source={{ uri: photos }} />

      <Ionicons
        name="arrow-back-circle-sharp"
        size={40}
        color="#CABEA8"
        style={{ position: "absolute", top: 30, left: 10 }}
        onPress={() => props.navigation.pop(1)}
      />
      <Ionicons
        name="heart"
        size={40}
        color={!isLiked ? "#CABEA8" : "#f0810d"}
        style={{ position: "absolute", top: 30, right: 10 }}
        // là c'est ton onPress pour rendre l'icone cliquable et après tu y intègre un UseEffect pour render sur les favoris
        onPress={() => addToWishlist()}
      />

      <View style={styles.viewCategorie}>
        <Text h4 style={styles.textTitle}>
          {JSON.stringify(titre)}
        </Text>
        {/* <Card style={styles.card1}> */}
        <View style={styles.view}>
          <View>
            <Text h4 style={styles.textTitleCard2}>
              Description
            </Text>

            <Text //Forcer à une ligne avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
              style={styles.paragraph}
              numberOfLines={collapsed ? 10 : undefined}
              ellipsizeMode="tail"
            >
              {JSON.stringify(description)}
            </Text>

            <TouchableOpacity
              onPress={() => toggleExpanded()}
              style={{ alignItems: "center", marginTop: 20 }}
            >
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  {collapsed ? "En savoir plus" : "En savoir moins"}
                </Text>
              </View>
            </TouchableOpacity>

            <Collapsible collapsed={collapsed} align="center">
              <View style={styles.paragraph}>
                <Text style={styles.paragraph}></Text>
              </View>
            </Collapsible>

            <MaterialIcons
              style={{ textAlign: "center" }}
              name="expand-more"
              size={27}
              color="black"
            />
          </View>
        </View>
        {/* </Card> */}
      </View>
      <View style={styles.endPage} />

      <TouchableOpacity>
        <View>
          <View>
            <Card>
              <Text
                style={{
                  marginTop: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 18,
                  color: "#f0810d",
                }}
              >
                Séances du {frenchDate}
              </Text>
              <Text style={styles.textTitle}>Prochaines disponibilités</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <View>
                  <Button
                    buttonStyle={styles.buttonincard}
                    title="10:00"
                    titleStyle={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                    }}
                    onPress={() => toggleExpanded1()}
                  />

                  <Button
                    buttonStyle={styles.buttonincard}
                    title="12:00"
                    titleStyle={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                    }}
                    onPress={() => toggleExpanded2()}
                  />
                </View>
                <View>
                  <Button
                    buttonStyle={styles.buttonincard}
                    title="14:00"
                    titleStyle={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                    }}
                    onPress={() => toggleExpanded3()}
                  />
                  <Button
                    buttonStyle={styles.buttonincard}
                    title="16:00"
                    titleStyle={{
                      fontFamily: "Poppins-Regular",
                      fontSize: 16,
                    }}
                    onPress={() => toggleExpanded4()}
                  />
                </View>
              </View>
            </Card>
            <Collapsible collapsed={collapsed2} align="center">
              <View style={styles.paragraph}>
                <Text style={styles.textTitle}>Nombre de places</Text>
              </View>
              <Card
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <CounterInput
                    initial={counter}
                    horizontal={true}
                    increaseButtonBackgroundColor="#f0810d"
                    decreaseButtonBackgroundColor="#f0810d"
                    onChange={(inc) => {
                      setCounter(inc);
                    }}
                    style={{ marginVertical: 10 }}
                  />
                  {Object.keys(props.user).length > 0 ? (
                    <Text style={[styles.paragraph, { marginVertical: 20 }]}>
                      {props.user.ticketsRemaining <= 1 ? (
                        <Text>
                          {" "}
                          Vous avez {props.user.ticketsRemaining} ticket restant
                        </Text>
                      ) : (
                        <Text>
                          {" "}
                          Vous avez {props.user.ticketsRemaining} tickets
                          restants
                        </Text>
                      )}
                      <Text style={[styles.paragraph, { marginVertical: 20 }]}>
                        Il reste {remain} places disponibles
                      </Text>
                    </Text>
                  ) : (
                    <Text style={[styles.paragraph, { marginVertical: 20 }]}>
                      Abonnez-vous dès maintenant pour profiter de cet évènement
                    </Text>
                  )}
                  <View>
                    <Button
                      buttonStyle={styles.button}
                      title={
                        Object.keys(props.user).length > 0
                          ? "Réserver"
                          : "Créer un compte"
                      }
                      titleStyle={{
                        fontFamily: "BowlbyOne-Regular",
                        fontSize: 16,
                      }}
                      onPress={() => addReservation()}
                    />
                  </View>
                </View>
              </Card>
            </Collapsible>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  text: {
    backgroundColor: "#F0810D",
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
  imageCirclePurple: {
    position: "absolute",
    top: 254,
    marginLeft: 280,
  },
  textTitle: {
    fontFamily: "BowlbyOne-Regular",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  viewCategorie: {
    flex: 1,
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
    width: window.width,
    height: 300,
  },
  viewButton: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  card1: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 80,
    marginRight: 10,
    borderRadius: 20,
    height: 280,
    borderWidth: 2,
    borderColor: "black",
  },

  cardHours: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 120,
    borderColor: "black",
    backgroundColor: "#ffff",
  },

  cardSelected: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 80,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#2EB5BA",
  },
  textTitleCard: {
    fontFamily: "BowlbyOne-Regular",
    color: "#FFFFFF",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 15,
    marginLeft: 10,
  },
  textTitleCard2: {
    fontFamily: "Poppins-SemiBold",
    color: "#F0810D",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 15,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#A165A7",
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderRadius: 6,
  },

  buttonincard: {
    backgroundColor: "#2fb5ba",
    width: 100,
    height: 40,
    justifyContent: "center",
    marginBottom: 30,
    borderRadius: 8,
  },

  buttontext: {
    backgroundColor: "transparent",
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderRadius: 6,
  },

  stickyButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },

  endPage: {
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  return {
    displayToken: state.token,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveReturnScreen: (screen) => {
      dispatch({ type: "saveReturnScreen", screen });
    },
    updateTickets: (number) => {
      dispatch({ type: "updateTickets", number });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
