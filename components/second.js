import 'react-native-gesture-handler';
import * as React from 'react';
import {View,Text,Button} from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export default function Second({navigation}) {
    return (
        <View style={{flex:1,justifyContent:"space-around",alignItems:"center",}}>
            
      <Button
        title="Go to first (sign up)"
        onPress={() => navigation.navigate('SignUp')}
      />
      

      <Button
        title="Go to third (timeline)"
        onPress={() => navigation.navigate('Third')}
      />
      </View>
    );
  }