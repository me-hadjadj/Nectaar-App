import {
  StyleSheet,
  View,
  LogBox,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);

import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import moment from "moment";
import "moment/locale/fr";

import React, { Component } from "react";
import { useEffect, useState } from "react";
import { BottomNavigation, Card } from "react-native-paper";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const ip = "warm-ocean-55850.herokuapp.com";

function ModalLike(props) {
  console.log("props.displayModal", props.displayModal);
  const [myRating, setMyRating] = useState(0);

  var hanlePress = () => {
    props.onClickIntoNotation();
    saveMyRating();
    setModalVisible(!modalVisible);
  };

  //Fonction pour gérer le nombre d'étoiles colorées par palier de 1
  function starsColorGest() {
    if (myRating === 0) {
      return (
        <View style={styles.lastLignStars}>
          <FontAwesome
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(1)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(2)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(3)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(4)}
          />

          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(5)}
          />
        </View>
      );
    }
    if (myRating === 1) {
      return (
        <View style={styles.lastLignStars}>
          <FontAwesome
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(1)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(2)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(3)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(4)}
          />

          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(5)}
          />
        </View>
      );
    }
    if (myRating === 2) {
      return (
        <View style={styles.lastLignStars}>
          <FontAwesome
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(1)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(2)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(3)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(4)}
          />

          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(5)}
          />
        </View>
      );
    }
    if (myRating === 3) {
      return (
        <View style={styles.lastLignStars}>
          <FontAwesome
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(1)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(2)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(3)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(4)}
          />

          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(5)}
          />
        </View>
      );
    }
    if (myRating === 4) {
      return (
        <View style={styles.lastLignStars}>
          <FontAwesome
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(1)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(2)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(3)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(4)}
          />

          <FontAwesome
            // style={(paddingRight = 10)}
            name="star-o"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(5)}
          />
        </View>
      );
    }
    if (myRating === 5) {
      return (
        <View style={styles.lastLignStars}>
          <FontAwesome
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(1)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(2)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(3)}
          />
          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(4)}
          />

          <FontAwesome
            // style={(paddingRight = 10)}
            name="star"
            size={36}
            color="#F0810D"
            onPress={() => setMyRating(5)}
          />
        </View>
      );
    }
  }
  // État de visibilité de la Modal
  const [modalVisible, setModalVisible] = useState(true);
  const [titleLastReservation, setTitleLastReservation] = useState("");
  const [dateLastReservation, setDateLastReservation] = useState("");
  const [dateToCompare, setDateToCompare] = useState();
  const [numberOfPlacesTaken, setNumberOfPlacesTaken] = useState();
  const [differenceBetweenDate, setDifferenceBetweenDate] = useState();
  const [idLastReservation, setIdLastReservation] = useState();
  const [myRatingSavedFromBack, setMyRatingSavedFromBack] = useState(null);

  let getReservationList = async () => {
    //console.log("props.displayToken", props.displayToken);
    if (props.displayToken) {
      if (props.user.ticketsRemaining >= 0) {
        var rawResponse = await fetch(
          "https://warm-ocean-55850.herokuapp.com/events/getReservationList",
          {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${props.displayToken}`,
          }
        );
        var response = await rawResponse.json();
        var allReservation = response.user.reservation;

        console.log("allReservation", allReservation);
        var longTab = allReservation.length - 1;
        //console.log('longTab',longTab);
        // Récuperer la dernière réservation
        var lastReservation = allReservation[longTab];
        console.log("lastReservation;MYrATING", lastReservation.myRating);
        setMyRatingSavedFromBack(lastReservation.myRating);

        setIdLastReservation(lastReservation._id);

        setTitleLastReservation(lastReservation.idEvents.titre);
        setNumberOfPlacesTaken(lastReservation.NumberOfPlacesTaken);

        var dateToDisplay = moment(lastReservation.idEvents.dates);
        //console.log(dateToDisplay);

        // Faire appel a une date en français
        moment.locale("fr");
        var frenchDate = dateToDisplay.format("LL");
        //console.log(frenchDate);

        //Set la date à afficher au format (DD mois YYYY) (ex 24 mai 2022)
        setDateLastReservation(frenchDate);

        //Set la date actuelle
        let dateNow = moment().format();
        //console.log("DateNow", dateNow);

        //Set la date de dernière réservation
        var dateOfLastReservation = lastReservation.idEvents.dates;
        //console.log("dateOfLastReservation", dateOfLastReservation);
        setDateToCompare(dateOfLastReservation);
        // Calcul du temps écoulé entre la date d'aujourd'hui et de l'event
        var getDifferenceInDays =
          Math.abs(new Date(dateNow) - new Date(dateOfLastReservation)) /
          (1000 * 60 * 60 * 24);
        //console.log("getDifferenceInDays", getDifferenceInDays);
        setDifferenceBetweenDate(getDifferenceInDays);
      }
    }
  };
  let saveMyRating = async () => {
    console.log("inIdEvent", idLastReservation);
    let rawResponse = await fetch(`https://${ip}/users/addRating`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `myRatingFromFront=${myRating}&tokenFromFront=${props.displayToken}&reservationId=${idLastReservation}`,
    });

    let response = await rawResponse.json();
    console.log("Response myRating", response.myRating);

    if (response.result) {
      console.log("success");
    } else {
      console.log("failure");
    }
  };

  console.log(titleLastReservation);
  console.log(dateLastReservation);
  console.log(idLastReservation);

  //console.log(numberOfPlacesTaken);
  console.log(differenceBetweenDate);
  let dateNow = moment().format();
  //console.log(dateNow);

  console.log(dateNow);
  console.log(dateToCompare);
  console.log(!props.displayModal);
  console.log(differenceBetweenDate >= 1);
  console.log(dateNow > dateToCompare);
  console.log(myRatingSavedFromBack);

  useEffect(() => {
    getReservationList();
    console.log("is in useEffect");
  }, []);

  // Condition que la modal s'affiche pour la 1er fois pendant la session (store) & que la difference entre les deux dates est sup. à 1 jours & que l'event est déja passé
  if (
    !props.displayModal &&
    differenceBetweenDate >= 1 &&
    dateNow > dateToCompare &&
    myRatingSavedFromBack === undefined
  ) {
    return (
      <View style={styles.centeredView}>
        <Modal
          style={styles.modal}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            props.onClickIntoNotation();
          }}
        >
          <View style={styles.centeredView}>
            <Pressable
              style={{ position: "absolute", top: 60, right: 30 }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Ionicons name="md-close-circle" size={40} color="#CABEA8" />
            </Pressable>
            <View>
              <Image
                style={styles.imageRating}
                source={require("../assets/rating.png")}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={styles.modalText}>Évalue ton expérience</Text>
              <Text style={styles.modalTitle}>{titleLastReservation}</Text>
              <Text style={styles.modalDate}>
                Sortie du {dateLastReservation}
              </Text>
              <Text style={styles.modalDate}>
                {numberOfPlacesTaken}
                {numberOfPlacesTaken == 1
                  ? " Ticket utilisé"
                  : " Tickets utilisés"}
              </Text>
              {starsColorGest()}
              <View>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => hanlePress()}
                >
                  <Text style={styles.textStyleButton}>Envoyer</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
  imageRating: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
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
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "BowlbyOne-Regular",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalDate: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    marginBottom: 15,
    textAlign: "center",
  },
  lastLignStars: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
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

function mapDispatchToProps(dispatch) {
  return {
    onClickIntoNotation: function (bool) {
      dispatch({ type: "wishModalSeen" }, bool);
    },
  };
}
function mapStateToProps(state) {
  return {
    displayModal: state.wishModalSeen,
    displayToken: state.token,
    user: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLike);
