import React from "react";
import { createStackNavigator, CardStyleInterpolators  } from "@react-navigation/stack";

import SplashContainer from "../Screens/Launch/Splash/Splash.container";
import OnboardingContainer from "../Screens/Launch/Onboarding/Onboarding.container";
import RegistrationContainer from "../Screens/Launch/Onboarding/Registration.container";
import LoginContainer from "../Screens/Launch/Onboarding/Login.container"
import LocationContainer from "../Screens/Location/Location.container";

export default function AuthRoute(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>
            <Stack.Screen name='Splash' component={SplashContainer}/>
            <Stack.Screen name='Onboarding' component={OnboardingContainer}options={{cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}/>
            <Stack.Screen name='Login' component={LoginContainer}/>
            <Stack.Screen name='Registration' component={RegistrationContainer}/>
            <Stack.Screen name='Location' component={LocationContainer} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}/>
        </Stack.Navigator>
    )
}