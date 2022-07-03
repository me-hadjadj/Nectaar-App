LogBox.ignoreLogs(["Warning: ..."]);
import {
  StyleSheet,
  View,
  Image,
  LogBox,
  ActivityIndicator,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let handleLogout = () => {
    AsyncStorage.removeItem("token");
    props.deleteUserInfo();
    props.deleteToken();
    props.navigation.reset({
      index: 0,
      routes: [{ name: "BottomNavigator" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.topBarMenu}>
        Paramètres
      </Text>

      <Text h4 style={styles.textTitle}>
        Mon Compte
      </Text>

      <View style={styles.viewCategorie}>
        <Card style={styles.card}>
          <Text
            style={styles.textCard}
          >{`${props.user.firstname} ${props.user.lastname}`}</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.textCard}>{props.user.email}</Text>
        </Card>
        <View style={styles.viewButtonChangePassword}>
          <Button
            buttonStyle={styles.buttonChangePassword}
            title="Changer de mot de passe"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 16 }}
          />
        </View>

        <View // Séparateur
          style={styles.hairline}
        />
        <View style={styles.viewImage}>
          <View>
            <Text h4 style={styles.textTitleInvoice}>
              Facturation
            </Text>
            <Text style={styles.paragraphContact}>
              Pour toutes demandes, merci d’envoyer un mail à
            </Text>
            <Text style={styles.paragraphContactMailBold}>
              contact@nectaar.io
            </Text>
          </View>
          <View>
            <Image
              style={styles.imageCircleOrange}
              source={require("../assets/circle-orange.png")}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
        </View>
        <View // Séparateur
          style={styles.hairline}
        />

        <Text h4 style={styles.textTitleInvoice}>
          Assistance
        </Text>
        <Image
          style={styles.imageCirclePurple}
          source={require("../assets/circle-purple.png")}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.viewButtonAssistance}>
          <Button
            buttonStyle={styles.buttonAssistance}
            title="Nous contacter"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 16 }}
          />
          <Button
            buttonStyle={styles.buttonAssistance}
            title="Se deconnecter"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 16 }}
            onPress={() => handleLogout()}
            // onPress={()=>props.removeItem('token')}
          />
        </View>
        <View // Séparateur
          style={styles.hairline}
        />
      </View>
    </View>
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
  textTitleInvoice: {
    fontFamily: "BowlbyOne-Regular",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 40,
    marginBottom: 10,
  },
  viewCategorie: {
    justifyContent: "center",
  },
  viewImage: {
    flexDirection: "row",
    marginRight: 50,
  },
  imageCircleOrange: {
    position: "absolute",
    bottom: 20,
    marginLeft: -25,
  },
  imageCirclePurple: {
    position: "absolute",
    bottom: 65,
    marginLeft: 30,
  },
  viewButtonChangePassword: {
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  viewButtonAssistance: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 40,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  textCard: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraphContact: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    justifyContent: "center",
    paddingTop: 1,
    paddingLeft: 40,
    paddingRight: 40,
  },
  paragraphContactMailBold: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    justifyContent: "center",
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 20,
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
  buttonChangePassword: {
    backgroundColor: "#A165A7",
    width: 291,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonAssistance: {
    backgroundColor: "#A165A7",
    width: 182,
    height: 40,

    marginBottom: 20,
  },
  hairline: {
    alignSelf: "center",
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    backgroundColor: "#000000",
    height: 1,
    width: 297,
    borderRadius: 20,
  },
});

function mapStateToProps(state) {
  return {
    user: state.user,
    token: state.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUserInfo: () => {
      dispatch({ type: "deleteUserInfo" });
    },
    deleteToken: () => {
      dispatch({ type: "deleteToken" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyParameterScreen);
