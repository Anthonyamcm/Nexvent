import React from "react";
import { SafeAreaView , View, Image} from "react-native-safe-area-context";
import styles from "./Onboarding.style";

class OnboardingContainer extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={styles.mainContainer}>
                    <Image
                    resizeMode='contain'
                    source={require('../../../Images/nexvent-logo.png')}/>
                </View>
            </SafeAreaView>
        )
    }
}
export default OnboardingContainer;