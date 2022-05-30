LogBox.ignoreLogs(["Warning: ..."]);
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  LogBox,
  Text,
  TouchableOpacity,
  BackHandler,
  Pressable,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Button } from "react-native-elements";

import { Card } from "react-native-paper";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

function Offrir(props) {
  //Creation variable d'état pour gérer les couleurs des cards sur le onPress
  const [colorCard, setColorCard] = useState(0);

  //Variable de référence pour générer un scroll lors du tap sur un bouton abonnement
  const refScrollView = useRef();

  //Fonction pour récupérer  le numéro de la card sélectionnée
  var handlepress = (number) => {
    setColorCard(number);
    setTimeout(
      () => refScrollView.current.scrollToEnd({ animated: true }),
      300
    );
  };

  // Déclaration de variable pour définir la couleur des cards par défaut
  var flanerSub = styles.card;
  var explorerSub = styles.cardExplorer;
  var appronfSub = styles.card1;

  //Condition de changement de couleur sur la card sélectionnée
  if (colorCard == 1) {
    flanerSub = styles.cardSelected;
    explorerSub = styles.cardExplorer;
    appronfSub = styles.card1;
  }
  if (colorCard == 2) {
    flanerSub = styles.card;
    explorerSub = styles.cardExplorerSelected;
    var appronfSub = styles.card1;
  }
  if (colorCard == 3) {
    flanerSub = styles.card;
    explorerSub = styles.cardExplorer;
    var appronfSub = styles.card1Selected;
  }

  //Function qui affiche le bouton une fois la card sélectionnée
  const buttonAppear = () => {
    if (colorCard === 1) {
      return (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          title="Offrir"
          onPress={() => {
            props.navigation.navigate("Flaner");
          }}
        >
          <Text style={styles.textStyleButton}>Offrir</Text>
        </Pressable>
      );
    } else if (colorCard === 2) {
      return (
        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button}
            title="Offrir"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 20 }}
            onPress={() => {
              props.navigation.navigate("Explorer");
            }}
          />
        </View>
      );
    } else if (colorCard === 3) {
      return (
        <View style={styles.viewButton}>
          <Button
            buttonStyle={styles.button}
            title="Offrir"
            titleStyle={{ fontFamily: "BowlbyOne-Regular", fontSize: 20 }}
            onPress={() => {
              props.navigation.navigate("Approfondir");
            }}
          />
        </View>
      );
    }
  };

  //Import des polices
  const [fontsLoaded] = Font.useFonts({
    "Poppins-SemiBold": require("../assets/fonts/poppins/Poppins-SemiBold.otf"),
    "Poppins-Regular": require("../assets/fonts/poppins/Poppins-Regular.otf"),
    "BowlbyOne-Regular": require("../assets/fonts/bowlby-one-sc/BowlbyOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView
      style={styles.container}
      ref={refScrollView}
      showsVerticalScrollIndicator={false}
    >
      <Text h4 style={styles.text}>
        Offrir
      </Text>
      <Text h4 style={styles.textTitle}>
        Choisir un abonnement à offrir
      </Text>
      {/* <ScrollView> */}
      <View style={styles.viewCategorie}>
        <TouchableOpacity //Rendre la Card Clickable
          onPress={() => handlepress(1)}
        >
          <Card style={flanerSub}>
            <View style={styles.view}>
              <View>
                <Text
                  h4
                  style={
                    colorCard === 1
                      ? [styles.textTitleCard, { color: "white" }]
                      : styles.textTitleCard
                  }
                >
                  Flâner
                </Text>
                <Text //Forcer à deux lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                  style={
                    colorCard === 1
                      ? [styles.paragraph, { color: "white" }]
                      : styles.paragraph
                  }
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  29,70€ pour 3 mois
                </Text>
                <Text
                  style={
                    colorCard === 1
                      ? [styles.paragraph2, { color: "white" }]
                      : styles.paragraph2
                  }
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  1 événement par mois
                </Text>
              </View>
              <Image
                style={styles.imageCircleOrange}
                source={require("../assets/double-circle-orange.png")}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity //Rendre la Card Clickable
          onPress={() => handlepress(2)}
        >
          <Card style={styles.cardBest}>
            <Text h4 style={styles.textTitleBestSeller}>
              Best-Seller
            </Text>
          </Card>
          <Card style={explorerSub}>
            <View style={styles.view}>
              <View>
                <Text
                  h4
                  style={
                    colorCard === 2
                      ? [styles.textTitleCard, { color: "white" }]
                      : styles.textTitleCard
                  }
                >
                  Explorer
                </Text>
                <Text //Forcer à deux lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                  style={
                    colorCard === 2
                      ? [styles.paragraph, { color: "white" }]
                      : styles.paragraph
                  }
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  59,70€ pour 3 mois
                </Text>
                <Text
                  style={
                    colorCard === 2
                      ? [styles.paragraph2, { color: "white" }]
                      : styles.paragraph2
                  }
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  2 événements par mois
                </Text>
              </View>
              <Image
                style={styles.imageCircleGreen}
                source={require("../assets/double-circle-green.png")}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity //Rendre la Card Clickable
          onPress={() => handlepress(3)}
        >
          <Card style={appronfSub}>
            <View style={styles.view}>
              <View>
                <Text
                  h4
                  style={
                    colorCard === 3
                      ? [styles.textTitleCard, { color: "white" }]
                      : styles.textTitleCard
                  }
                >
                  Approfondir
                </Text>
                <Text //Forcer à deux lignes avec le numberOfLine, si la longeur de la ligne dépasse ... s'afficheront grace au ellipsizeMode
                  style={
                    colorCard === 3
                      ? [styles.paragraph, { color: "white" }]
                      : styles.paragraph
                  }
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  119,70€ pour 3 mois
                </Text>
                <Text
                  style={
                    colorCard === 3
                      ? [styles.paragraph2, { color: "white" }]
                      : styles.paragraph2
                  }
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  4 événements par mois
                </Text>
              </View>
              <Image
                style={styles.imageCirclePurple}
                source={require("../assets/double-circle-purple.png")}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      {buttonAppear()}
      <View style={styles.endPage} />
      {/* </ScrollView> */}
    </ScrollView>
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
  imageCircleOrange: {
    position: "absolute",
    bottom: -65,
    marginLeft: 280,
  },
  imageCircleGreen: {
    position: "absolute",
    bottom: -65,
    marginLeft: 20,
  },
  imageCirclePurple: {
    position: "absolute",
    bottom: -65,
    marginLeft: 280,
  },
  textTitle: {
    fontFamily: "BowlbyOne-Regular",
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
    marginBottom: 10,
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
  viewButton: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

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
    fontFamily: "Poppins-SemiBold",
    color: "black",
    paddingLeft: 10,
    paddingRight: 50,
    marginLeft: 10,
  },
  paragraph2: {
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 80,
    marginLeft: 10,
    color: "black",
  },
  card: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 40,
    marginRight: 10,
    borderRadius: 20,
    height: 120,
    borderWidth: 2,
    borderColor: "black",
  },
  card1: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 40,
    marginRight: 10,
    borderRadius: 20,
    height: 120,
    borderWidth: 2,
    borderColor: "black",
  },
  card1Selected: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 40,
    marginRight: 10,
    borderRadius: 20,
    height: 120,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#A165A7",
  },
  cardSelected: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 40,
    marginRight: 10,
    borderRadius: 20,
    height: 120,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#353B45",
  },
  cardExplorer: {
    marginTop: -2,
    marginLeft: 10,
    marginBottom: 40,
    marginRight: 10,
    borderRadius: 20,
    height: 120,
    borderWidth: 2,
    borderColor: "black",
  },
  cardExplorerSelected: {
    marginTop: -2,
    marginLeft: 10,
    marginBottom: 40,
    marginRight: 10,
    borderRadius: 20,
    height: 120,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#2EB5BA",
  },
  cardBest: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "#2FB5BA",

    marginRight: 10,
    borderRadius: 20,
    height: 40,
    borderWidth: 2,
    borderColor: "black",
  },
  textTitleCard: {
    fontFamily: "BowlbyOne-Regular",
    color: "#F0810D",
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 15,
    marginLeft: 10,
  },
  textTitleBestSeller: {
    fontFamily: "BowlbyOne-Regular",
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
  // button: {
  //   backgroundColor: "#A165A7",
  //   width: 324,
  //   height: 50,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginBottom: 30,
  //   borderRadius: 6,
  // },

  button: {
    width: 324,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginTop: 30,
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
    fontSize: 18,
  },
  endPage: {
    marginBottom: 20,
  },
});

export default Offrir;
