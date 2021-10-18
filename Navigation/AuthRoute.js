import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashContainer from "../Screens/Launch/Splash/Splash.container";
import OnboardingContainer from "../Screens/Launch/Onboarding/Onboarding.container";

export default function AuthRoute(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Splash' component={SplashContainer}/>
            <Stack.Screen name='Onboarding' component={OnboardingContainer}/>
        </Stack.Navigator>
    )
}