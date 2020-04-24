import React,{Component, useState, useEffect} from 'react'
import { View, Text, TextInput,Picker,TouchableOpacity,ScrollView,BackHandler,Alert } from 'react-native';
import { Form, Button,Input } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker'



export default function UploadPost ({navigation}){
  // constructor(props){
  //   super(props);

    // this.state = {
    //   postName: "",
    //   category: "Dogs",
    //   image: null,
    //   msg: "",
    //   msgImage:"",
    //   likes: 0,
    //   comments: 0,
    //   username: "",
    //   email: "",
    //   allCategories:[],
    //   temp:10,
    // }

    const [postName,setPostName] = useState("");
    const [category,setCategory] = useState("");
    const [image,setImage] = useState(null);
    const [msg,setMsg] = useState("");
    const [msgImage,setMsgImage] = useState("");
    const [likes,setLikes] = useState(0);
    const [comments,setComments] = useState(0);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [allCategories,setAllCategories] = useState([]);
    const [temp,setTemp] = useState(10);

    
    // };


const handleChoosePhoto = () => {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    }
  }
  // console.warn("nvkjds")

  ImagePicker.launchImageLibrary(options, response => {
    // console.log('Response => ', response);
    // console.warn("mvdnf");
  
        if (response.didCancel) {
          console.warn('User cancelled photo picker');
          // this.setState({msgImage:""})
          setMsgImage("");
        }
        else if (response.error) {
          console.warn('ImagePicker Error: ', response.error);
          // this.setState({msgImage:""})
          setMsgImage("");
        }
        else if (response.customButton) {
          console.warn('User tapped custom button: ', response.customButton);
          // this.setState({msgImage:""})

          setMsgImage("");
        }
        else {
          let source = { uri: response.uri };
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
          // this.setState({image:source})
          // this.setState({image:response})
          setImage(response);
          // this.setState({msgImage:response.fileName})
          setMsgImage(response.fileName);

          console.log("uriiiiiiiiiiiii isssss",response.uri);
          
        }
  })

}
// abhi yehi bnaya h sir
// databse m nhi store kraya abhi
// orr kuch bhi dikhana h sir?
const onUpload=()=>{

  console.log("postName:",postName);
  console.log("category:",category);
  // console.log("Image:",image);
  console.log("email:",email);

    if(postName.length === 0 || category.length === 0 )
    {
      // this.setState({msg: "please fill all input fields"})
      setMsg("please fill all input fields")

      setTimeout(()=>{
        // this.setState({msg:""});
        setMsg("");
      },2500)
    }
    else if(msgImage.length === 0)
    {
      // this.setState({msg: "please add an image"})

      setMsg("please add an image");

      setTimeout(()=>{
        // this.setState({msg:""});
        setMsg("");
        
      },2500)
    }
    else
    {
      // console.log("comming before axios");

      // console.log("image +++++++",this.state.image);

      const data = new FormData();

      data.append('fileData', {
      uri : image.uri,
      type: image.type,
      name: image.fileName
      });

      data.append("postName",postName);
      data.append("category",category);
      data.append("email", email);
      data.append("username", username);
      data.append("likes", likes);
      data.append("comments", comments);
      // data.append("email",AsyncStorage.getItem("email"));

      

      const config = {
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'multipart/form-data',
        },
       };

       console.log("data in data is ~~~~~~~~~~~",data);

       Axios.post("http://192.168.43.246:4040/post/uploadPost",data,config)
       .then((response)=>{       
         console.log("all posts are in upload posts",response.data);

          setPostName("");
          setImage(null);
          setCategory(response.data[0].category);
          setMsgImage("");

          navigation.navigate("Timeline");
       }).catch((err)=>{console.log(err)});

      // this.setState({msg: "post uploaded successfully"})

      // console.log("the state isssssss+++++++++++++++",this.state);
    }
}  

useEffect(()=>{

  const _retrieveData = async ()=>{
    try{
      const value_email = await AsyncStorage.getItem("email");
      const value_username = await AsyncStorage.getItem("username");

      // this.setState({email:value_email});
      // this.setState({username:value_username});

      setEmail(value_email);
      setUsername(value_username);
    }
    catch(err)
    {
      console.log("data is not retrieve from local stroage",err);
    }
  }

  console.log("function^^^^^^^^",_retrieveData()); 

},[])

useEffect(()=>{
  Axios.post("http://192.168.43.246:4040/category/getCategories").then((response)=>{

  console.log("categories areeeeeeee",response.data[0].category);

  // this.setState({allCategories:response.data});

  setAllCategories(response.data);

  // this.setState({category:allCategories[0]});

  setCategory(response.data[0].category);
  })
},[])

React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // The screen is focused
    // Call any action

    Axios.post("http://192.168.43.246:4040/category/getCategories").then((response)=>{

    // console.log("categories areeeeeeee",response.data);

    // this.setState({allCategories:response.data});
 
    setAllCategories(response.data)

      console.log("jbsvdjvs");
    

    // this.setState({category:allCategories[0]});
    setPostName("");
    setImage(null);
    setMsgImage("");

    setCategory(response.data[0].category);
    })

    console.log("in addListener of timeline");

  });

  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [navigation]);
   

    let style={
      forView:{
        marginTop:15
      },

      forText:{
        fontSize:20
      },

      forInput:{ 
        borderBottomWidth: 1,
        fontSize:18
      },

      forButton:{
        // borderRadius:15,
        backgroundColor:"lightgreen",
        // width:155,
      }
    }

  return(
    <View style={{width:"100%",height:"100%",backgroundColor:"lightblue"}}>
      <ScrollView>
    <View style={{margin: 30}}>
      
     
      <Text style={{textAlign:"center", fontSize:30,fontWeight:"bold"}}>Upload Post</Text>
      
      {msg.length != 0 && <Text style={{color:"red",fontSize:18}}>{msg}</Text> }
      <View style={style.forView}>
      <Text style={style.forText}>Post Name:</Text>
      <TextInput onChangeText={(value)=> setPostName(value)} value={postName} placeholder="post name" style={style.forInput} />
      </View>

      <View style={style.forView}>
      <Text style={style.forText}>Category:</Text>
      
      <View style={{borderBottomWidth:1,}}>
      <Picker selectedValue={category} onValueChange={(value) => setCategory(value)}>
      {allCategories.map((item)=>{
          return(
            <Picker.Item key={item._id} label={item.category} value={item.category} />
          )
        })}
      </Picker>
      </View>
      
      </View>

      <View style={{marginTop:20}}>
      <TouchableOpacity onPress={()=>handleChoosePhoto()} style={{height:45,backgroundColor:"lightgreen",justifyContent:"center",alignItems:"center",borderRadius:15}}>
        <Text style={{fontSize:30,fontWeight:"bold",}}>Choose image</Text>
        </TouchableOpacity>
      {msgImage.length !=0 && <Text style={{marginLeft:6}}>{msgImage}</Text>}
      </View>

      <View style={{ marginTop:15}}>
      <TouchableOpacity onPress={()=>onUpload()} style={{height:45,backgroundColor:"lightgreen",justifyContent:"center",alignItems:"center",borderRadius:15}}>
        <Text style={{fontSize:30,fontWeight:"bold"}}>Upload </Text>
      </TouchableOpacity>
      </View>

    </View>
    </ScrollView>

    </View>
  );
  
};