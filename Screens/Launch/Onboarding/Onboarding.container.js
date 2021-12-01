import React from "react";
import { SafeAreaView , View, Image} from "react-native";
import CustomButton from "../../../Components/Button/Button";
import styles from "./Onboarding.style";

class OnboardingContainer extends React.Component {
    
    render() {
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={styles.mainContainer}>
                    <Image
                        style={{opacity: 1 , maxHeight: 100}}
                        resizeMode='contain'
                        source={require('../../../Images/nexvent-logo.png')}/>
                    <CustomButton
                        title='Log In'
                        shouldHaveGradient={true}
                        titleFontSize={24}
                        fontFamilt={'GTEestiDisplay-Medium'}
                        style={{width: 200, 
                        paddingTop: 40, 
                        shadowColor: "#0072ff",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        elevation: 5}}
                        onPress={() => {this.props.navigation.navigate('Login')}}/>
                    <CustomButton
                        title='Register'
                        titleFontSize={24}
                        fontFamily={'GTEestiDisplay-Medium'}
                        textColor={'gray'}
                        style={{width: 200, paddingTop: 20}}
                        onPress={() => {this.props.navigation.navigate('Registration')}}/>
                </View>
            </SafeAreaView>
        )
    }
}
export default OnboardingContainer;