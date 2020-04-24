import React,{Component} from 'react'
import { View, Text, TextInput,Image,ScrollView,Button,TouchableOpacity, } from 'react-native';
import { Form,Input } from 'native-base';
// import ValidationComponent from 'react-native-form-validator';
// import ValidationComponent from 'react-native-form-validator';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';



export default class SinglePost extends React.Component{
    constructor(props){
        super(props);

        var dat = new Date();

        this.state = {
            comment:"",
            singlePost:{},
            allComments:[],
            likes:0,
            email:"",
            username:"",
            file:"",

        }
    };

handleChange=(key,val)=>{
    this.setState({[key]: val})
    
    }

handleComment = ()=>{
    // console.log("comment issssssssss",this.state.comment);

    if(this.state.comment.length != 0)
    {
        Axios.post("http://192.168.43.246:4040/comment/addComment",this.state).then((response)=>{
        
        // console.log("result of add comment",response.data);    

        Axios.post("http://192.168.43.246:4040/comment/getComments",this.state).then((response)=>{

          this.setState({allComments:response.data.commentInfo})
        //   console.log("result of get comments",response.data);  
        })

        this.setState({comment:""});
    })
    }

}

handleLikes = () => {
    console.log("on Likes");

    Axios.post("http://192.168.43.246:4040/comment/onlike",this.state).then((response)=>{
        
        // console.log("result of get likessssss",response.data[0].likes.length);

        this.setState({likes : response.data[0].likes.length})
    })
}

 componentDidMount(){
    //  console.log("in single post______",this.props.route.params.id);

     Axios.post("http://192.168.43.246:4040/post/getSinglePost",{id:this.props.route.params.id}).then((response)=>{
          
         this.setState({singlePost:response.data[0]});
         this.setState({likes:response.data[0].likes});
         this.setState({file:response.data[0].file});
 
     }).then(()=>{
        // console.log("singleeeeeee",this.state.singlePost);

        Axios.post("http://192.168.43.246:4040/comment/getComments",this.state).then((response)=>{

          this.setState({allComments:response.data.commentInfo})
        //   console.log("result of get comments",response.data);  
        })
     }).then(()=>{
        const _retrieveData = async ()=>{
            try{
              const value_email = await AsyncStorage.getItem("email");
              const value_username = await AsyncStorage.getItem("username");
        
              this.setState({email:value_email});
              this.setState({username:value_username});
            }
            catch(err)
            {
              console.log("data is not retrieve from local stroage",err);
            }
          }
        
          console.log("function^^^^^^^^",_retrieveData()); 
     })
 }   

 componentWillUnmount(){
     console.log("i am unounting");
 }

    render(){
        return(
            <View>
            <ScrollView>
            <View style={{paddingBottom:15}}>

            <View>

            <View style={{width:"100%",marginTop:15 ,marginLeft:1,marginRight:1}}>
                    
                    <View style={{ borderTopColor:"lightgreen",borderBottomWidth:0,borderTopWidth:2,}}>
                        
                        <View style={{backgroundColor:"lightblue",width:"100%",height:40 ,flexDirection:"row",}}>
                            <View style={{flex:1,flexWrap:"wrap",justifyContent:"center"}}>
                            <Image source={require('../images/img_6.png')} style={{marginLeft:10}} />
                            <Text style={{marginLeft:10,fontSize:18}}>{this.state.singlePost.username}</Text>
                            </View>

                            <View style={{flex:1,flexWrap:"wrap",justifyContent:"center",alignContent:"flex-end",}}>
                            <Image source={require('../images/btn_icona.png')} style={{marginRight:10,height:25}} />
                            <Text style={{marginRight:10}}>{this.state.singlePost.category}</Text>
                            </View>
                        </View>

                        <View style={{backgroundColor:"lightgrey",height:40,flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={{marginLeft:10,textAlignVertical:"center"}}>{this.state.singlePost.date}</Text>
                            <Text style={{marginRight:10,textAlignVertical:"center"}}>{this.state.singlePost.time}</Text>
                        </View>
                           
                        <Image source={{uri:("http://192.168.43.246:4040/myfiles/" + this.state.singlePost.file)}} style={{height:250,width:"100%",}} />
                        
                        <View style={{width:"100%",height:40,flexDirection:"row",marginTop:4,backgroundColor:"lightgrey"}}>
                            <TouchableOpacity onPress={()=> this.handleLikes()} style={{flex:2,justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                            <Image source={require('../images/icon_003.png')} style={{marginLeft:10}} />
                                <Text>{this.state.likes} Likes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Single Post")} style={{flex:3,justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                                <Image source={require('../images/icon_004.png')} style={{marginLeft:10}} />
                                <Text style={{}}>{this.state.allComments.length} comments</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex:2,justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
                            <Image source={require('../images/icon_001.png')} style={{marginLeft:10}} />
                                <Text>  0 share</Text>
                            </TouchableOpacity>    
                        </View>
                        
                        <View style={{flexWrap:"wrap",backgroundColor:"lightblue",flexDirection:"row"}}>
                        <Image source={require('../images/pic_small.png')} style={{marginLeft:10,justifyContent:"center",marginTop:4}} />
                        <Text style={{marginLeft:5,marginRight:-8,fontSize:18,fontWeight:"bold",textAlignVertical:"center"}}>mohit_aggarwal  </Text>
                        <Text style={{padding:8,fontSize:16,textAlignVertical:"center"}}>{this.state.singlePost.postName}</Text>
                        </View>

                    </View>
                    
                </View>

                
            </View>     

            
            <View style={{margin:20}}>
            <Text style={{fontSize:20,marginLeft:5}}>Add Comment:</Text>
            <TextInput onChangeText ={(value)=>this.handleChange("comment",value)} value={this.state.comment} style={{borderWidth:1.5,borderRadius:10,width:340,height:40,borderColor:"lightgrey"}}></TextInput>
            <View style={{width:100,margin:5}}>
            <Button title="Submit" onPress={()=>this.handleComment()}/>
            </View>
            </View>

            {
                this.state.allComments.map((item)=>{
                    return(
                        
                        <View key={item._id} style={{marginLeft:20,marginTop:10,flexDirection:"row",width:317}}>
                        {/* {console.log(item.comments)} */}
                        <Image source={require('../images/pic_small.png')} />
                        <Text style={{marginHorizontal:7}}><Text style={{fontSize:17,fontWeight:"bold",paddingRight:10,}}>{item.usernames}  </Text>{item.comments}</Text>
                        </View>
                    )
                })
            }
            
            
            </View>
            </ScrollView>
            </View>
            
        )
    }
}