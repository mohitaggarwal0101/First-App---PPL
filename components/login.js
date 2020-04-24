import 'react-native-gesture-handler';
import React from 'react'
import { View, Text, TextInput, ScrollView} from 'react-native';
import {  Button } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';

import Axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {emailCheck} from "../utils/index";
import {router} from "../utils/index"

const Stack = createStackNavigator();

export default class Login extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      msg:""
    }
  }

  onChange=(key,val)=>{
    this.setState({[key]: val})

    // const alph= /^[a-zA-Z]*$/
    
    // const num= /^[0-9]+$/
    // const phone= /[0-9]|[5]/

    // const mail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    // if(alph.test(val))
    // {
    //   console.warn("valid text")
    // }
    // else
    // {
    //   console.warn("invalid");
    // }

    
  }

  onLogin = ()=>{
    // console.log("the state is",this.state)

    // const mail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    if(this.state.email.length === 0 || this.state.password.length === 0)
    {
      this.setState({msg:"every input field must be filled to login"})

      setTimeout(()=>{
        this.setState({msg:""})
      },2500)
    }
    else if(!emailCheck.email(this.state.email))
    {
      this.setState({msg:"email format is incorrect"})

      setTimeout(()=>{
        this.setState({msg:""})
      },2500)
    }
    else
    {
      // console.warn("correct");
      // this.props.history.push()
      // console.log("in elseeeeeeeeeeeeeee and the state is#####",this.state);
      
      Axios.post(router.SERVER_URL + router.ROUTES.LOGIN,this.state).then((response)=>{
      // console.log(response.data);

      if(response.data.msg === "incorrect info")
      {
        this.setState({msg:"either email-id or password is incorrect"})

        setTimeout(()=>{
          this.setState({msg:""})
        },2500)
      }
      else
      {
        console.log("before adding to local storage");

        const _storeData = async ()=> {
          try {
            await AsyncStorage.setItem("username",response.data[0].username);
            await AsyncStorage.setItem("email",response.data[0].email);

            // console.log("data is stored!!!!!!!",_storeData())

            this.props.navigation.navigate("Main");
          }
          catch(err)
          {
            console.log("error is comming in storing locally",err);
          }

          
        }

          _storeData();
      }
      
    })
    }
    
  }
   
  render(){
// console.log("fun isssssssss",emailCheck);

  //  console.log("routersss",router);

    let style={
      forView:{
        marginTop:15
      },

      forText:{
        marginLeft:6,
        fontWeight:"bold"
      },

      forInput:{
        height: 40,
        borderRadius: 10, 
        borderWidth: 2,
        backgroundColor:"white"
      },

      forButton:{
        borderRadius:15,
        backgroundColor:"lightgreen",
        width: "auto",
        // backgroundColor:"black",
        // borderWidth:3,
        // alignSelf:"center"
        // justifyContent:"center",
        // align
      }
    }

  return(
    <View style={{width:"100%",height:"100%",backgroundColor:"lightblue"}}>
      <ScrollView>
    <View style={{margin: 30}}>

      <Text style={{textAlign:"center", fontSize:40,fontWeight:"bold",}}>Login</Text>
      { this.state.msg.length !=0 && <Text style={{color:"red",fontSize:18}}>{this.state.msg}</Text>}

      <View style={style.forView}>
      <Text style={style.forText}>EMAIL-ID:</Text>
      <TextInput ref="email" onChangeText={(value)=> this.onChange("email",value)} placeholder="email-id" style={style.forInput} required="true"/>
      </View>

      <View style={style.forView}>
      <Text style={style.forText}>PASSWORD:</Text>
      <TextInput type="password" secureTextEntry={true} onChangeText={(value)=> this.onChange("password",value)} placeholder="password" style={style.forInput} required/>
      </View>

      {/* <Button title="login" onPress={this.onLogin} style={{marginTop: 20, width:150, alignSelf:"center",borderRadius:15,backgroundColor:"blue", textAlign:"justify",backgroundColor:"lightgreen"}}><Text style={{marginHorizontal:59}}>login</Text></Button> */}
      
      <View style={style.forView}><Text style={style.forText}>if you don't have any account, click on sign up</Text></View>

      <View style={{flex:1,flexDirection:"row", justifyContent: 'space-around', marginTop:15}}>
      <Button onPress={()=>this.props.navigation.navigate("SignUp")} style={style.forButton}><Text style={{fontSize:20,marginHorizontal:30}}>Sign up</Text></Button>
      <Button onPress={()=>this.onLogin()} style={style.forButton}><Text style={{marginHorizontal:35,fontSize:20}}>Login</Text></Button>
      </View>

    </View>
    </ScrollView>
    </View>
  );
  }
};