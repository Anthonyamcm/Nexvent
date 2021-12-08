import React from "react";
import { SafeAreaView , View, Text, TouchableOpacity, Dimensions} from "react-native";
import styles from "./Account.style";
import * as Profile from '../../Components/Profile/Profile'
import Icon from 'react-native-vector-icons/Ionicons'

class AccountContainer extends React.Component{



    render(){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={styles.containerHome}>
                    <View style={styles.top}>
                        <Text style={styles.text}>{'Account'}</Text>
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