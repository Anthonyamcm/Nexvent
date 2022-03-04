import React from "react";
import { SafeAreaView , View, Text, TouchableOpacity, Dimensions} from "react-native";
import styles from "./Account.style";
import * as Profile from '../../Components/Profile/Profile'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as appColors from '../../Components/colors/appColor'

class AccountContainer extends React.Component{



    render(){
        return(
            <SafeAreaView style={{flex: 1 ,backgroundColor: appColors.grey1, flexDirection: 'column', justifyContent: 'space-between'}}>
                
                <View style={styles.containerHome}>
                    <View style={styles.column}>
                        <Text style={styles.text}>{'Account'}</Text>
                        <Text style={[styles.text, {paddingVertical: 10, color: 'gray', fontSize: 20}]}>{Profile.userDetails.name}</Text>
                    </View>
                    <View style={[styles.column, {marginTop: 10}]}>
                        <TouchableOpacity style={styles.button}>
                            <MaterialIcon name={'account-outline'} size={28} style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>{'My Profile'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <MaterialIcon name={'cog-outline'} size={28} style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>{'App Settings'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <MaterialIcon name={'help-circle-outline'} size={28} style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>{'Help'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button}>
                            <MaterialIcon name={'shield-half-full'} size={28} style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>{'Privacy Policies & Terms'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={this.logoutPressed}
                            >
                            <Icon name={'log-out-outline'} size={28} style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>{'Log Out'}</Text>
                        </TouchableOpacity>

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