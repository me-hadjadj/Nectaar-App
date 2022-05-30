LogBox.ignoreLogs(["Warning: ..."]);
import { StyleSheet, View, LogBox, Text, ImageBackground } from "react-native";

import { Card } from "react-native-paper";
import { Button } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import { connect } from "react-redux";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

function MySubscriptionScreen(props) {
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

  var cardBackgroundColor;
  switch (props.user.subscriptionName) {
    case "Flâner":
      cardBackgroundColor = "rgba(47, 46, 65, 0.73)";
      break;
    case "Explorer":
      cardBackgroundColor = "rgba(47, 181, 186, 0.73)";
      break;
    case "Approfondir":
      cardBackgroundColor = "rgba(161, 101, 167, 0.73)";
      break;
  }

  var daysRemaining = () => {
    var start = new Date(Date.now());
    var end = new Date(props.user.renewalDate);
    end.setMonth(end.getMonth() + 1);
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  var renewalDate = () => {
    var newDate = new Date(props.user.renewalDate);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.topBar}>
        Mon abonnement
      </Text>
      <ImageBackground
        source={require("../assets/arrow-MySubscrition.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.StyleTitle}>
          <Text h4 style={styles.textTitle}>
            Votre Abonnement actuel
          </Text>

          <Card style={[styles.card, { backgroundColor: cardBackgroundColor }]}>
            <View style={styles.StyleTextBulletPoint}>
              <Text style={styles.titleSubscription}>
                {props.user.subscriptionName}
              </Text>
              <Text //Forcer à une ligne avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                style={styles.paragraph}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {"\u2022"} {props.user.ticketsRemaining} place restante
              </Text>
              <Text //Forcer à deux lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                style={styles.paragraph}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {"\u2022"} {daysRemaining()} jours restants dans la période en
                cours.
              </Text>
              <Text //Forcer à une lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                style={styles.paragraph}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {"\u2022"} Renouvellement le {renewalDate()}
              </Text>
            </View>
            <View style={styles.viewButton}>
              <Button
                buttonStyle={styles.button}
                title="CHANGER D'ABONNEMENT"
                titleStyle={{
                  fontFamily: "BowlbyOne-Regular",
                  fontSize: 14,
                  color: "#232D3A",
                }}
                onPress={() => props.navigation.navigate("subscriptionChange")}
              />
              <Button
                buttonStyle={styles.button}
                title="ACHETER DES PLACES"
                titleStyle={{
                  fontFamily: "BowlbyOne-Regular",
                  fontSize: 14,
                  color: "#232D3A",
                }}
              />
            </View>
          </Card>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },

  topBar: {
    backgroundColor: "#CABEA8",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "BowlbyOne-Regular",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    alignItems: "baseline",
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
    fontFamily: "BowlbyOne-Regular",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  StyleTitle: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 20,
  },
  titleSubscription: {
    fontFamily: "BowlbyOne-Regular",
    fontSize: 24,
    color: "#ffffff",
  },
  viewButton: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
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
    fontFamily: "Poppins-Bold",
    paddingTop: 15,
    color: "#FFFFFF",
  },
  card: {
    marginTop: 20,
    height: 408,

    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    // backgroundColor: "rgba(47, 181, 186, 0.73)",
    paddingTop: 10,
    marginHorizontal: 5,
  },
  StyleTextBulletPoint: {
    marginRight: 25,
    marginLeft: 25,
  },
  button: {
    backgroundColor: "#FFFFFF",
    width: 268,
    height: 43,
    marginBottom: 30,
    borderRadius: 6,
  },
  backgroundImage: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(MySubscriptionScreen);
