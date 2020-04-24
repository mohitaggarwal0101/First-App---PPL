import React,{Component, useState, useEffect} from 'react'
import { View, Text,Button ,TextInput,Image,ScrollView, FlatList, TouchableOpacity,BackHandler,Alert } from 'react-native';
import { Form,Input } from 'native-base';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default function Myprofile ({navigation}){


        const [email,setEmail] = useState("");
        const [username,setUsername] = useState("");
        const [myPosts,setMyPosts] = useState([]);


    const LatestFirst = () =>{
      Axios.post("http://192.168.43.246:4040/post/myPosts",{"email": email}).then((response) => {

          // this.setState({ myPosts: response.data.reverse()});

          setMyPosts(response.data.reverse());
      })
    }

    const OldestFirst = () => {
      Axios.post("http://192.168.43.246:4040/post/myPosts",{"email": email}).then((response) => {
          
          // this.setState({ myPosts: response.data });

          setMyPosts(response.data);
      })
    }

    useEffect(()=>{

      const _retrieveData = async ()=>{
        try{
          const value_email = await AsyncStorage.getItem("email");
          const value_username = await AsyncStorage.getItem("username");

          await setEmail(value_email);
          await setUsername(value_username);

          console.log("local storage-------",value_email,email);

          Axios.post("http://192.168.43.246:4040/post/myPosts",{"email": value_email}).then((response) => {

          // this.setState({ myPosts: response.data.reverse()});

          setMyPosts(response.data.reverse());
      })
        }
        catch(err)
        {
          console.log("data is not retrieve from local stroage",err);
        }
      }

      _retrieveData();

      

    },[])


    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // The screen is focused
        // Call any action

        console.log("in addListener of my Profile",email);

        const _retrieveData = async ()=>{
          try{
            const value_email = await AsyncStorage.getItem("email");
            const value_username = await AsyncStorage.getItem("username");
  
            await setEmail(value_email);
            await setUsername(value_username);
  
            console.log("local storage-------",value_email,email);
  
            Axios.post("http://192.168.43.246:4040/post/myPosts",{"email": value_email}).then((response) => {
  
            // this.setState({ myPosts: response.data.reverse()});
  
            setMyPosts(response.data.reverse());
        })
          }
          catch(err)
          {
            console.log("data is not retrieve from local stroage",err);
          }
        }
  
        _retrieveData();

      });



      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);


        return(

          <View >
                <ScrollView>
                    <View style={{ backgroundColor: "lightblue" }}>
                        
                        <View style={{ width:"100%", flexDirection: "row", justifyContent: "space-around", marginTop: 30,paddingBottom:10 }}>
                            <View style={{flex:4,justifyContent:"center",alignItems:"center" }}>
                                <Image source={require('../images/icon_05.png')} style={{ width:100,height:100, borderRadius: 70, }} />
                                <Text style={{fontSize:20,fontWeight:"bold",marginTop:2,fontFamily:"fantasy"}}>{username}</Text>
                            </View>

                            <View style={{flex:3,justifyContent:"center",alignItems:"center",}}>
                              <Text style={{fontSize:30}}>{myPosts.length}</Text>
                              <Text style={{fontSize:20,fontWeight:"bold",fontFamily:"fantasy"}}>Posts</Text>

                            </View>

                            <View style={{flex:3,justifyContent:"center",alignItems:"center",}}>
                              <Text style={{fontSize:30}}>256</Text>
                              <Text style={{fontSize:20,fontWeight:"bold",fontFamily:"fantasy"}}>Friends</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{ marginBottom: 15, width: "100%", flexDirection: "row", height: 60, backgroundColor: "lightblue", borderTopWidth: 3, borderTopColor: "grey" }}>
                        <TouchableOpacity onPress={()=> LatestFirst()} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Image source={require('../images/img_3.png')}/><Text >Latest First</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=> OldestFirst()} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Image source={require('../images/img_2.png')}/><Text>Oldest First</Text></TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Image source={require('../images/timeline_img.png')}/><Text>Edit Profile</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=> navigation.navigate("Home")} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Image source={require('../images/img_5.png')}/><Text>Logout</Text></TouchableOpacity>
                    </View>

                    {myPosts.map((item) => {

return (
<View key={item._id} style={{ width: "99.3%", marginLeft: 1, marginBottom: 20 }}>
<View style={{ borderTopColor: "lightgreen", borderTopWidth: 2, }}>

    <View style={{ backgroundColor: "lightblue", height: 40, flexDirection: "row", }}>
        <View style={{ flex: 1, flexWrap: "wrap", justifyContent: "center" }}>
            <Image source={require('../images/img_6.png')} style={{ marginLeft: 10 }} />
            <Text style={{ marginLeft: 10, fontSize: 18, fontFamily:"fantasy" }}>{item.username}</Text>
        </View>

        <View style={{ flex: 1, flexWrap: "wrap", justifyContent: "center", alignContent: "flex-end", }}>
            <Image source={require('../images/btn_icona.png')} style={{ marginRight: 10, height: 25 }} />
            <Text style={{ marginRight: 10, fontFamily:"fantasy" }}>{item.category}</Text>
        </View>
    </View>

    <View style={{ backgroundColor: "lightgrey", height: 40, flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}>
        <Text style={{ marginLeft: 10,fontFamily:"fantasy" }}>{item.date} </Text>
        <Text style={{ marginRight: 10, fontFamily:"fantasy"}}>{item.time}</Text>
    </View>

    <Image source={{uri:("http://192.168.43.246:4040/myfiles/" + item.file)}} style={{height:250,width:"100%",}} />
    

    <View style={{ width: "100%", height: 40, flexDirection: "row", marginTop: 3, backgroundColor: "lightgrey" }}>
        <TouchableOpacity onPress={() => navigation.navigate("Single Post",{id: item._id})} style={{ flex: 2,justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <Image source={require('../images/icon_003.png')} style={{ marginLeft: 10 }} />
            <Text>{item.likes} Likes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Single Post",{id: item._id})} style={{ flex: 3, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <Image source={require('../images/icon_004.png')} style={{ marginLeft: 10 }} />
            <Text >{item.comments} comments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 2, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <Image source={require('../images/icon_001.png')} />
            <Text>  0 share</Text>
        </TouchableOpacity>
    </View>

    <View style={{ padding: 10, flexDirection: "row", backgroundColor: "lightblue" }}>
        <Image source={require('../images/pic_small.png')} />
        <Text style={{ marginHorizontal: 7 }}><Text style={{ fontSize: 18, fontWeight: "bold", paddingRight: 10 }}>{item.username}  </Text>{item.postName}</Text>
    </View>

</View>
</View>)
})}

                </ScrollView>

            </View>

            
            
        )
    
}