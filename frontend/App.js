import { LogBox, StyleSheet } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CommonActions, TabActions } from "@react-navigation/native";

//import de la navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import du reducer
import token from "./reducers/token.reducer";
import wishModalSeen from "./reducers/wishModal.reducer";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

//import des screens
import SplashScreen from './screens/SplashScreen';
import HomeScreen from "./screens/HomeScreen";
import MyAccountScreen from "./screens/MyAccountScreen";
import MyHomeScreen from "./screens/MyHomeScreen";
import TicketsScreen from "./screens/TicketsScreen";
import WishScreen from "./screens/WishScreen";
import ActivityScreen from "./screens/ActivityScreen";
import TicketValidation from "./screens/TicketValidation";
import TicketDetailScreen from "./screens/TicketDetailScreen";
import BookingValidation from "./screens/BookingValidation"; // Ecran qui apparat une fois que le user a booké un événement sur la page EventScreen
import WishDetailScreen from "./screens/WishDetailScreen"; // Écran Détaillé sur un item de la WishList
import MySubscriptionScreen from "./screens/MySubscriptionScreen"; //Écran mon abonnement
import MyParameterScreen from "./screens/MyParameterScreen"; // Écran mes paramètres
import MyPastReservations from "./screens/MyPastReservationsScreen"; // Écran Mes réservations passées
import subscriptionChoice from "./screens/subscriptionChoiceScreen"; // Écran choix entre les différents abonnements
import subscriptionChange from "./screens/subscriptionChangeScreen"; // Écran changement d'abonnements
import FlanerSubscription from "./screens/FlanerSubscriptionScreen"; // Écran abonnement Flaner avant paiement
import ExplorerSubscription from "./screens/ExplorerSubscriptionScreen"; // Écran abonnement Explorer avant paiement
import ApprofondirSubscription from "./screens/ApprofondirSubscriptionScreen"; // Écran abonnement Approfondir avant paiement
import SubscriptionValidation from "./screens/SubscriptionValidation"; // Ecran lorsque le user a choisi et validé un abonnement
import SponsorshipScreen from "./screens/SponsorshipScreen"; // Ecran parrainage

import MesPaiements from "./screens/MesPaiements"; // Ecran pour afficher les différentes facturation d'un User
import Offrir from "./screens/Offrir"; // Ecran pour afficher les différentes facturation d'un User
import EventScreen from "./screens/EventScreen";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import CheckYourEmail from "./screens/CheckYourEmail";
import ForgotPassword from "./screens/ForgotPassword";
import Successfully from "./screens/Successfully";
import category from "./reducers/category";
import user from "./reducers/user";
import screen from "./reducers/screen";

const store = createStore(
  combineReducers({ token, category, user, screen, wishModalSeen })
);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Fonction pour naviguer dans l'"Accueil"

function StackNavigatorHome() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyHomeScreen" component={MyHomeScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="EventScreen" component={EventScreen} />
      <Stack.Screen name="BookingValidation" component={BookingValidation} />
    </Stack.Navigator>
  );
}

//Fonction pour naviguer dans les "Tickets"

function StackNavigatorTicket() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Ticket" component={TicketsScreen} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} />
      <Stack.Screen name="TicketValidation" component={TicketValidation} />
    </Stack.Navigator>
  );
}
//Fonction pour naviguer dans les "Favoris"

function StackNavigatorWish() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favoris" component={WishScreen} />
      <Stack.Screen name="WishDetailScreen" component={WishDetailScreen} />
    </Stack.Navigator>
  );
}

//Fonction pour naviguer dans mon "Compte"

function StackNavigatorAccount() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
      <Stack.Screen name="MySubscripton" component={MySubscriptionScreen} />
      <Stack.Screen name="MyParameter" component={MyParameterScreen} />
      <Stack.Screen name="MyPastReservations" component={MyPastReservations} />
      <Stack.Screen name="SponsorshipScreen" component={SponsorshipScreen} />
      
      <Stack.Screen name="subscriptionChoice" component={subscriptionChoice} />
      <Stack.Screen name="subscriptionChange" component={subscriptionChange} />
      <Stack.Screen name="Flaner" component={FlanerSubscription} />
      <Stack.Screen name="Explorer" component={ExplorerSubscription} />
      <Stack.Screen name="Approfondir" component={ApprofondirSubscription} />
      <Stack.Screen name="MesPaiements" component={MesPaiements} />
      <Stack.Screen name="Offrir" component={Offrir} />
      <Stack.Screen
        name="SubscriptionValidation"
        component={SubscriptionValidation}
        options={{ unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
}

// const tabBarAccountScreenListener = ({navigation}) => ({
//   tabPress: () => {
//     navigation.reset({
//       index: 0,
//       routes:[{name: 'Compte'}]
//     })
//   }
// })

const tabStackResetListener = ({ navigation }) => ({
  tabPress: () =>
    navigation.dispatch(
      CommonActions.reset({
        routes: [{ name: "MyAccountScreen" }],
      })
    ),
});

export default function App() {
  const BottomNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name == "Accueil") {
              iconName = "ios-home-sharp";
            } else if (route.name == "Ticket") {
              return <Entypo name="ticket" size={25} color={color} />;
            } else if (route.name == "Favoris") {
              iconName = "ios-heart";
            } else if (route.name == "Compte") {
              return (
                <MaterialCommunityIcons
                  name="account-circle"
                  size={24}
                  color={color}
                />
              );
            }

            return <Ionicons name={iconName} size={25} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#383838",
          inactiveTintColor: "#FFFFFF",
          style: {
            backgroundColor: "#CABEA8",
          },
        }}
      >
        <Tab.Screen name="Accueil" component={StackNavigatorHome} />
        <Tab.Screen name="Ticket" component={StackNavigatorTicket} />
        <Tab.Screen name="Favoris" component={StackNavigatorWish} />
        <Tab.Screen
          name="Compte"
          component={StackNavigatorAccount}
          listeners={tabStackResetListener}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="CheckYourEmail" component={CheckYourEmail} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Successfully" component={Successfully} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
