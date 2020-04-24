import 'react-native-gesture-handler';
import * as React from 'react';
import {View,Text,Button,AsyncStorage,BackAndroid,BackHandler,SafeAreaView,Alert} from 'react-native'

// import AsyncStorage from '@react-native-community/async-storage';

// import Icon from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';

import UploadPost from "./upload_post";
import Myprofile from "./myProfile";
import About_Categories from "./about_categories";
import About_Posts from "./about_posts";

// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Axios from "axios";

const Tab = createMaterialBottomTabNavigator();

export default class Main extends React.Component{
  constructor(props){
    super(props);
    
  }

  componentDidMount(){
    // BackHandler.addEventListener("hardwareBackPress",() => {
    //   Alert.alert("Hold on!", "Are you sures you want to exit?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() },
  
    //   ]);
    //   return true;
    // });
    
  }

  render(){
  
    return (

        <Tab.Navigator initialRouteName="Timeline" 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
         
            let iconName;

            if (route.name === 'Timeline') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';

                // gesturesEnabled: false;
                // {this.setState({temp:20})}

            } else if (route.name === 'Categories') {
              iconName = focused ? 'ios-apps' : "ios-apps" 

            }
            else if (route.name === 'Uploadpost') {
              iconName = focused ? 'ios-camera' : "ios-camera" 

             
            }
            else if (route.name === 'My Profile') {
              iconName = focused ? 'md-person' : "md-person" 

            }

            // You can return any component that you like here!
            
            return <Ionicons name={iconName} size={30} color={color} />;
          },
        })} 
        
        barStyle={{backgroundColor:"white",}} >
        
        <Tab.Screen name="Timeline" component={About_Posts} />
        <Tab.Screen name="Uploadpost" component={UploadPost} />
        <Tab.Screen name="Categories" component={About_Categories}  />
        <Tab.Screen name="My Profile" component={Myprofile} initialParams={{temp: 10}} />
        
        </Tab.Navigator>
    );
  }
  }

  // tabBarOptions={{activeTintColor:"dodgerblue",tabStyle:{},labelStyle:{fontSize:14}}} >
  // initialParams={{ posts:this.state.allPosts }}
//   showIcon: true
// options={{tabBarOptions:{ showIcon:true ,tabBarIcon:()=>(<Icon name="imge" size={30}/>)}}}

// ? 'ios-information-circle-outline'
// : 'ios-information-circle';
// iconName = focused ? 'ios-list-box' : 'ios-list';
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;