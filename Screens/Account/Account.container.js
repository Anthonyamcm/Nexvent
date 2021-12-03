import React from "react";
import { SafeAreaView , View, Text} from "react-native";
import styles from "./Account.style";
import * as Profile from '../../Components/Profile/Profile'
import CustomButton from "../../Components/Button/Button";
import * as Profile from "../../Components/Profile/Profile";

class AccountContainer extends React.Component{
    render(){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={styles.containerHome}>
                    <View style={styles.top}>
                        <Text></Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    logoutPressed = () => {
        Profile.deleteUserDetails();
        this.props.navigation.navigate('Onboarding');
    }
}

export default AccountContainer;