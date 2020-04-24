import 'react-native-gesture-handler';
import * as React from 'react';
import {View,Text,Button} from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';

export default class First extends React.Component{
    render(){
    return (
        <View style={{ flex:1,alignItems:"center",justifyContent:"center"}}>
            {/* <Text>nsvnskm</Text>
            <TextInput style={{backgroundColor:"lightblue", width:100}} on/>
      <View style={{ marginTop:50}}> */}
      <Button
        title="Go to Second (login)"
        onPress={() => this.props.navigation.navigate('Second')}
        style={{}}
      />
      {/* </View> */}
      </View>
    );
    }
  }