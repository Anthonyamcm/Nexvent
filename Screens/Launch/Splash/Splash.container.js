import React from "react";
import { AppRegistry, SafeAreaView, View } from "react-native";
import Animated, { EasingNode } from "react-native-reanimated";
import styles from "./Splash.style";
import * as Profile from "../../../Components/Profile/Profile"
import * as API from "../../../Api/Api"
import { Platform } from "react-native";
import { PERMISSIONS, check } from "react-native-permissions";

class SplashContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            logoHeight: new Animated.Value(0.5),
            logoOpacity: new Animated.Value(0.5)
        };
    }

    componentDidMount(){
        const{
            logoOpacity,
            logoHeight
        } = this.state
        
        Animated.timing(logoHeight, {
            toValue: 1,
            duration: 250,
            easing: EasingNode.linear,
            useNativeDriver: false
        }).start(() => {
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 250,
                easing: EasingNode.linear,
                useNativeDriver: false
            }).start();
        });

        this.checkForUser();
    }

    checkLocation = async () => {
        try {
            check(
                Platform.select({
                android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                })).then(res => {
                    console.log(res)
                    if(res !== 'granted'){
                        this.props.navigation.navigate('Location');
                    }else{
                        this.props.navigation.navigate('MainRoute');
                    }
                })
            } catch (error) {
                console.log("location set error:", error);
            }
    }

    checkForUser = async () => {
        const userDetailsJson = await Profile.getUserDetails();
        let userDetails;
        try {
            userDetails = JSON.parse(userDetailsJson);
            if (userDetails.email === null || userDetails.email === undefined)
                userDetails = JSON.parse(userDetails);
        } catch (error) { }

        setTimeout(() => {
            if (userDetails !== null && userDetails.email !== undefined) {
            
                Profile.setFastUserDetails(userDetails);

                
                API.LOGIN_SUCCESS(userDetails)
                this.checkLocation()

                
            } else {
            
                this.props.navigation.navigate('Onboarding');
            }
        },1000);
        
    }

    render() {

        const{
            logoOpacity,
            logoHeight
        } = this.state;

        const maxHeight = logoHeight.interpolate({
            inputRange: [0,1],
            outputRange: [0,100]
        });
        
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={styles.mainContainer}>
                    <Animated.Image
                        style={{opacity: logoOpacity , maxHeight: maxHeight}}
                        resizeMode='contain'
                        source={require('../../../Images/nexvent-logo.png')}/>
                </View>
            </SafeAreaView>
        )
    }

}

export default SplashContainer;