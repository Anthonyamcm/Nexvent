import React from "react";
import {View,StyleSheet, TouchableOpacity} from 'react-native';

import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import AuthRoute from "./AuthRoute";
import MainRoute from "./MainRoute";
import TagsContainer from "../Screens/Filters/Tags.container";

const fall = new Animated.Value(1);

class Root extends React.Component{
    
    render() {

        const Stack = createStackNavigator();

        return(
            <View style={{flex: 1}}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='AuthRoute' screenOptions={{headerShown: false}}>
                        <Stack.Screen name='AuthRoute' component={AuthRoute}/>
                        <Stack.Screen name='MainRoute' component={MainRoute} options={{ gestureEnabled: false}}/>

                        <Stack.Screen name='Tags' component={TagsContainer}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        )
    }
}

export{
    Root
}