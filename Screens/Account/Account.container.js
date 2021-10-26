import React from "react";
import { SafeAreaView , View, Text} from "react-native";
import styles from "./Account.style";
import CustomHeader from "../../Components/Header/Header";
import CustomButton from "../../Components/Button/Button";

class AccountContainer extends React.Component{
    render(){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
            <CustomHeader
            title={'Account'}
            isModal={true}
            onBackPressed={() => this.props.navigation.goBack(null)} />
            <View style={styles.mainContainer}>
            </View>
            <View style={styles.bottom}>
            <CustomButton
                title='Log Out'
                shouldHaveGradient={true}
                gradientColours={['#ef473a','#cb2d3e']}
                titleFontSize={24}
                style={{
                        shadowColor: "#cb2d3e",
                        shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        elevation: 5}}
                        onPress={() => {this.props.navigation.navigate('AuthRoute')}}/>
            </View>
            </SafeAreaView>
        )
    }
}

export default AccountContainer;