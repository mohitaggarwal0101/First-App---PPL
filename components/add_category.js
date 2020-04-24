import 'react-native-gesture-handler';
import React,{Component} from 'react'
import { View, Text, TextInput,Image ,ScrollView, Picker,TouchableOpacity,BackHandler } from 'react-native';
import { Form, Button,Input } from 'native-base';
// import ValidationComponent from 'react-native-form-validator';
import Axios from 'axios';
import ImagePicker from 'react-native-image-picker'
// import { response } from 'express';
// import { request } from 'http';
// import { json } from 'body-parser';

export default class AddCategory extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      category: "",
      thumbnail: null ,
      msg: "",
      msgImage:"",
      categoryArr:[],
      categoryId: '',
    }
  };

  onChange=(key,val)=>{
    this.setState({[key]: val})

  }

handleChoosePhoto = () => {
  const options = {
    // quality: 1.0,
    // maxWidth: 500,
    // maxHeight: 500,
    // storageOptions: {
    //   skipBackup: true
    // }

    noData: true,
    mediaType: 'photo',
  }

  ImagePicker.launchImageLibrary(options, response => {
  
        if (response.didCancel) {
          console.warn('User cancelled photo picker');
          this.setState({msgImage:""})
        }
        else if (response.error) {
          console.warn('ImagePicker Error: ', response.error);
          this.setState({msgImage:""})
        }
        else if (response.customButton) {
          console.warn('User tapped custom button: ', response.customButton);
          this.setState({msgImage:""})
        }
        else {
          let source = { uri: response.uri };
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          // this.setState({image:source})
          
          const img = {
            uri: response.uri,
            type: response.type,
            name: response.fileName
          }

          this.setState({thumbnail:response})
          this.setState({msgImage:response.fileName})
          
        }
  })

} 
// call

componentDidMount(){
  BackHandler.addEventListener("hardwareBackPress");
}

onUpload=()=>{
    console.log("on upload");
    if(this.state.category.length === 0 || this.state.msgImage.length === 0)
    {
      this.setState({msg: "please fill both the input fields"})

      setTimeout(()=>{
        this.setState({msg:""});
      },2500)
    }
    else
    {   
        let formdata = new FormData();

        formdata.append("image",{
          uri: this.state.thumbnail.uri,
          type: this.state.thumbnail.type,
          name: this.state.thumbnail.fileName
        });

        formdata.append("category",this.state.category);

        const config = {
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data',
          },
         };


        Axios.post("http://192.168.43.246:4040/category/addCategory", formdata,config).then((response)=>{

          console.log("category is added+++++++",response.data); 
          
          // this.props.route.params.setCat(response.data);

          if(response.data.msg === "category with this name is already in the list")
          {
            this.setState({msg : response.data.msg});

            setTimeout(()=>{
              this.setState({msg:""});
            },2500)
          }
          else
          {
            this.props.route.params.setCat(response.data)

              this.props.navigation.navigate("ShowCategories");
            
          }


        })
        // .then(()=>{

        //   this.props.navigation.navigate("ShowCategories");
        // })

    }
}  

   
  render(){

    let style={
      forView:{
        marginTop:15
      },

      forText:{
        marginLeft:4,
        fontSize:20
      },

      forButton:{
        borderRadius:15,
        backgroundColor:"lightgreen",
        width:155,
      }
    }

  return(
    <View style={{width:"100%",height:"100%",backgroundColor:"lightblue"}}>
      <ScrollView>
    <View style={{margin: 30}}>
      
      {this.state.msg.length != 0 && <Text style={{fontSize:20,color:"red"}}>{this.state.msg}</Text> }

      <View style={style.forView}>
      <Text style={style.forText}>Category Name:</Text>
      <TextInput onChangeText={(value)=> this.onChange("category",value)} placeholder="category" style={{borderBottomWidth:1,fontSize:18}} />
      </View>

      <View style={{marginTop:30}}>
      <TouchableOpacity onPress={()=>this.handleChoosePhoto()} style={{height:50,backgroundColor:"lightgreen",justifyContent:"center",alignItems:"center",borderRadius:15}}>
        <Text style={{fontSize:25,fontWeight:"bold",}}>Choose Thumbnail</Text>
        </TouchableOpacity>
      {this.state.msgImage.length !=0 && <Text style={{marginLeft:6}}>{this.state.msgImage}</Text>}
      </View>

      <View style={{ marginTop:20}}>
      <TouchableOpacity onPress={()=>this.onUpload()} style={{height:50,backgroundColor:"lightgreen",justifyContent:"center",alignItems:"center",borderRadius:15}}>
        <Text style={{fontSize:25,fontWeight:"bold"}}>
          Add To List
        </Text>
      </TouchableOpacity>
      </View>

    </View>
    </ScrollView>
    </View>
  );
  }
};

// const headers={
//     'content-type': 'application/json',
//         Accept: 'application/json',
// }

// Axios.post("http://192.168.43.246:8000/addCategory",fd,headers).then((response)=>{
    
// console.log(response.data);