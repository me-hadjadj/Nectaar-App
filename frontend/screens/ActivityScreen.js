import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import AppLoading from "expo-app-loading";
import {
  Badge,
  Input,
  Card,
  Divider,
  CheckBox,
  Button,
} from "react-native-elements";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreLogs(["expo-permissions ..."]);
import * as Location from "expo-location";
import { Ionicons, Feather } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import * as Font from "expo-font";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";


const window = Dimensions.get("window");

function App(props) {
   //Import des polices
   const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });



  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //Variable d'état pour gérer les tags dans le menu déroulant Filtre
  const [handleTagsCheckBoxes, setHandleTagsCheckBoxes] = useState({
    "En solo": false,
    "Entre Amis": false,
    "En Couple": false,
    "En Famille": false,
    Nectaar: false,
  });

  //Variable d'état pour gérer les Activités dans le menu déroulant Filtre
  const [handleCategoriesCheckBoxes, setHandleCategoriesCheckBoxes] = useState({
    Expositions: false,
    "Musique et Concerts": false,
    "Théâtre et Spectacles": false,
    Sports: false,
    Dégustation: false,
  });

  const [noResult, setNoResult] = useState(false);

  //Variable de référence pour pointer sur le menu déroulant des events
  const refRBSheet = useRef();
  const refScrollViewEvent = useRef();
  const [refScrollViewYAxis, setRefScrollViewYAxis] = useState([]);
  //Variable de référence pour pointer sur le menu déroulant des filtres
  const refRBSheetFilters = useRef();

  //Variable de référence pour utiliser les méthodes MapView
  const refMapView = useRef();

  const [pressedEvent, setPressedEvent] = useState(null);

  //Variable de références liée aux marqueurs
  var markerRef = useRef(null);
  //Marqueurs à afficher sur la map
  const [markers, setMarkers] = useState([]);

  //Les events de la recherche ou sur lequel on a appuyé
  const [selectedEvents, setSelectedEvents] = useState([]);

  //Variable d'état de la recherche 'Fouiner'
  const [fouiner, setFouiner] = useState("");

  //Variable d'état de la recherche par adresse
  const [address, setAddress] = useState("");

  //Liste des évènements disponibles selon le filtre de la première page
  const [events, setEvents] = useState([]);

  //Liste de tout les évènements
  const [allEvents, setAllEvents] = useState([]);

  const [myPosition, setMyPosition] = useState(null);

  //Variable d'état qui va bouger la map sur l'event ou le lieu recherché
  const [currentRegion, setCurrentRegion] = useState(null);

  //Liste des tags
  const [tags, setTags] = useState([]);

  //Tag selectionné pour gérer l'opacité quand on en selectionne un
  const [tagName, setTagName] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  //Demande de permissions pour l'utilisation de la map
  async function askPermissions() {
    var { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      var getPositionsOptions =
        Platform.OS === "ios" ? { accuracy: Location.Accuracy.Balanced } : {};
      var location = await Location.getCurrentPositionAsync(
        getPositionsOptions
      );
      let currentRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      };
      refMapView.current.animateToRegion(currentRegion, 2000);
      setMyPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      });
      //On recentre la map sur la position de l'utilisateur
    }
  }

  //On récupère tout les events lié à la categorie sélectionnée au premier écran
  async function getEvents() {
    var rawEvents = await fetch(
      "https://warm-ocean-55850.herokuapp.com/events/getEvents"
    );
    var getEvents = await rawEvents.json();
    setAllEvents(getEvents);
    //Tableau qui va contenir les tags tout event confondu
    var tagArray = [];
    //On filtre uniquement les évènements de la thématique choisie
    getEvents = getEvents.filter((elt) => {
      return (
        elt.categorie === props.category &&
        Date.now() < new Date(elt.dates).getTime()
      );
    });

    //On ajoute un champ latitude et longitude pour chaque objet event pour
    //pouvoir placer les marqueurs plus tard ou vérifier si ces events
    //sont proches de l'adresse tapée par le user
    getEvents = getEvents.map((elt) => {
      //On récupère tout les tags de l'event évalué
      var tempTagsArray = elt.tags.split(", ");
      //On le rajoute dans le tableau
      tagArray.push(tempTagsArray);
      //Traduction de la geolocalisation en string dans la BDD en key latitude/longitude
      var geocode = elt.geolocalisation.split(", ");
      return {
        ...elt,
        latitude: parseFloat(geocode[0]),
        longitude: parseFloat(geocode[1]),
      };
    });
    //On se débarasse de tout les sous tableaux
    tagArray = tagArray.flat();
    //tableau final contenant tout les tags
    var sortedTagArray = [];
    //On supprime tout les tags doublons
    tagArray.forEach((elt) => {
      if (!sortedTagArray.includes(elt)) {
        sortedTagArray.push(elt);
      }
    });
    //On définit les tags liés à la thématique selectionnée
    setTags(sortedTagArray);
    //On définit les events liés à la thématique selectionnée
    setEvents(getEvents);
    //On pose un marqueur pour chaque event filtré
    setMarkers(
      getEvents.map((elt, i) => {
        return (
          <Marker
            key={i}
            image={require("../assets/pin-purple.png")}
            ref={(ref) => (markerRef[i] = ref)}
            coordinate={{ latitude: elt.latitude, longitude: elt.longitude }}
            title={elt.titre}
            //Quand on appuie sur un marqueur, on fait apparaître le menu déroulant du bas avec les infos du marqueur
            onPress={() => {
              handleMarkerPress([getEvents[i]]);
            }}
          />
        );
      })
    );
  }

  //Demande de permissions pour la map au lancement du composant et récupération des events en BDD au lancement du composant
  useEffect(() => {
    askPermissions();
    getEvents();
  }, []);

  // ------------------------------------------------------------------------------------------
  //Tag en dur (à remplacer avec BDD)
  // ------------------------------------------------------------------------------------------
  const categories = [
    "Théâtre et Spectacles",
    "Concert",
    "Rock",
    "Classique",
    "Opéra",
    "Orchestre",
    "Indie",
    "Soul",
  ];

  //Fonction qui va filtrer les évènements selon le tag ou la recherche dans "Fouiner"
  //et on place les marqueurs correspondant sur la map
  let filterMarkers = (type) => {
    setSelectedDate(null);

    //Fermeture de toutes les fenêtres marqueurs
    hideAnchors();

    //On ne récupère que les events dont le type ou le nom correspond à la recherche
    let newArr = events.filter((elt) => {
      if (Date.now() < new Date(elt.dates).getTime()) {
        if (
          elt.categorie.toLowerCase() === type.toLowerCase() ||
          elt.titre.toLowerCase().includes(type.toLowerCase()) ||
          elt.tags.toLowerCase().includes(type.toLowerCase())
        ) {
          return true;
        }
      }
    });
    newArr.sort((a, b) => a.dates > b.dates);
    //Si on a un résultat
    if (newArr.length >= 1) {
      //On pointe la map sur le premier événement trouvé
      let currentRegion = {
        latitude: newArr[0].latitude,
        longitude: newArr[0].longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      };
      refMapView.current.animateToRegion(currentRegion, 2000);
      setTimeout(() => refRBSheet.current.open(), 2200);
    } else {
      //On centre la map sur Paris
      let currentRegion = {
        latitude: 48.8566, // pour centrer la carte
        longitude: 2.3522,
        latitudeDelta: 0.0922, // le rayon à afficher à partir du centre
        longitudeDelta: 0.0421,
      };
      refMapView.current.animateToRegion(currentRegion, 2000);
    }

    //On set les marqueurs selon les events filtrés précédemment
    setMarkers(
      newArr.map((elt, i) => {
        return (
          <Marker
            key={i}
            image={require("../assets/pin-purple.png")}
            ref={(ref) => (markerRef[i] = ref)}
            coordinate={{ latitude: elt.latitude, longitude: elt.longitude }}
            title={elt.titre}
            //Quand on appuie sur un marqueur, on fait apparaître le menu déroulant du bas avec les infos du marqueur
            onPress={() => {
              handleMarkerPress([newArr[i]]);
            }}
          />
        );
      })
    );

    //Opacité 1 sur le tag selectionné
    setTagName(type);

    //On définit le tableau des events à afficher
    setSelectedEvents(newArr);

    //Remise à zéro de la barre de recherche
    setFouiner("");
  };

  //Fonction qui va filtrer les events affichés dans le menu déroulant selon la date
  let filterSelectedEventsByDate = (date) => {
    setNoResult(false);
    if (tagName !== null) {
      var selectedEventsByDate = events.filter((elt) => {
        return (
          new Date(elt.dates).toLocaleDateString() ===
            date.toLocaleDateString() && elt.tags.includes(tagName)
        );
      });
      setSelectedEvents(selectedEventsByDate);
  
    } else {

      var selectedEventsByDate = selectedEvents.filter((elt) => {
        return (
          new Date(elt.dates).toLocaleDateString() === date.toLocaleDateString()
        );
      });
      if (selectedEventsByDate.length > 0) {
        setSelectedEvents(selectedEventsByDate);
      } else {
        setNoResult(true);
      }
    }
  };

  let filterByFilters = () => {
    hideAnchors();
    refRBSheetFilters.current.close();
    setTagName(null);
    var tagsArray = [];
    for (let [key, value] of Object.entries(handleTagsCheckBoxes)) {
      if (value) {
        tagsArray.push(key);
      }
    }
    var categoriesArray = [];
    for (let [key, value] of Object.entries(handleCategoriesCheckBoxes)) {
      if (value) {
        categoriesArray.push(key);
      }
    }

    var eventsByCategories = [];
    if (categoriesArray.length > 0) {
      eventsByCategories = allEvents.filter((elt) => {
        for (let category of categoriesArray) {
          if (elt.categorie.toLowerCase() === category.toLowerCase()) {
            return true;
          }
        }
      });
      //On ajoute un champ latitude et longitude pour chaque objet event pour
      //pouvoir placer les marqueurs plus tard ou vérifier si ces events
      //sont proches de l'adresse tapée par le user
      eventsByCategories = eventsByCategories.map((elt) => {
        //Traduction de la geolocalisation en string dans la BDD en key latitude/longitude
        var geocode = elt.geolocalisation.split(", ");
        return {
          ...elt,
          latitude: parseFloat(geocode[0]),
          longitude: parseFloat(geocode[1]),
        };
      });
    } else {
      eventsByCategories = allEvents;
    }

    var eventsByTags = [];
    if (tagsArray.length > 0) {
      eventsByTags = eventsByCategories.filter((elt) => {
        for (let tag of tagsArray) {
          if (elt.tags.toLowerCase().includes(tag.toLowerCase())) {
            return true;
          }
        }
      });
      //On ajoute un champ latitude et longitude pour chaque objet event pour
      //pouvoir placer les marqueurs plus tard ou vérifier si ces events
      //sont proches de l'adresse tapée par le user
      eventsByTags = eventsByTags.map((elt) => {
        //Traduction de la geolocalisation en string dans la BDD en key latitude/longitude
        var geocode = elt.geolocalisation.split(", ");
        return {
          ...elt,
          latitude: parseFloat(geocode[0]),
          longitude: parseFloat(geocode[1]),
        };
      });
    } else {
      eventsByTags = eventsByCategories;
    }
    if (eventsByTags.length > 0) {
      setMarkers(
        eventsByTags.map((elt, i) => {
          return (
            <Marker
              key={i}
              image={require("../assets/pin-purple.png")}
              ref={(ref) => (markerRef[i] = ref)}
              coordinate={{ latitude: elt.latitude, longitude: elt.longitude }}
              title={elt.titre}
              //Quand on appuie sur un marqueur, on fait apparaître le menu déroulant du bas avec les infos du marqueur
              onPress={() => {
                handleMarkerPress([eventsByTags[i]]);
              }}
            />
          );
        })
      );
      eventsByTags.sort((a, b) => a.dates > b.dates);
      setSelectedEvents(eventsByTags);
 
      let currentRegion = {
        latitude: eventsByTags[0].latitude,
        longitude: eventsByTags[0].longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      };
      refMapView.current.animateToRegion(currentRegion, 2000);
    }
    setTimeout(() => refRBSheet.current.open(), 2200);
  };

  //Gestion des actions quand on appuie sur un marqueur
  let handleMarkerPress = (event) => {
    //Event à afficher dans le bottomSheet
    setSelectedEvents(event);
    setPressedEvent(event[0].titre);
    //On recentre la map sur le marqueur appuyé

    let currentRegion = {
      latitude: event[0].latitude,
      longitude: event[0].longitude,
      latitudeDelta: 0.0102,
      longitudeDelta: 0.0101,
    };
    refMapView.current.animateToRegion(currentRegion, 2000);
    //On fait apparaître le menu du bas
    // bottomSheet.current.show()
    setTimeout(() => refRBSheet.current.open(), 2200);
  };

  //On ferme toutes les tooltip marker à chaque fois qu'on ferme le menu déroulant
  let hideAnchors = () => {
    Object.keys(markerRef).forEach((elt) => {
      if (markerRef[elt]) {
        markerRef[elt].hideCallout();
      }
    });
  };

  //Bouger la caméra vers notre position à l'appui de l'icone fleche sur la map
  let moveToCurrentLocation = () => {
    // setCurrentRegion(myPosition);
    refMapView.current.animateToRegion(myPosition, 2000);
  };

  //On geolocalise l'adresse entrée par l'utilisateur et on redirige la map
  let searchByAddress = async (address) => {
    //On ferme toutes les fenêtres marqueurs
    hideAnchors();
    let getCoordinate;
    //On récupère les coordonnées lat/long de l'adresse entrée
    getCoordinate = await Location.geocodeAsync(address);
    //Si on trouve un résultat
    if (getCoordinate.length > 0) {
      var thisLatitude = getCoordinate[0].latitude;
      var thisLongitude = getCoordinate[0].longitude;
      //On bouge la map sur l'adresse recherchée
      setCurrentRegion({
        latitude: thisLatitude,
        longitude: thisLongitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0121,
      });

      //Diamètre autour de la recherche
      var metersRadius = 300;

      // km par degree lat/long = ~111km
      // 1km en degree = 1 / 111.32km = 0.0089
      // 1m en degree = 0.0089 / 1000 = 0.0000089
      var coefficient = metersRadius * 0.0000089;

      //On calcule la latitude et longitude max autour du point de recherche
      var maxLatitude = thisLatitude + coefficient;
      var maxLongitude =
        thisLongitude + coefficient / Math.cos(thisLatitude * 0.018);

      //On récupère la liste des évènements
      let tempMarkers = events.filter((elt) => {
        //Si l'event est situé dans un rayon de 'metersRadius' alors on garde cet event dans le tableau tempMarkers
        if (
          elt.latitude > thisLatitude - (maxLatitude - thisLatitude) &&
          elt.latitude < thisLatitude + (maxLatitude - thisLatitude)
        ) {
          if (
            elt.longitude > thisLongitude - (maxLongitude - thisLongitude) &&
            elt.longitude < thisLongitude + (maxLongitude - thisLongitude)
          ) {
            return true;
          }
        }
      });

      //On applique un marqueur pour chaque event gardé
      setMarkers(
        tempMarkers.map((elt, i) => {
          return (
            <Marker
              key={i}
              image={require("../assets/pin-purple.png")}
              ref={(ref) => (markerRef[i] = ref)}
              coordinate={{ latitude: elt.latitude, longitude: elt.longitude }}
              title={elt.titre}
              //Quand on appuie sur un marqueur, on fait apparaître le menu déroulant du bas avec les infos du marqueur
              onPress={() => {
                handleMarkerPress([tempMarkers[i]]);
              }}
            />
          );
        })
      );
      //Remise à zéro de l'input adresse
      setAddress("");
    }
  };

  let logo = require("../assets/logo-HomePage.png");

  //Récupérer tout les jours sous 1 mois à partir de la date d'aujourd'hui
  let getAllDaysInMonth = () => {
    // const date = new Date(year, month, 1);
    const date = new Date(Date.now());

    let dates = [];

    for (var i = 0; i < 31; i++) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  //Fonction qui converti les getDay en jours
  let getDayToString = (day) => {
    let jours = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return jours[day];
  };

  //Convertion de la date au format XX mois XXXX en français

  let convertDate = (date) => {
    var datesFormat = new Date(date);
    var dateToDisplay = moment(datesFormat);
    moment.locale("fr");
    var frenchDate = dateToDisplay.format("LL");
    return frenchDate;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, justifyContent: "center" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <MapView
        style={{ width: window.width, height: window.height }}
        initialRegion={{
          latitude: 48.8566, // pour centrer la carte sur Paris
          longitude: 2.3522,
          latitudeDelta: 0.0922, // le rayon à afficher à partir du centre
          longitudeDelta: 0.0421,
        }}
        toolbarEnabled={false}
        ref={refMapView}
      >
        {myPosition ? (
          <>
            <Marker
              coordinate={{
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
              }}
              title="Ma position"
              image={require("../assets/pin-green.png")}
            />
            <Circle
              center={{
                latitude: myPosition.latitude,
                longitude: myPosition.longitude,
              }}
              radius={300}
              fillColor="rgba(46, 138, 138, 0.2)"
              strokeColor="rgba(46, 138, 138, 0.2)"
            />
          </>
        ) : undefined}

        {/* On affiche la liste des marqueurs */}
        {markers}
      </MapView>

      {/* Zone contenant les barres de recherches et les tags */}
      <View
        style={{
          position: "absolute",
          top: 30,
          justifyContent: "center",
          width: "100%",
          fontFamily: "BowlbyOne-Regular",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 20,
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        <View style={{ flexDirection: "row", width: "80%" }}>
          <Input
            placeholder="Fouiner"
            inputContainerStyle={styles.searchInput}
            leftIcon={{ type: "font-awesome", name: "search" }}
            value={fouiner}
            onChangeText={(value) => setFouiner(value)}
            onSubmitEditing={() => filterMarkers(fouiner)}
          />
        </View>
        <View style={{ flexDirection: "row", width: "80%" }}>
          <Input
            placeholder="Rentrer une adresse"
            inputContainerStyle={styles.searchInput}
            leftIcon={{
              type: "font-awesome",
              name: "map-marker",
              color: "#fdcb6e",
            }}
            value={address}
            onChangeText={(value) => setAddress(value)}
            onSubmitEditing={() => searchByAddress(address)}
          />
          <TouchableOpacity onPress={() => refRBSheetFilters.current.open()}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "#a165a7",
                padding: 2,
              }}
            >
              <Ionicons
                name="options-outline"
                size={40}
                borderRadius={15}
                color="white"
                style={{
                  overflow: "hidden",
                  width: 45,
                  height: 45,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {tags
            ? tags.map((elt, i) => {
                var opacity;
                tagName == elt || tagName == null
                  ? (opacity = 1)
                  : (opacity = 0.5);
                return (
                  <Badge
                    key={i}
                    value={elt}
                    badgeStyle={{
                      backgroundColor: "#F0810D",
                      height: 30,
                      width: 90,
                      marginHorizontal: 5,
                      borderColor: "black",
                      borderWidth: 1,
                    }}
                    textStyle={{ color: "white", fontWeight: "bold" }}
                    containerStyle={{ borderRadius: 5, opacity: opacity }}
                    onPress={() => {
                      filterMarkers(elt);
                    }}
                  />
                );
              })
            : undefined}
        </ScrollView>
      </View>

      {/* Zone où on gère le bouton qui recentre sur notre position */}
      <TouchableOpacity
        activeOpacity={1}
        style={{
          position: "absolute",
          bottom: 30,
          right: 10,
          justifyContent: "center",
          width: 50,
          height: 50,
          backgroundColor: "#A165A7",
          borderRadius: 15,
        }}
        onPress={() => moveToCurrentLocation()}
      >
        <FontAwesome
          name="location-arrow"
          size={40}
          color="white"
          style={{ textAlign: "center", textAlignVertical: "center" }}
        />
      </TouchableOpacity>

      {/* Menu déroulant quand on appuie sur un marqueur ou un tag */}

      <RBSheet
        ref={refRBSheet}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={360}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderRadius: 20,
            backgroundColor: "#ECE5DA",
          },
        }}
      >
        {/* Zone où on gère les dates dans le menu déroulant */}
        <View style={{ marginTop: 15, width: "100%" }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {getAllDaysInMonth().map((date, i) => {
              var opacity;
              selectedDate &&
              selectedDate.toLocaleDateString() === date.toLocaleDateString()
                ? (opacity = 1)
                : (opacity = 0.5);
              return (
                <Badge
                  value={getDayToString(date.getDay()) + " " + date.getDate()}
                  key={i}
                  badgeStyle={{
                    backgroundColor: "#F0810D",
                    height: 30,
                    width: 90,
                    marginHorizontal: 5,
                    borderColor: "black",
                    borderWidth: 1,
                  }}
                  textStyle={{ color: "white", fontWeight: "bold" }}
                  containerStyle={{ borderRadius: 5, opacity: opacity }}
                  onPress={() => {
                    setSelectedDate(date);
                    filterSelectedEventsByDate(date);
                  }}
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Zone où on gère les évènements affichés dans le menu déroulant */}
        <ScrollView ref={refScrollViewEvent}>
          {!noResult ? (
            selectedEvents.map((elt, i) => {
              var isNectaar = elt.tags.includes("Nectaar");
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={1}
                  onPress={() => {
                    if (pressedEvent === elt.titre) {
                      refRBSheet.current.close();
                      props.navigation.navigate("EventScreen", {
                        eventId: elt._id,
                        titre: elt.titre,
                        photos: elt.photos,
                        description: elt.description,
                        dates: elt.dates,
                        emplacement: elt.emplacement,
                        token: props.token,
                        remain: elt.remain,
                      });
                    } else {
                      setPressedEvent(elt.titre);
                      refRBSheet.current.close();
                      setTimeout(
                        () =>
                          refMapView.current.animateToRegion(
                            {
                              latitude: elt.latitude,
                              longitude: elt.longitude,
                              latitudeDelta: 0.0102,
                              longitudeDelta: 0.0101,
                            },
                            2000
                          ),
                        500
                      );
                      setTimeout(() => refRBSheet.current.open(), 2200);
                      setTimeout(
                        () =>
                          refScrollViewEvent.current.scrollTo({
                            x: 0,
                            y: refScrollViewYAxis[i] + 5,
                            animated: false,
                          }),
                        2500
                      );

                    }
                  }}
                  onLayout={(event) => {
                    const { layout } = event.nativeEvent;
                    setRefScrollViewYAxis([...refScrollViewYAxis, layout.y]);
                  }}
                >
                  <Card
                    containerStyle={
                      isNectaar
                        ? {
                            backgroundColor: "#f0810d",
                            borderRadius: 10,
                          }
                        : { borderRadius: 10 }
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: "50%" }}>
                        <Text
                          style={
                            isNectaar
                              ? {
                                  fontSize: 20,
                                  fontWeight: "bold",
                                  fontFamily: "Poppins-SemiBold",
                                  color: "#ffffff",
                                }
                              : {
                                  fontSize: 20,
                                  fontWeight: "bold",
                                  fontFamily: "Poppins-SemiBold",
                                  color: "#f0810d",
                                }
                          }
                        >
                          {elt.titre}
                        </Text>
                        <Text>{elt.description.slice(0, 100)}...</Text>
                      </View>
                      <Image
                        style={{ width: "40%", height: "100%" }}
                        source={{ uri: elt.photos }}
                      />
                    </View>
                    <View>
                      <Text style={{ fontWeight: "bold", marginTop: 5 }}>
                        {convertDate(elt.dates)}
                      </Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      </RBSheet>

      {/* Zone où on gère l'affichage du menu déroulant avec les filtres */}
      <RBSheet
        onClose={() => setSelectedDate(null)}
        ref={refRBSheetFilters}
        dragFromTopOnly={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={500}
        animationType="fade"
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            borderRadius: 20,
            backgroundColor: "#ECE5DA",
          },
        }}
      >
        <ScrollView>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View
              style={{ flex: 1, width: "100%", backgroundColor: "#ECE5DA" }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "BowlbyOne-Regular",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 20,
                  marginBottom: 25,
                  textAlign: "center",
                }}
              >
                Activités
              </Text>
              <Divider />
              <CheckBox
                center
                title="Musique et Concerts"
                checked={handleCategoriesCheckBoxes["Musique et Concerts"]}
                onPress={() =>
                  setHandleCategoriesCheckBoxes({
                    ...handleCategoriesCheckBoxes,
                    "Musique et Concerts":
                      !handleCategoriesCheckBoxes["Musique et Concerts"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <CheckBox
                center
                title="Expositions"
                checked={handleCategoriesCheckBoxes["Expositions"]}
                onPress={() =>
                  setHandleCategoriesCheckBoxes({
                    ...handleCategoriesCheckBoxes,
                    Expositions: !handleCategoriesCheckBoxes["Expositions"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <CheckBox
                center
                title="Théâtre et Spectacles"
                checked={handleCategoriesCheckBoxes["Théâtre et Spectacles"]}
                onPress={() =>
                  setHandleCategoriesCheckBoxes({
                    ...handleCategoriesCheckBoxes,
                    "Théâtre et Spectacles":
                      !handleCategoriesCheckBoxes["Théâtre et Spectacles"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <CheckBox
                center
                title="Sports"
                checked={handleCategoriesCheckBoxes["Sports"]}
                onPress={() =>
                  setHandleCategoriesCheckBoxes({
                    ...handleCategoriesCheckBoxes,
                    Sports: !handleCategoriesCheckBoxes["Sports"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <CheckBox
                center
                title="Dégustation"
                checked={handleCategoriesCheckBoxes["Dégustation"]}
                onPress={() =>
                  setHandleCategoriesCheckBoxes({
                    ...handleCategoriesCheckBoxes,
                    Dégustation: !handleCategoriesCheckBoxes["Dégustation"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <Divider styles={{ color: "#fff" }} />
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "BowlbyOne-Regular",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 30,
                  marginBottom: 15,
                  textAlign: "center",
                }}
              >
                Avec qui ?
              </Text>
              <CheckBox
                center
                title="En solo"
                checked={handleTagsCheckBoxes["En solo"]}
                onPress={() =>
                  setHandleTagsCheckBoxes({
                    ...handleTagsCheckBoxes,
                    "En solo": !handleTagsCheckBoxes["En solo"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <CheckBox
                center
                title="Entre Amis"
                checked={handleTagsCheckBoxes["Entre Amis"]}
                onPress={() =>
                  setHandleTagsCheckBoxes({
                    ...handleTagsCheckBoxes,
                    "Entre Amis": !handleTagsCheckBoxes["Entre Amis"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <CheckBox
                center
                title="En Couple"
                checked={handleTagsCheckBoxes["En Couple"]}
                onPress={() =>
                  setHandleTagsCheckBoxes({
                    ...handleTagsCheckBoxes,
                    "En Couple": !handleTagsCheckBoxes["En Couple"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <CheckBox
                center
                title="En Famille"
                checked={handleTagsCheckBoxes["En Famille"]}
                onPress={() =>
                  setHandleTagsCheckBoxes({
                    ...handleTagsCheckBoxes,
                    "En Famille": !handleTagsCheckBoxes["En Famille"],
                  })
                }
                iconRight
                textStyle={styles.checkbox}
                checkedColor="#f0810d"
              />
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Button
                  buttonStyle={{ backgroundColor: "transparent" }}
                  titleStyle={{
                    color: "black",
                    textAlign: "center",
                    fontFamily: "BowlbyOne-Regular",
                    fontWeight: "bold",
                  }}
                  style={styles.buttonStyle}
                  title="Filtrer"
                  onPress={() => filterByFilters()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </RBSheet>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomWidth: 0,
    paddingLeft: 15,
  },
  checkbox: {
    flex: 1,
    justifyContent: "space-around",
    textAlign: "left",
    fontFamily: "BowlbyOne-Regular",
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#fff",
  },

  buttonStyle: {
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
});

function mapStateToProps(state) {
  return {
    category: state.category,
    token: state.token,
  };
}

export default connect(mapStateToProps, null)(App);
