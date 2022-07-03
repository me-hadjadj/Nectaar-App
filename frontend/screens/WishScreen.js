LogBox.ignoreLogs(["Warning: ..."]);
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  LogBox,
  Text,
  Pressable,
} from "react-native";
import { useEffect, useState, useFocusEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import ModalLike from "../components/ModalLike";

import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { connect } from "react-redux";

function WishScreen(props) {
  //Fonction qui va récupérer la wishlist au lancement du composant
  async function getWishlist() {
    var rawResponse = await fetch(
      "https://warm-ocean-55850.herokuapp.com/wishlist/getWishlist",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.displayToken}`,
      }
    );
    var response = await rawResponse.json();
    setUserWishlist(response.wishlist);
  }

  useEffect(() => {
    if (!props.displayToken) {
      props.navigation.navigate("Login");
    } else {
      const updateWishlist = props.navigation.addListener("focus", () =>
        getWishlist()
      );
      return updateWishlist;
    }
  }, [props.navigation]);

  //Variable d'état qui va stocker la wishlist de l'utilisateur
  const [userWishlist, setUserWishlist] = useState([]);

  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  //Fonction qui va supprimer un evenement de la wishlist
  var deleteFromWishlist = async (eventId) => {
    var rawResponse = await fetch(
      "https://warm-ocean-55850.herokuapp.com/wishlist/deleteFromWishlist",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.displayToken}&eventId=${eventId}`,
      }
    );
    var response = await rawResponse.json();
    setUserWishlist(response.user.wishlist);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  //ajout de la condition pour colorer le like
  if (props.eventLiked) {
    var colorLike = { color: "#F0810D", cursor: "pointer" };
  } else {
    var colorLike = { cursor: "pointer" };
  }
  var stateModalike;
  //Vérification du token pour afficher la Modal pour la notation
  if (props.displayToken) {
    stateModalike = <ModalLike />;
  }

  if (userWishlist.length == 0) {
    return (
      <View style={styles.container}>
        <Text h4 style={styles.text}>
          Mes favoris
        </Text>

        <Text h4 style={styles.textTitle}>
          Vos événements préférés
        </Text>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            style={styles.imageRating}
            source={require("../assets/404.png")}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text style={styles.textTitle2}>
            Vous n'avez encore de favoris, commencez à explorer maintenant !
          </Text>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() =>
              props.navigation.reset({
                index: 0,
                routes: [{ name: "BottomNavigator" }],
              })
            }
          >
            <Text style={styles.textStyleButton}>Fouiner</Text>
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text h4 style={styles.text}>
        Mes favoris
      </Text>

      {stateModalike}

      <Text h4 style={styles.textTitle}>
        Vos événements préférés
      </Text>

      <ScrollView>
        <View style={styles.viewCategorie}>
          {userWishlist
            ? userWishlist.map((event, index) => {
                return (
                  <Card key={index} style={styles.card}>
                    <View style={{ position: "absolute", top: -13, left: 320 }}>
                      <Ionicons
                        name="close-circle-sharp"
                        size={24}
                        color="#F0810D"
                        onPress={() => deleteFromWishlist(event._id)}
                      />
                    </View>
                    <View style={styles.view}>
                      <View>
                        <Text
                          h4
                          style={styles.textTitleCard}
                          numberOfLines={1}
                          onPress={() =>
                            props.navigation.navigate("EventScreen", {
                              eventId: event._id,
                              titre: event.titre,
                              photos: event.photos,
                              description: event.description,
                              dates: event.dates,
                              emplacement: event.emplacement,
                              token: props.displayToken,
                            })
                          }
                        >
                          {event.titre}
                        </Text>
                        <Text //Forcer à deux lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                          style={styles.paragraph}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          onPress={() =>
                            props.navigation.navigate("EventScreen", {
                              eventId: event._id,
                              titre: event.titre,
                              photos: event.photos,
                              description: event.description,
                              dates: event.dates,
                              emplacement: event.emplacement,
                              token: props.displayToken,
                            })
                          }
                        >
                          {event.description}
                        </Text>
                        <View
                          style={{ position: "absolute", top: 100, right: 240 }}
                        >
                          <FontAwesome name="bell" size={20} color="#F0810D" />
                        </View>
                      </View>
                      <View>
                        <Image
                          style={styles.imageWish}
                          source={{ uri: event.photos }}
                          PlaceholderContent={<ActivityIndicator />}
                        />

                        <View
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                          marginTop={5}
                          marginRight={7}
                        >
                        </View>
                      </View>
                    </View>
                  </Card>
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
  returnButton: {
    backgroundColor: "#A165A7",
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
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
  textStyleButton: {
    fontFamily: "BowlbyOne-Regular",
    color: "black",
    fontSize: 22,
  },
  textTitle2: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 18,
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
    paddingRight: 50,
  },
  paragraph2: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 80,
    color: "#0E0E66",
  },
  card: {
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 130,
  },
  textTitleCard: {
    width: 220,
    fontFamily: "Poppins-SemiBold",
    color: "#F0810D",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 20,
  },

  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginLeft: 10,
    // marginRight: 10,
    width: "80%",
  },
  imageWish: {
    position: "absolute",
    top: 14,
    right: -55,
    height: 100,
    width: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
export default connect(mapStateToProps, null)(WishScreen);
