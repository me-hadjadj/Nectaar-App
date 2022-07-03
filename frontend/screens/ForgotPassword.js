LogBox.ignoreLogs(["Warning: ..."]);

import React, { useState } from 'react';
import { StyleSheet, View, LogBox, Text, Image, TextInput, KeyboardAvoidingView, Platform } from "react-native";

import { Button } from "react-native-elements";


import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

function ForgotPassword(props) {
  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  const [email, setEmail] = useState('');


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <View style={styles.StyleTitle}>
        <Text h2 style={styles.textTitle}>
          Mot de passe oublié
        </Text>
      </View>

      <Text h5 style={styles.textBody}>
        Pour réinitialiser votre mot de passe, vous devez renseigner l'adresse email que vous aviez utiliser lors de votre inscription.
      </Text>

      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.image}>
          <Image
            source={require("../assets/mdp-oublie.png")}
          />
        </View>
      </View>



      <Text h5 style={styles.titleSubscription}>
        Email
      </Text>

      <TextInput
        style={styles.StyleInput}
        placeholder="email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />

      <View style={styles.viewButton}>
        <Button buttonStyle={styles.button2}  title="Réinitialier le mot de passe" titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 18 }}
          onPress={() => props.navigation.navigate('CheckYourEmail')} />
      </View>

      <View style={styles.viewButton}>
        <Button buttonStyle={styles.button} title="RETOUR" titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 18 }}
          onPress={() => props.navigation.navigate('Accueil')} />
      </View>


    </KeyboardAvoidingView>
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
    marginLeft: 10,
    marginRight: 10,
    textAlign: "center",
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
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },

  image: {
    width: 120,
    height: 170,
  },

  titleSubscription: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: "#0D0140",
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },

  StyleInput: {
    height: 40,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 0,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#ffff"
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
    marginBottom: 20,
  },

  button2: {
    backgroundColor: '#2FB5BA',
    width: 324,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },


});

export default ForgotPassword
