LogBox.ignoreLogs(["Warning: ..."]);
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  LogBox,
  Text,
} from "react-native";

import moment from "moment";
import "moment/locale/fr";
import { useEffect } from "react";

// Icone qui permet de faire dérouler la suite du texte
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import MenuDown from "../components/MenuDown";
import RBSheet from "react-native-raw-bottom-sheet";
import { Card } from "react-native-paper";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import React, { useState, useRef } from "react";


function BookingValidation(props) {
  const [isLiked, setIsLiked] = useState(false);

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
    } else {
      console.log("NO TOKEN !");
    }
  };

  const refRBSheet = useRef();

  const { titre, photos, dates, emplacement, hours, token, eventId } =
    props.route.params;
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

  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  
  //Convertion de la date au format XX mois XXXX en français
  var dateToDisplay = moment(dates);
  moment.locale("fr");
  var frenchDate = dateToDisplay.format("LL");

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      ref={refBottom}
    >
      <Image style={styles.imageCategorie} source={{ uri: photos }}></Image>

      <Ionicons
        name="arrow-back-circle-sharp"
        size={40}
        color="#CABEA8"
        style={{ position: "absolute", top: 30, left: 10 }}
        onPress={() => props.navigation.goBack()}
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
        {/* Rentrer le nom de l'event sélectionné par le user */}
        <Text h4 style={styles.textTitle}>
          {JSON.stringify(titre)}
        </Text>
        <View style={styles.view}>
          <View>
            <Card style={styles.card1}>
              <Text h4 style={styles.textTitle}>
                Récapitulatif de votre réservation
              </Text>
              <Text
                name="map-pin"
                size={24}
                color="#a165a7"
                style={styles.paragraph}
              >
                <Entypo name="calendar" size={24} color="#f0810d" />
                <> </>
                {frenchDate} à {hours}
              </Text>
              <Text
                name="map-pin"
                size={24}
                color="#a165a7"
                style={styles.paragraph}
              >
                <Feather name="map-pin" size={20} color="#f0810d" />
                <> </>
                {emplacement}
              </Text>
              <Text
                name="map-pin"
                size={24}
                color="#a165a7"
                style={styles.paragraph}
              >
                <Ionicons name="ios-time" size={24} color="#f0810d" /> Cet
                événement dure 4 heures
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginLeft: 10,
                  marginRight: 10,
                  fontStyle: "italic",
                }}
              >
                Votre billet est disponible dans votre espace "Tickets" et dans
                vos mails
              </Text>
            </Card>
          </View>
          <View style={{ alignItems: "center" }}>
            <View>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => this.RBSheet.open()}
              >
                <Text style={styles.textStyleButton}>Partager</Text>
              </Pressable>
              <RBSheet
                ref={(ref) => {
                  this.RBSheet = ref;
                }}
                height={300}
                openDuration={250}
                customStyles={{
                  container: {
                    alignItems: "center",
                    backgroundColor: "#2FB5BA",
                  },
                  wrapper: {
                    backgroundColor: "transparent",
                  },
                  draggableIcon: {
                    backgroundColor: "#000",
                  },
                }}
              >
                <MenuDown />
              </RBSheet>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.endPage} />
    </ScrollView>
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
    marginTop: 0,
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
  textTitle: {
    fontFamily: "BowlbyOne-Regular",
    textAlign: "center",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 10,
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
    width: 400,
    height: 300,
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
    marginBottom: 30,
    marginRight: 10,
    borderRadius: 20,
    height: 280,
    borderWidth: 2,
    borderColor: "black",
  },
  button: {
    backgroundColor: "#FFFFFF",
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderRadius: 6,
    borderColor: "#000000",
    borderWidth: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 15,
      height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 1.68,

    elevation: 1,
  },

  endPage: {
    marginBottom: 20,
  },
});

export default BookingValidation;
