import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Tab1Screen(props) {
    return (
        <View style={{flex: 1, justifyContent: 'center',alignItems:'center'}}>
            <Text>Tab1</Text>          
            <Button title="Go subtab1" onPress={()=>{
                props.navigation.navigate("SubTab1")
            }}/>
        </View>
    )
}
