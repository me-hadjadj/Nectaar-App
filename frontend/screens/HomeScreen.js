import AppLoading from "expo-app-loading";
import React from "react";
import { StyleSheet, TouchableOpacity, Image, View, ActivityIndicator } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

import * as Font from "expo-font";

//Bloquer l'écran en mode Portrait
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

function HomeScreen(props) {
  
  const [fontsLoaded] = Font.useFonts({
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.otf"),
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
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
