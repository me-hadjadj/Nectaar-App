LogBox.ignoreLogs(["Warning: ..."]);
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  LogBox,
  Text,
} from "react-native";

import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { Card } from "react-native-paper";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const ip = "backend-nectaar-app.herokuapp.com";

function ApprofondirSubscription(props) {
  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  //Fonction qui va sauvegarder le type d'abonnement sur le user en cours
  let saveThisSubscription = async () => {
    let subscriptionTitle = "Approfondir";
    let rawResponse = await fetch(`https://${ip}/users/saveThisSubscription`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `subscriptionTitleFromFront=${subscriptionTitle}&token=${props.token}`,
    });
    let response = await rawResponse.json();
    if (response.result) {
      props.updateTicketsWithSub(response.user.NumberOfPlacesHave);
      props.updateSub(response.user.subscription.idSubscription.nom);
      props.navigation.navigate("SubscriptionValidation");
      console.log("success");
    } else {
      console.log("failure");
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.text}>
        Abonnement
      </Text>

      <Text h4 style={styles.textTitle}>
        Choisir votre abonnement
      </Text>
      <ScrollView>
        <View style={styles.viewCategorie}>
          <Card style={styles.cardSelected}>
            <View style={styles.view}>
              <View>
                <Text h4 style={styles.textTitleCard}>
                  Approfondir
                </Text>
              </View>
            </View>
          </Card>
          <Card style={styles.card1}>
            <View style={styles.view}>
              <View>
                <Text h4 style={styles.textTitleCard2}>
                  Récapitulatif
                </Text>
                <Image
                  style={styles.imageCirclePurple}
                  source={require("../assets/double-circle-purple.png")}
                  PlaceholderContent={<ActivityIndicator />}
                />

                <Text //Forcer à une ligne avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                  style={styles.paragraph}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {"\u2022"} 4 évènements par mois
                </Text>
                <Text //Forcer à une ligne avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                  style={styles.paragraph}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {"\u2022"} 39,90€
                </Text>
                <Text //Forcer à une lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                  style={styles.paragraph}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {"\u2022"} Sans Engagement
                </Text>
                <Text //Forcer à une lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                  style={styles.paragraph}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {"\u2022"} Vos places non utilisées sont cumulables et
                  reportées sur la période suivantes
                </Text>
              </View>
            </View>
          </Card>
        </View>
        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button}
            title="Validez & payez"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 20 }}
            // onPress={() => props.navigation.navigate("Accueil")}
            onPress={() => saveThisSubscription()}
          />
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
    marginTop: 30,
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
    fontSize: 18,
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
  cardSelected: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 80,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#A165A7",
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
  endPage: {
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateTicketsWithSub: (number) => {
      dispatch({ type: "updateTicketsWithSub", number });
    },
    updateSub: (name) => {
      dispatch({ type: "updateSub", name });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprofondirSubscription);
