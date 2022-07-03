import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";

import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const ip = "warm-ocean-55850.herokuapp.com";

function ModalLike(props) {

  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

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

        var longTab = allReservation.length - 1;
   
        // Récuperer la dernière réservation
        var lastReservation = allReservation[longTab];
        setMyRatingSavedFromBack(lastReservation.myRating);

        setIdLastReservation(lastReservation._id);

        setTitleLastReservation(lastReservation.idEvents.titre);
        setNumberOfPlacesTaken(lastReservation.NumberOfPlacesTaken);

        var dateToDisplay = moment(lastReservation.idEvents.dates);


        // Faire appel a une date en français
        moment.locale("fr");
        var frenchDate = dateToDisplay.format("LL");
  

        //Set la date à afficher au format (DD mois YYYY) (ex 24 mai 2022)
        setDateLastReservation(frenchDate);

        //Set la date actuelle
        let dateNow = moment().format();


        //Set la date de dernière réservation
        var dateOfLastReservation = lastReservation.idEvents.dates;
        setDateToCompare(dateOfLastReservation);

        // Calcul du temps écoulé entre la date d'aujourd'hui et de l'event
        var getDifferenceInDays =
          Math.abs(new Date(dateNow) - new Date(dateOfLastReservation)) /
          (1000 * 60 * 60 * 24);
    
        setDifferenceBetweenDate(getDifferenceInDays);
      }
    }
  };
  let saveMyRating = async () => {
    let rawResponse = await fetch(`https://${ip}/users/addRating`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `myRatingFromFront=${myRating}&tokenFromFront=${props.displayToken}&reservationId=${idLastReservation}`,
    });

    let response = await rawResponse.json();

    if (response.result) {
      console.log("success");
    } else {
      console.log("failure");
    }
  };

  let dateNow = moment().format();

  useEffect(() => {
    getReservationList();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }


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
  modal: {
    flex: 1,
  },
  imageRating: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyleButton: {
    fontFamily: "BowlbyOne-Regular",
    textAlign:'center',
    color: "black",
    fontSize: 22,
  },
  button: {
    width: 324,
    height: 50,
    marginLeft: 15,
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
