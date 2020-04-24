import 'react-native-gesture-handler';
import React,{Component} from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Button, } from 'native-base';

import Axios from 'axios';

import {emailCheck} from "../utils/index";
import {router} from "../utils/index"

export default class Signup extends React.Component{
  constructor(props){
    super(props);

    this.state = {

      username:"",
      password:"",
      email:"",
      fname:"",
      lname:"",
      msg:"",
      forMail:""

    }
  }

  onChange=(key,val)=>{
    this.setState({[key]: val})
    
  }

  onSignUp = ()=>{
    console.log("the state is",this.state)

    // const alph=/^[a-zA-Z]*$/
    // const mail=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    // const phn=/^\d{10}$/
    // const age=/^[0-9]{1,2}[:.,-]?$/

    if(this.state.fname.length === 0 || this.state.lname.length === 0 || this.state.email.length === 0 || this.state.username.length === 0 || this.state.password.length === 0)
    {
      console.log("in if");

      this.setState({msg:"every input field must be filled to sign up"})

      setTimeout(()=>{
        this.setState({msg:""})
      },3000);

      this.setState({forMail:""});
    }
    else if(!emailCheck.email(this.state.email))
    {
      console.log("in else if");

      this.setState({forMail:"invalid email-id"});
      this.setState({msg:""});

      setTimeout(()=>{
        this.setState({forMail:""})
      },2500);
    }
    else
    {
      console.log("else");

      Axios.post("http://192.168.43.246:4040/user/signUp",this.state).then((response)=>{
      console.log("data on frontend",response.data);

      if(response.data.msg === "user exists")
      {
        console.log(response.data.msg);

        this.setState({forMail:"email already exists"})
        this.setState({msg:""})

        setTimeout(()=>{
          this.setState({forMail:""})
        },2500);
      }
      else
      {
        console.log("user created successfully");

        this.props.navigation.navigate("Login");
      }
    })
    }
    
  }
  
  render(){

    let style={
      forView:{
        marginTop:10,
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
        width:"auto",
      }
    }

  return(
    <View style={{width:"100%",height:"100%",backgroundColor:"lightblue"}}>
      <ScrollView>
    <View style={{margin: 30}}>
    
      {/* <Form> */}
      <Text style={{textAlign:"center", fontSize:30,fontWeight:"bold"}}>Sign up</Text>
      { this.state.msg.length != 0 && <Text style={{color:"red",fontSize:18}}>{this.state.msg}</Text>}

      <View style={style.forView}>
      <Text style={style.forText}>Username:</Text>
      <TextInput type="text" onChangeText={(value)=> this.onChange("username",value)} placeholder="enter your name" style={style.forInput}/>
      </View>
      
      <View style={style.forView}>
      <Text style={style.forText}>Password:</Text>
      <TextInput onChangeText={(value)=> this.onChange("password",value)}secureTextEntry={true} secureTextEntry={true} placeholder="password" style={style.forInput} />
      </View>

      <View style={style.forView}>
      <Text style={style.forText}>Email-id:</Text>
      <TextInput onChangeText={(value)=> this.onChange("email",value)} placeholder="enter your email" style={style.forInput}/>
      { this.state.forMail.length != 0 && <Text style={{color:"red",marginLeft:5}}>{this.state.forMail}</Text>}
      </View>

      <View style={style.forView}>
      <Text style={style.forText}>First name:</Text>
      <TextInput onChangeText={(value)=> this.onChange("fname",value)} placeholder="First name" style={style.forInput}/>
      </View>

      <View style={style.forView}>
      <Text style={style.forText}>Last name:</Text>
      <TextInput onChangeText={(value)=> this.onChange("lname",value)} placeholder="Last name" style={style.forInput}/>
      </View>

      {/* <Button title="Signup" onPress={this.onSignUp} style={{marginTop: 20, width:150, alignSelf:"center",borderRadius:15,backgroundColor:"lightgreen"}}><Text style={{ marginLeft:50}}>Sign up</Text></Button> */}
      {/* <ul>
        <li><Text>ncs</Text></li>
      </ul> */}
      {/* <ListItem title="vsdk" subtitle={"sdvj"}><Text>dvs</Text></ListItem> */}
      
      <View style={style.forView}><Text style={style.forText}>if you already have an account, click on login</Text></View> 

      <View style={style.forView,{flex:1,flexDirection:"row", justifyContent: 'space-around', marginTop:15}}>
      <Button onPress={()=>this.onSignUp()} style={style.forButton}><Text style={{marginHorizontal:25,fontSize:20}}>Sign up</Text></Button>
      <Button title="login" onPress={()=>this.props.navigation.navigate("Login")} style={style.forButton}><Text style={{marginHorizontal:35,fontSize:20}}>Login</Text></Button>
      </View>

      {/* //util */}

      {/* </Form> */}
     
    </View>  
    </ScrollView>
    </View>
  );
  }
};