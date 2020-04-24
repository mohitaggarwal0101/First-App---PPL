import 'react-native-gesture-handler';
import * as React from 'react';
import {View,Text,Button, StyleSheet,TextInput,TouchableOpacity,ScrollView} from 'react-native'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { ScrollView } from 'react-native-gesture-handler';
// import { ceil } from 'react-native-reanimated';

export default function Home({navigation}) {
  
    return (
      <View style={{backgroundColor:"lightblue",height:"100%"}}>
        <ScrollView>
          
          <View style={{marginTop:30,backgroundColor:"lightblue"}}>
            <Text style={{alignSelf:"center",fontSize:60,fontWeight:"bold",fontFamily:"fantasy"}}>Welcome</Text>
            <Text style={{alignSelf:"center",fontSize:60,fontWeight:"bold",fontFamily:"fantasy"}}>To</Text>
            <Text style={{alignSelf:"center",fontSize:60,fontWeight:"bold",fontFamily:"fantasy"}}>The PPL</Text>
          </View>

          <View style={{justifyContent:"center",height:250,marginTop:"auto",marginBottom:"auto",}}>

          <View >
          <Text style={{marginLeft:15,fontSize:20}}>If You Are a New User</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("SignUp")} style={{backgroundColor:"lightgreen",height:50,margin:5}}>
             <Text style={{alignSelf:"center",fontSize:35}}>Sign up</Text>
            </TouchableOpacity> 
          </View>

          <View style={{marginTop:20}}>
          <Text style={{marginLeft:15,fontSize:20}}>If You Already Have An Account</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{backgroundColor:"lightgreen",height:50,margin:5}}>
             <Text style={{alignSelf:"center",fontSize:35}}>Login</Text>
            </TouchableOpacity> 
          </View>

          </View>

        </ScrollView>
        </View>
    );
  }

  // <View style={{flex:1,justifyContent:"space-around",alignItems:"center",}}>
            
  //     <Button
  //       title="Go to first (sign up)"
  //       onPress={() => navigation.navigate('SignUp')}
  //     />
      

  //     <Button
  //       title="Go to Second (login)"
  //       onPress={() => navigation.navigate('Login')}
  //     />
  //     </View>

{/* <Text style={{alignSelf:"center",fontSize:60}}>Welcome{"\n"}To{"\n"}MY PPL</Text> */}