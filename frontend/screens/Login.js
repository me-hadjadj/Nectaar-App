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

import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { CheckBox } from "@rneui/themed";

import { FontAwesome5 } from "@expo/vector-icons";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const ip = "warm-ocean-55850.herokuapp.com";

function Login(props) {
  useEffect(() => {
    const handleRetourPress = () => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "BottomNavigator" }],
      });
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handleRetourPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleRetourPress);
  }, []);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [userExists, setUserExists] = useState(false);
  const [check, setCheck] = useState(false);
  const [listErrorsSignin, setErrorsSignin] = useState([]);

  var handleSubmitSignin = async () => {
    const data = await fetch(`https://${ip}/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`,
    });
    const body = await data.json();

    if (body.result == true) {
      setUserExists(!userExists);
      if (check) {
        // console.log("Avant la sauvegarde en LOCALSTORAGE");
        AsyncStorage.setItem("token", JSON.stringify(body.user.token));
      }
      
      props.addToken(body.user.token);
      props.saveUserInfo({
        firstname: body.user.firstname,
        lastname: body.user.lastname,
        ticketsRemaining: body.user.NumberOfPlacesHave,
        renewalDate: body.user.subscription.dateOfSubscription,
        subscriptionName: body.user.subscription.idSubscription.nom,
        email: body.user.email,
      });
      if (!props.returnToScreen) {
        props.navigation.reset({
          index: 0,
          routes: [{ name: "BottomNavigator" }],
        });
      } else {
        props.navigation.navigate(props.returnToScreen);
      }
    } else {
      setErrorsSignin(body.error);
    }
  };

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
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
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.StyleTitle}>
          <Text h2 style={styles.textTitle}>
            NECTAAR
          </Text>
        </View>

        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button2}
            title="CONNEXION AVEC GOOGLE"
            titleStyle={{
              fontFamily: "Poppins-Bold",
              fontSize: 14,
              color: "#383838",
              marginLeft: 10,
            }}
            icon={<FontAwesome5 name="google" size={24} color="blue" />}
          />
        </View>

        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button3}
            title="CONNEXION AVEC FACEBOOK"
            titleStyle={{
              fontFamily: "Poppins-Bold",
              fontSize: 14,
              color: "#FFFFFF",
              marginLeft: 10,
            }}
            icon={
              <FontAwesome5 name="facebook-square" size={24} color="white" />
            }
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.hairline}></View>
          <Text h5 style={styles.paragraph}>
            OU
          </Text>
          <View style={styles.hairline}></View>
        </View>

        <Text h5 style={styles.titleSubscription}>
          Email
        </Text>

        <TextInput
          style={styles.StyleInput}
          placeholder="email"
          value={signInEmail}
          onChangeText={(val) => setSignInEmail(val)}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text h5 style={styles.titleSubscription}>
          Mot de passe
        </Text>

        <TextInput
          style={styles.StyleInput}
          placeholder="mot de passe"
          secureTextEntry
          value={signInPassword}
          onChangeText={(val) => setSignInPassword(val)}
          keyboardType="email-address"
        />
        {tabErrorsSignin}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <CheckBox
            title="Se souvenir de moi"
            checked={check}
            onPress={() => setCheck(!check)}
            containerStyle={{ backgroundColor: "transparent" }}
            checkedColor="#2FB5BA"
            fontFamily="Poppins-Regular"
            color="#524B6B"
            fontSize="12"
            padding="0"
          />
          <Text
            h5
            style={styles.link}
            onPress={() => props.navigation.navigate("ForgotPassword")}
          >
            {" "}
            Mot de passe oublié
          </Text>
        </View>

        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button}
            title="SE CONNECTER"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 18 }}
            onPress={() => handleSubmitSignin()}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text h5 style={styles.textBody2}>
            {" "}
            Pas encore de compte?
          </Text>
          <Text
            h5
            style={styles.link}
            onPress={() => props.navigation.navigate("SignUp")}
          >
            {" "}
            Je m'inscris
          </Text>
        </View>

        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button1}
            style={{ marginTop: 0 }}
            title="RETOUR"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 18 }}
            onPress={() =>
              props.navigation.reset({
                index: 0,
                routes: [{ name: "BottomNavigator" }],
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
    marginBottom: 10,
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
    marginBottom: 0,
  },

  button1: {
    backgroundColor: "#A165A7",
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },

  button2: {
    backgroundColor: "#F0F0F0",
    width: 300,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  button3: {
    backgroundColor: "#4267B2",
    width: 300,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  paragraph: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    marginTop: 20,
    color: "#383838",
    textAlign: "center",
  },

  textBody2: {
    fontFamily: "Poppins-Regular",
    color: "#524B6B",
    fontSize: 14,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },

  link: {
    color: "#FF9228",
    textDecorationLine: "underline",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },

  hairline: {
    backgroundColor: "#000000",
    height: 1,
    width: 120,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
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

function mapStateToProps(state) {
  return {
    returnToScreen: state.screen,
  };
}

// export default ScreenHome;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
