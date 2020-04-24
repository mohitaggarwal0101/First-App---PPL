import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Timeline from "./timeline";
import SinglePost from "./single_post";


const Stack = createStackNavigator();

export default class About_Posts extends React.Component{
  constructor(props){
    super(props);
  }




  render(){
    
    return(

      <Stack.Navigator initialRouteName="Time">
      <Stack.Screen options={{headerShown: false}} name="Time" component={Timeline} />
      <Stack.Screen  name="Single Post" component={SinglePost} />
      </Stack.Navigator>
      
    )
  }
}
// initialParams={{posts:this.props.route.params.posts}}