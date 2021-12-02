import React from "react";
import { AppRegistry, SafeAreaView, View } from "react-native";
import Animated, { EasingNode } from "react-native-reanimated";
import styles from "./Splash.style";
import * as Profile from "../../../Components/Profile/Profile"
import * as API from "../../../Api/Api"

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

                console.log(userDetails)
                
                API.LOGIN_SUCCESS(userDetails)
                this.props.navigation.navigate('MainRoute');
                
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