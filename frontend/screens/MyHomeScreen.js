import { LogBox, TouchableOpacity, Text } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { connect } from "react-redux";
import ModalLike from "../components/ModalLike";

function MyHomeScreen(props) {
  useEffect(() => {
    async function getUserInfos() {
      var rawUserToken = await AsyncStorage.getItem("token");
      var userToken = JSON.parse(rawUserToken);
      if (userToken) {
        var rawResponse = await fetch(
          "https://backend-nectaar-app.herokuapp.com/users/getUserByToken",
          {
            method: "post",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${userToken}`,
          }
        );
        var response = await rawResponse.json();
        if (response.result) {
          props.addToken(response.user.token);
          props.saveUserInfo({
            firstname: response.user.firstname,
            lastname: response.user.lastname,
            ticketsRemaining: response.user.NumberOfPlacesHave,
            renewalDate: response.user.subscription.dateOfSubscription,
            subscriptionName: response.user.subscription.idSubscription.nom,
            email: response.user.email,
          });
        }
      }
    }
    getUserInfos();
  }, []);

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
  if (props.token) {
    stateModalike = <ModalLike />;
  }
  return (
    <View style={styles.container}>
      <Text
        h4
        style={{
          fontFamily: "BowlbyOne-Regular",
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 80,
          marginBottom: 25,
          textAlign: "center",
        }}
      >
        De quoi avez-vous envie ?
      </Text>
      <ScrollView>
        <View style={styles.viewCategorie}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.saveCategory("Musique et Concerts");
              props.navigation.navigate("Activity");
            }}
          >
            <Image
              style={styles.imageCategorie}
              source={require("../assets/categorie-musique-concerts.jpg")}
              PlaceholderContent={<ActivityIndicator />}
            />

            <View style={styles.viewTextStyle}>
              <Text style={styles.textStyle}>Musique et Concerts</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewCategorie}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.saveCategory("Expositions");
              props.navigation.navigate("Activity");
            }}
          >
            <Image
              style={styles.imageCategorie}
              source={require("../assets/categorie-exposition.jpg")}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.viewTextStyle}>
              <Text style={styles.textStyle}>Expositions</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewCategorie}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.saveCategory("Sports");
              props.navigation.navigate("Activity");
            }}
          >
            <Image
              style={styles.imageCategorie}
              source={require("../assets/sports2.png")}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.viewTextStyle}>
              <Text style={styles.textStyle}>Sports</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewCategorie}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.saveCategory("Théâtre et Spectacles");
              props.navigation.navigate("Activity");
            }}
          >
            <Image
              style={styles.imageCategorie}
              source={require("../assets/categorie-theatre-spectacles.jpg")}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.viewTextStyle}>
              <Text style={styles.textStyle}>Théâtres et Spectacles</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewCategorie}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              props.saveCategory("Dégustations");
              props.navigation.navigate("Activity");
            }}
          >
            <Image
              style={styles.imageCategorie}
              source={require("../assets/tasting.png")}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.viewTextStyle}>
              <Text style={styles.textStyle}>Dégustations</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    fontFamily: "BowlbyOne-Regular",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 40,
    marginBottom: 25,
    textAlign: "center",
  },
  imageLogo: {
    left: 20,
    top: 30,
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  viewCategorie: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  imageCategorie: {
    alignItems: "center",
    width: "100%",
    height: 160,
    marginBottom: 30,
    // borderWidth: 2,
  },
  buttonStyle: {
    alignItems: "center",
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  viewTextStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textStyle: {
    top: 50,
    fontFamily: "Poppins-SemiBold",
    fontSize: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    color: "white",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    saveCategory: (category) => {
      dispatch({ type: "saveCategory", category });
    },
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
    saveUserInfo: (user) => {
      dispatch({ type: "saveUserInfo", user });
    },
  };
}
function mapStateToProps(state) {
  return {
    category: state.category,
    token: state.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHomeScreen);
