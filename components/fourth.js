import 'react-native-gesture-handler';
// import 'react-native-reanimated'
import * as React from 'react';
import {View,Text,Button, StyleSheet, StatusBar} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

import Seventh from "./seventh";
import Eighth from "./eighth";

// const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default function Forth({navigation}) {
    return (
      // <NavigationContainer>
      // <Drawer.Navigator initialRouteName="seven">
      //   <Drawer.Screen name="seven" component={Seventh} />
      //   <Drawer.Screen name="eight" component={Eighth} />
      // </Drawer.Navigator>
    // </NavigationContainer>

      // <View>
      //   <Text>vdmnreiimve</Text>
      // </View>
      
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"lightblue"}}>
            <Text>this is Fourth</Text>
            <View style={{marginTop: 10}}>
      <Button
        title="Go to Fifth"
        onPress={() => navigation.navigate('Fifth')}
      />
      </View>
      </View>
    );
  }