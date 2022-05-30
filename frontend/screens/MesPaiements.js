LogBox.ignoreLogs(["Warning: ..."]);
import { StyleSheet, View, LogBox, Text, ScrollView } from "react-native";

import { Card } from "react-native-paper";
import { Button } from "react-native-elements";
import { connect } from "react-redux";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

function MyParameterScreen(props) {
  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  console.log("props.user", props.user);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* <View > */}
      <Text h4 style={styles.topBarMenu}>
        Mes Paiements
      </Text>

      <View style={styles.viewCategorie}>
        <Card style={styles.card}>
          <Text
            style={styles.textCard}
          >{`${props.user.firstname} ${props.user.lastname}`}</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.textCard}>
            Abonnement Actuel :{" "}
            <Text style={styles.textTitleCard}>
              {props.user.subscriptionName}
            </Text>
          </Text>
        </Card>

        <Text h4 style={styles.textTitle}>
          Détail facturation
        </Text>

        <Card style={styles.card2}>
          <View style={styles.view}>
            <Text h4 style={styles.textTitleCard}>
              Flâner
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              20/05/2022
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              Paiement par carte
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              9.90€
            </Text>
          </View>
        </Card>

        <Card style={styles.card2}>
          <View style={styles.view}>
            <Text h4 style={styles.textTitleCard}>
              Flâner
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              20/04/2022
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              Paiement par carte
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              9.90€
            </Text>
          </View>
        </Card>

        <Card style={styles.card2}>
          <View style={styles.view}>
            <Text h4 style={styles.textTitleCard}>
              Flâner
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              20/03/2022
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              Paiement par carte
            </Text>
            <Text style={styles.paragraph} numberOfLines={2}>
              {" "}
              9.90€
            </Text>
          </View>
        </Card>

        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button1}
            style={{ marginTop: 0 }}
            title="RETOUR"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 18 }}
            onPress={() => props.navigation.navigate("Compte")}
          />
        </View>
      </View>

      {/* </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  topBarMenu: {
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
    fontFamily: "BowlbyOne-Regular",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 0,
  },

  textCard: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },

  textTitleCard: {
    fontFamily: "Poppins-SemiBold",
    color: "#F0810D",
    fontSize: 16,
    marginTop: 8,
    paddingTop: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },

  paragraph: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
    paddingTop: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },

  card: {
    marginTop: 20,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },

  card2: {
    marginTop: 20,
    height: 120,
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
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  button1: {
    backgroundColor: "#A165A7",
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },

  endPage: {
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(MyParameterScreen);
