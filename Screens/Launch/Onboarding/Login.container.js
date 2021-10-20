import React from "react";
import { View, SafeAreaView, Text } from "react-native";
import CustomInput from "../../../Components/Input/Input";
import styles from "./Login.style";
import CustomHeader from "../../../Components/Header/Header"

class LoginContainer extends React.Component{
    render(){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
            <CustomHeader
                title={'Log In'}
                onBackPressed={() => this.props.navigation.goBack(null)} />

            <View style={styles.mainContainer}>
                <CustomInput
                hint='Someone@email.com'
                title='Email'
                style={{width: 330, marginTop: 50}}/>
                <CustomInput
                hint='● ● ● ● ● ● ● ●'
                title='Password'
                style={{width: 330, marginTop: 50}}
                isDataHidden={true}
                hideInputWithoutReveal={false}/>
            </View>
            </SafeAreaView>
        )
    }
}

export default LoginContainer;