import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  LogBox,
  Animated,
  Easing,
} from "react-native";


LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreLogs(["expo-permissions ..."]);
LogBox.ignoreAllLogs();

function SplashScreen(props) {
  const [isVisible, setIsVisible] = useState(true);
  let animationTimer = new Animated.Value(0);
  const spin = animationTimer.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    outputRange: [
      "0deg",
      "360deg",
      "720deg",
      "1080deg",
      "1440deg",
      "1800deg",
      "2160deg",
      "2520deg",
      "2880deg",
      "3240deg",
      "3600deg",
    ],
  });
  useEffect(() => {
    Animated.timing(animationTimer, {
      duration: 3000,
      toValue: 1,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  }, [animationTimer]);

  useEffect(() => {
    if (!isVisible) {
      props.navigation.navigate("BottomNavigator", { screen: "Accueil" });
    }
  }, [isVisible]);

  if (!isVisible) {
    return <></>;
  } else {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Image
          style={{
            resizeMode: "center",
            position: "absolute",
            transform: [
              {
                rotate: spin,
              },
            ],
          }}
          source={require("../assets/circle.png")}
        />
        <Animated.Image
          style={{ resizeMode: "center", height: 300, width: 370 }}
          source={require("../assets/Logo-NECTAAR-sans-cercle.png")}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tinyLogo: {
    resizeMode: "contain",
    height: 300,
    width: 370,
  },
});

export default SplashScreen;
