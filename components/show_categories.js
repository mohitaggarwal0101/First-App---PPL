import 'react-native-gesture-handler';
import React,{Component} from 'react'
import { View, Text, TextInput,Image ,ScrollView, TouchableOpacity } from 'react-native';
import { Form, Button,Input } from 'native-base';
// import ValidationComponent from 'react-native-form-validator';
import Axios from 'axios';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { response } from 'express';
// import ImagePicker from 'react-native-image-picker'

export default class ShowCategory extends React.Component{
    constructor(props){
      super(props);

      this.state={
        allCategories: [],
        temp:""
      }

      // console.log("in constructorrrrrrrrrrrr");
    };

    setCategory = (value) => {
      this.setState({allCategories:value});
    }


    componentDidMount(){
      Axios.post("http://192.168.43.246:4040/category/getCategories").then((response)=>{

        // console.log("all categories are++++++++++",response.data);

        this.setState({allCategories: response.data});
        
        });

        console.log("in component did mounttttttt of show_categories");

        // this.props.navigation.setParams({temp: "hello universe"});
    }

      render(){

        // console.log("in renderrrrrrrrrrrr----",this.state.temp);

        return(
          <View>
          <ScrollView >

            <View style={{width:"100%",borderColor:"grey",backgroundColor:"lightblue"}}>

            <Text style={{textAlign:"center", fontSize:30,fontWeight:"bold",margin:10,fontFamily:"fantasy"}}>Categories</Text>

              {
                this.state.allCategories.map((item)=>{
                  return(
                    <View key={item._id} style={{borderTopWidth:1,borderTopColor:"grey"}}>
                      
              <View style={{height:"auto", backgroundColor:"lightgreen", flexDirection:"row",}}>
                <View style={{flex:2,justifyContent:"center",alignItems:"center" }}>

                  <Image source={{uri:("http://192.168.43.246:4040/myfiles/" + item.thumbnail)}} style={{width:80,height:80,marginTop:5,marginBottom:5,borderRadius:10}} />
                
                </View >
                
                <View style={{flex:3,justifyContent:"center",alignItems:"center"}}>
                  
                  <TouchableOpacity >
                  <Text style={{fontFamily:"fantasy",fontSize:20,}}>{item.category}</Text>
                  </TouchableOpacity>
                    
                </View>
              </View>
              
              </View>
                  )
                })
              }

              {/* <Button onPress={()=>this.props.navigation.navigate("Add Category",{setCat: this.setCategory})} style={{backgroundColor:"lightblue",borderRadius:5}}><Text style={{marginLeft:75, fontSize:30,margin:10,fontFamily:"fantasy"}}>Add Category</Text></Button> */}

              <TouchableOpacity onPress={()=>this.props.navigation.navigate("Add Category",{setCat: this.setCategory})} style={{backgroundColor:"lightblue",borderTopWidth:1,borderTopColor:"grey"}}>
                <Text style={{textAlign:"center", fontSize:30,fontWeight:"bold",margin:10,fontFamily:"fantasy"}}>Add Category</Text>

              </TouchableOpacity>

            </View>

          </ScrollView>
          </View>
        )
      }

}