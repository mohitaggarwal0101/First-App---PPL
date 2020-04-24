import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ShowCategory from "./show_categories";
import AddCategory from "./add_category";


const Stack = createStackNavigator();

export default class About_Categories extends React.Component{
  render(){
    return(

    //   <NavigationContainer>
      <Stack.Navigator initialRouteName="ShowCategories">
      <Stack.Screen options={{headerShown: false}} name="ShowCategories" component={ShowCategory} />
      <Stack.Screen  name="Add Category" component={AddCategory} />
      
      
      </Stack.Navigator>
    //   </NavigationContainer>
      
    )
  }
}

