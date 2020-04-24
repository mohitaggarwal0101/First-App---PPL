import 'react-native-gesture-handler';
import * as React from 'react';
import {View,Text,Button} from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export default function Eighth({navigation}) {
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>this is eighth inside fourth</Text>
      </View>
    );
  }