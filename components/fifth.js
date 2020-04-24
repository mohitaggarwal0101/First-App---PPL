import 'react-native-gesture-handler';
import * as React from 'react';
import {View,Text,Button} from 'react-native'



export default function Fifth({navigation}) {
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"lightblue"}}>
            <Text>this is fifth</Text>
      <Button
        title="Go to Sixth"
        onPress={() => navigation.navigate('Sixth')}
      />
      </View>
    );
  }