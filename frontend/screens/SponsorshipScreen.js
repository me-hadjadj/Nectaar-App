import {
  StyleSheet,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  LogBox,
  Text,
} from "react-native";
import AppLoading from "expo-app-loading";
import React, { useRef } from "react";
import MenuDown from "../components/MenuDown";

import RBSheet from "react-native-raw-bottom-sheet";

LogBox.ignoreLogs(["Warning: ..."]);
import { connect } from "react-redux";

import * as Font from "expo-font";

function SponsorshipScreen(props) {
  const refRBSheet = useRef();

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
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.text}>
        Parrainage
      </Text>

      <Text h4 style={styles.textTitle}>
        {`${props.user.firstname} ${props.user.lastname}`}
      </Text>

      <View style={styles.viewCategorie}>
        <Text style={styles.paragraph}>
          {props.user.ticketsRemaining} places restantes
        </Text>
        <Text style={styles.paragraph}>
          {daysRemaining()} jours restants dans la période en cours
        </Text>
        <View style={styles.viewImage}>
          <Image
            style={styles.imageParrainage}
            source={require("../assets/parrainage.png")}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.RBSheet.open()}
        >
          <Text style={styles.textStyleButton}>J'invite un pote</Text>
        </Pressable>

        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              alignItems: "center",
              backgroundColor: "#2FB5BA",
            },
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <MenuDown/>
     
        </RBSheet>
      </View>
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

  text2: {
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: "BowlbyOne-Regular",
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
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
  button: {
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginTop: 20,
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
    fontSize: 22,
  },
  textGradient: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 10,
  },
  viewCategorie3: {
    flexDirection: "column",
    justifyContent:'center',
    alignItems:'center',
  },
  viewCategorie2: {
    flexDirection: "row",
    justifyContent:'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },

  viewCategorie: {
    flex: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  viewImage: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  viewButton: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
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
    color: "black",
  },
  paragraph2: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: "white",
    textAlign: "center",
  },
  card: {
    justifyContent: "center",
    marginTop: 20,
    height: 50,
  },
  imageParrainage: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  textTitleCard: {
    fontFamily: "Poppins-SemiBold",
    color: "#F0810D",
    fontSize: 16,
    marginTop: 8,
    marginLeft: 20,
  },
  imageWish: {
    marginTop: 12,
    marginRight: 12,
    height: 80,
    width: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  view: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    marginLeft: 10,
    marginRight: 10,
  },
  hairline: {
    marginTop: 3,

    alignSelf: "center",

    backgroundColor: "#69687F",
    height: 1,
    width: 64,
    borderRadius: 20,
  },
  hairline2: {
    marginTop: 8,

    alignSelf: "center",

    backgroundColor: "#69687F",
    height: 1,
    width: 64,
    borderRadius: 20,
  },
  endPage: {
    marginBottom: 20,
  },

  gradientstyle: {
    fontFamily: "BowlbyOne-Regular",
    color: "#ffff",
    fontSize: 18,
    marginTop: 5,
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
});

function mapStateToProps(state) {
  return {
    displayToken: state.token,
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(SponsorshipScreen);
