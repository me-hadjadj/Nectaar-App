LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
import {
  StyleSheet,
  View,
  ScrollView,
  LogBox,
  Text,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { connect } from "react-redux";
import ModalLike from "../components/ModalLike";
import { TouchableOpacity } from "react-native-gesture-handler";

function MyAccountScreen(props) {
  useEffect(() => {
    if (!props.displayToken) {
      props.navigation.navigate("Login");
    }
  });

  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

 

  var daysRemaining = () => {
    var start = new Date(Date.now());
    var end = new Date(props.user.renewalDate);
    end.setMonth(end.getMonth() + 1);
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  };

  var stateModalike;

  //Vérification du token pour afficher la Modal pour la notation
  if (props.displayToken) {
    stateModalike = <ModalLike />;
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Text h4 style={styles.text}>
        Mon compte
      </Text>

      {stateModalike}

      <Text h4 style={styles.textTitle}>
        {`${props.user.firstname} ${props.user.lastname}`}
      </Text>

      <View style={styles.viewCategorie}>
        <Card style={styles.card}>
          <Text style={styles.paragraph}>
            {props.user.ticketsRemaining}
            {props.user.ticketsRemaining == 1
              ? " place restante"
              : " places restantes"}
          </Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.paragraph}>
            {daysRemaining()}
            {daysRemaining() == 1
              ? " jour restant dans la période en cours"
              : " jours restants dans la période en cours"}
          </Text>
        </Card>
        <View style={styles.viewButton}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              title="MON ABONNEMENT"
              onPress={() => props.navigation.navigate("MySubscripton")}
            >
              <Text style={styles.textStyleButton}>Mon abonnement</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              title="PARAMETRES"
              onPress={() => props.navigation.navigate("MyParameter")}
            >
              <Text style={styles.textStyleButton}>Paramètres</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              title="RESERVATIONS PASSÉES"
              onPress={() => props.navigation.navigate("MyPastReservations")}
            >
              <Text style={styles.textStyleButton}>Dernières réservations</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              title="MES PAIEMENTS"
              onPress={() => props.navigation.navigate("MesPaiements")}
            >
              <Text style={styles.textStyleButton}>Mes paiements</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonOpen]}
              title="PARRAINAGE"
              onPress={() => props.navigation.navigate("SponsorshipScreen")}
            >
              <Text style={styles.textStyleButton}>Parrainage</Text>
            </Pressable>

            {/* Button Linear Gradient */}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Offrir")}
            >
              <LinearGradient
                title="OFFRIR"
                style={styles.gradientstyle}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={["#a165a7", "#f0810d"]}
              >
                <Text style={styles.gradientstyleText}>OFFRIR</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <View style={styles.endPage} />
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
  textTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginTop: 30,
    marginLeft: 20,
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
  viewButton: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
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
    justifyContent: "center",
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  card: {
    justifyContent: "center",
    marginTop: 20,
    height: 50,
  },
  view: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginLeft: 10,
    marginRight: 10,
  },


  endPage: {
    marginBottom: 20,
  },

  gradientstyle: {
    fontFamily: "BowlbyOne-Regular",
    color: "#ffff",
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 5,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 324,
    height: 50,
    borderRadius: 20,
  },
  gradientstyleText: {
    fontFamily: "BowlbyOne-Regular",
    color: "#ffff",
    fontSize: 18,
    textAlign: "center",
   paddingTop: 7,
    width: 324,
    height: 50,
    borderRadius: 20,
  },

  button: {
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginTop: 30,
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
    fontSize: 18,
  },
});

function mapStateToProps(state) {
  return {
    displayToken: state.token,
    user: state.user,
  };
}
export default connect(mapStateToProps, null)(MyAccountScreen);
