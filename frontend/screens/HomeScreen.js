import AppLoading from "expo-app-loading";
import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text, View, ActivityIndicator } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import * as Font from "expo-font";

//Bloquer l'écran en mode Portrait
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

function HomeScreen(props) {
  
  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Black": require("../assets/fonts/poppins/Poppins-Black.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  var clickHandle = () => {
    props.navigation.navigate("BottomNavigator", { screen: "Accueil" });
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center"
        }}
        onPress={() => clickHandle()}
        activeOpacity={1}
      >
        <Image
          style={styles.tinyLogo}
          source={require("../assets/logo-HomePage.png")}
          PlaceholderContent={<ActivityIndicator />}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },

  tinyLogo: {
    resizeMode: "contain",
    height: 300,
    width: 370,
   
  },
});

export default HomeScreen;
