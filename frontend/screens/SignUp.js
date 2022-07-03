LogBox.ignoreLogs(["Warning: ..."]);

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  LogBox,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  BackHandler,
} from "react-native";

import { Button } from "react-native-elements";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { connect } from "react-redux";

const ip = "backend-nectaar-app.herokuapp.com";

function Signup(props) {
  const { firstname, lastname, email } = props.route.params
    ? props.route.params
    : "";

  useEffect(() => {
    //Fonction qui retourne sur le screen Login avec un état de navigation
    //remis à zéro
    const handleRetourPress = () => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
      return true;
    };
    //Ecouteur sur le bouton Retour des téléphones Android
    BackHandler.addEventListener("hardwareBackPress", handleRetourPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleRetourPress);
  }, []);

  const [signUpFirstname, setSignUpFirstname] = useState(firstname);
  const [signUpLastname, setSignUpLastname] = useState(lastname);
  const [signUpEmail, setSignUpEmail] = useState(email);
  const [signUpPassword, setSignUpPassword] = useState("");

  const [listErrorsSignup, setErrorsSignup] = useState([]);

  var handleSubmitSignup = async () => {
    const data = await fetch(`https://${ip}/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstnameFromFront=${signUpFirstname}&lastnameFromFront=${signUpLastname}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
    });

    const body = await data.json();

    if (body.result == true) {
      props.addToken(body.saveUser.token);
      props.saveUserInfo({
        firstname: body.saveUser.firstname,
        lastname: body.saveUser.lastname,
        ticketsRemaining: body.saveUser.NumberOfPlacesHave,
        renewalDate: body.saveUser.subscription.dateOfSubscription,
        email: body.saveUser.email,
      });

      props.navigation.navigate("Compte", {
        screen: "subscriptionChoice",
      });
    } else {
      setErrorsSignup(body.error);
    }
  };

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return <Text style={styles.titleSubscriptionError}>{error}</Text>;
  });

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.StyleTitle}>
          <Text h2 style={styles.textTitle}>
            Créer un compte
          </Text>
        </View>

        <Text h5 style={styles.titleSubscription}>
          Prénom
        </Text>

        <TextInput
          style={styles.StyleInput}
          placeholder="Prénom"
          value={signUpFirstname}
          onChangeText={(val) => setSignUpFirstname(val)}
        />

        <Text h5 style={styles.titleSubscription}>
          Nom
        </Text>

        <TextInput
          style={styles.StyleInput}
          placeholder="Nom"
          value={signUpLastname}
          onChangeText={(val) => setSignUpLastname(val)}
        />

        <Text h5 style={styles.titleSubscription}>
          Email
        </Text>

        <TextInput
          style={styles.StyleInput}
          placeholder="email"
          value={signUpEmail}
          onChangeText={(val) => setSignUpEmail(val)}
          autoCapitalize="none"
        />
        {tabErrorsSignup}
        <Text h5 style={styles.titleSubscription}>
          Mot de passe
        </Text>

        <TextInput
          style={styles.StyleInput}
          placeholder="mot de passe"
          secureTextEntry
          value={signUpPassword}
          onChangeText={(val) => setSignUpPassword(val)}
        />

        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button}
            style={{ marginTop: 20 }}
            title="JE M'INSCRIS"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 18 }}
            onPress={() => handleSubmitSignup()}
          />
        </View>

        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button2}
            style={{ marginTop: 20 }}
            title="RETOUR"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 18 }}
            onPress={() =>
              props.navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            }
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    color: "#524B6B",
    fontSize: 12,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
    marginTop: 30,
    textAlign: "center",
  },

  titleSubscription: {
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: "#0D0140",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  titleSubscriptionError: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "red",
    marginTop: 0,
    textAlign: "center",
  },

  StyleInput: {
    height: 40,
    marginLeft: 30,
    marginRight: 30,
    borderWidth: 0,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#ffff",
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

  button: {
    backgroundColor: "#2FB5BA",
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  button2: {
    backgroundColor: "#A165A7",
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
    saveUserInfo: (user) => {
      dispatch({ type: "saveUserInfo", user });
    },
  };
}

// export default ScreenHome;
export default connect(null, mapDispatchToProps)(Signup);
