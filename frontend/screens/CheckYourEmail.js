LogBox.ignoreLogs(["Warning: ..."]);

import React, { useState } from 'react';
import { StyleSheet, View, LogBox, Text, Image } from "react-native";

import { Button} from "react-native-elements";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

function CheckYourEmail(props) {
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

  return (
    <View style={styles.container}>

      <View style={styles.StyleTitle}>
        <Text h2 style={styles.textTitle}>
          Check Your Email
        </Text>
      </View>

      <Text h5 style={styles.textBody}>
        Nous vous avons envoyé un lien de confirmation ou de rénitialisation de mot de passe sur votre adresse email.
      </Text>

      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <View style={styles.image}>
          <Image
            source={require("../assets/check-mail.png")}
          />
        </View></View>

      <View style={styles.viewButton}>
        <Button buttonStyle={styles.button} style={{ marginTop: 20 }} title="RETOUR" titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 18 }}
          onPress={() => props.navigation.navigate('Accueil')} />
      </View>

      <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
        <Text h5 style={styles.textBody2}> Vous n'avez pas reçu de mail?</Text>
        <Text h5 style={styles.link} onPress={() => props.navigation.navigate('SignUp')} > Renvoyer</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
  },


  textTitle: {
    fontFamily: "BowlbyOne-Regular",
    fontSize: 30,
    marginTop: 60,
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

  textBody: {
    fontFamily: "Poppins-Regular",
    color: '#524B6B',
    fontSize: 12,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 50,
    marginTop: 30,
    textAlign: "center",
  },

  image: {
    width: 120,
    height: 170,
  },

  viewButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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

  button: {
    backgroundColor: '#A165A7',
    width: 324,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  textBody2: {
    fontFamily: "Poppins-Regular",
    color: '#524B6B',
    fontSize: 12,
    marginBottom: 100,
    marginTop: 20,
    textAlign: "center",
  },

  link: {
    color: "#FF9228",
    textDecorationLine: 'underline',
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    marginBottom: 100,
    marginTop: 20,
    textAlign: "center",
  },


});

export default CheckYourEmail;
