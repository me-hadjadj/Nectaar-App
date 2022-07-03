import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";

function WishDetailScreen(props) {
  
    return ( 


<View style ={{ flex:1, alignItems : 'center', justifyContent: 'center', backgroundColor:'#9b59b6'}}>
        <Button title='Wish detail screen Go to Favoris'
            onPress={()=> props.navigation.navigate('Favoris')}
        />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WishDetailScreen;
