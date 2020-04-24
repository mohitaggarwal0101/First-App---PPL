import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SinglePost from "./single_post";
import AddCategory from "./add_category"

const Stack = createStackNavigator();

export default class App extends React.Component{
  render(){
    return(

      <NavigationContainer>
      <Stack.Navigator initialRouteName="single">
      <Stack.Screen options={{headerShown: false}} name="single" component={SinglePost} />
      <Stack.Screen options={{headerShown: false}} name="add" component={AddCategory} />
      
      </Stack.Navigator>
      </NavigationContainer>
      
    )
  }
}

