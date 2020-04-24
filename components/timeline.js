import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react'
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, BackHandler, Alert } from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

import { NavigationContainer, } from '@react-navigation/native';
import { createBottomTabNavigator,NavigationEvents } from '@react-navigation/bottom-tabs';


export default function Timeline({navigation}){

    const [temp,setTemp] = useState(10);
    const [allPosts,setAllPosts] = useState([]);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");

    const LatestFirst = () =>{
        Axios.post("http://192.168.43.246:4040/post/getPosts").then((response) => {

            setAllPosts(response.data.reverse());
        })
    }

    const OldestFirst = () => {
        Axios.post("http://192.168.43.246:4040/post/getPosts").then((response) => {
            
            setAllPosts(response.data);
        })
    }

    const MostLiked = () => {

        Axios.post("http://192.168.43.246:4040/post/getPosts").then((response) => {
            
            setAllPosts(response.data.sort(function (a, b) { return a.likes - b.likes }).reverse());
        })

        // setAllPosts(allPosts.sort(function (a, b) { return a.likes - b.likes }).reverse());
    }

    const MostCommented = () => {

        Axios.post("http://192.168.43.246:4040/post/getPosts").then((response) => {
            
            setAllPosts(response.data.sort(function (a, b) { return a.comments - b.comments }).reverse());
        })

        // setAllPosts(allPosts.sort(function (a, b) { return a.comments - b.comments }).reverse());
    }

    const handleLikes = (value) => {
        console.log("on Likes");
    
        Axios.post("http://192.168.43.246:4040/comment/onlike",{"file": value}).then((response)=>{
            
            Axios.post("http://192.168.43.246:4040/post/getPosts").then((response) => {

            setAllPosts(response.data.reverse());

        })
        })
    }

    

    useEffect(()=>{
        console.log("knvsdk");

        Axios.post("http://192.168.43.246:4040/post/getPosts").then((response) => {

            setAllPosts(response.data.reverse());

        }).then(()=>{
            const _retrieveData = async ()=>{
                try{
                  const value_email = await AsyncStorage.getItem("email");
                  const value_username = await AsyncStorage.getItem("username");

                  setUsername(value_username);
                  setEmail(value_email);
                }
                catch(err)
                {
                  console.log("data is not retrieve from local stroage",err);
                }
              }

              _retrieveData();
            
            //   console.log("function^^^^^^^^",_retrieveData()); 
        })

        // BackHandler.addEventListener('hardwareBackPress', () => {return true});
        
        console.log("i am runnung each time --- componentDidmount");

    },[]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          // Call any action

          console.log("in addListener of timeline");
        //   console.log("i am runnung each time --- componentDidmount");

        // BackHandler.addEventListener('hardwareBackPress', () => {return true});

        // BackHandler.removeEventListener('hardwareBackPress', () => {return true});

        BackHandler.addEventListener("hardwareBackPress",() => {
            Alert.alert("Alert","Are you sures you want to exit?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => BackHandler.exitApp() },
      
            ]);
            return true;
          });

          Axios.post("http://192.168.43.246:4040/post/getPosts").then((response) => {
            // console.log("posts are",response.data);


            setAllPosts(response.data.reverse());

        })
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);


        return (
            <View>
                
                <ScrollView>
                    <View style={{ backgroundColor: "lightblue" }}>
                        <View style={{ height: 70, alignItems: "center", justifyContent: "center" }}>
                            <Image source={require('../images/logo.png')} />
                        </View>

                        <View style={{  flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingBottom: 15 }}>
                            <View style={{flex:2 }}>
                                <Image source={require('../images/lft_img1.png')} style={{ width: "auto", height: 125,marginHorizontal: 5 }} />
                            </View>

                            <View style={{ flex:3 ,height: "auto",}}>
                                <View >
                                    <Text>Name:</Text>
                                    <Text style={{ fontSize: 20, fontWeight:"bold" }}>{username}</Text>
                                </View>
                                <View style={{ marginTop:10 }}>
                                    <Text style={{ fontSize: 16 }}>Description:</Text>
                                    <Text >nkvsd vdk vdk  dkvdvm dv mdvdkv vdmvdv vkmd kmbr b kr  sdkvlvsdknlvsd  vsd</Text>
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={{  marginBottom: 20, width: "100%", flexDirection: "row", height: 70, backgroundColor: "lightblue", borderTopWidth: 2, borderTopColor: "grey" }}>
                        <TouchableOpacity onPress={() => LatestFirst()} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Image source={require('../images/img_3.png')}/><Text >Latest</Text><Text>First</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => OldestFirst()} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Image source={require('../images/img_2.png')}/><Text >Oldest</Text><Text>First</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => MostLiked()} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Image source={require('../images/img_4.png')}/><Text >Most</Text><Text>Liked</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => MostCommented()} style={{ flex: 1.3, justifyContent: "center", alignItems: "center" }}><Image source={require('../images/img_1.png')}/><Text >Most</Text><Text>Commented</Text></TouchableOpacity>
                    </View>


                    {allPosts.map((item) => {

                        return (<View key={item._id} style={{ width: "99.3%", marginLeft: 1, marginBottom: 20 }}>
                            <View style={{ borderTopColor: "lightgreen", borderTopWidth: 2, }}>

                                <View style={{ backgroundColor: "lightblue", width: "100%", height: 40, flexDirection: "row", }}>
                                    <View style={{ flex: 1, flexWrap: "wrap", justifyContent: "center" }}>
                                        <Image source={require('../images/img_6.png')} style={{ marginLeft: 10 }} />
                                        <Text style={{ marginLeft: 10, fontSize: 18 }}>{item.username}</Text>
                                    </View>

                                    <View style={{ flex: 1, flexWrap: "wrap", justifyContent: "center", alignContent: "flex-end", }}>
                                        <Image source={require('../images/btn_icona.png')} style={{ marginRight: 10, height: 25 }} />
                                        <Text style={{ marginRight: 10, }}>{item.category}</Text>
                                        
                                    </View>
                                </View>

                                <View style={{ backgroundColor: "lightgrey", height: 40, flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}>
                                    <Text style={{ marginLeft: 10, }}>{item.date} </Text>
                                    <Text style={{ marginRight: 10, }}>{item.time}</Text>
                                </View>

                                <Image source={{uri:("http://192.168.43.246:4040/myfiles/" + item.file)}} style={{height:250,width:"100%",}} />
                                

                                <View style={{ width: "100%", height: 40, flexDirection: "row", marginTop: 3, backgroundColor: "lightgrey" }}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Single Post",{id: item._id})} style={{ flex: 2, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                                        <Image source={require('../images/icon_003.png')} style={{ marginLeft: 10 }} />
                                        <Text>{item.likes} Likes</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => navigation.navigate("Single Post",{id: item._id})} style={{ flex: 3, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                                        <Image source={require('../images/icon_004.png')} style={{ marginLeft: 10 }} />
                                        <Text >{item.comments} comments</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flex: 2, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                                        <Image source={require('../images/icon_001.png')}  />
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
