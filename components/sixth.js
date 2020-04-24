import 'react-native-gesture-handler';
import * as React from 'react';
import {View,Text,Button} from 'react-native'



export default function Sixth({navigation}) {
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>this is Sixth</Text>
      <Button
        title="Go to home"
        onPress={() => navigation.navigate('Home')}
      />
      </View>
    );
  }