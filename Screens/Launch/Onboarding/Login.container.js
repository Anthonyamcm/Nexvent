import React from "react";
import { View, Text, TouchableWithoutFeedback} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
import { checkPermission, requestPermission  } from "../../../Components/Permissions/Permissions";
import { getLocation } from "../../../services/location/locationServices";
import CustomInput from "../../../Components/Input/Input";
import styles from "./Login.style";
import CustomButton from "../../../Components/Button/Button";
import Geolocation from 'react-native-geolocation-service';
import * as Profile from '../../../Components/Profile/Profile'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as appColors from '../../../Components/colors/appColor'
import * as API from '../../../Api/Api';

const LOCATION_KEY = '@location_key'

class LoginContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showEmailInputError: false,
            showPasswordInputError: false,
            showInputError: false,
            isLoading: false
        }

    }


    render(){

        const {
            email,
            password,
            isLoading
        } = this.state;

        return(
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={styles.mainContainer}>
                
                <TouchableWithoutFeedback>
    
                    <View>

                        <Text style={styles.title}>{'Log In'}</Text>
                        
                        <Text style={[styles.inputTitle, {marginTop: 30}]}>Email</Text>

                        <View style={this.getInputStyle()}>
                            <CustomInput
                                hint={'Someone@email.com'}
                                ref={(ref) => {
                                    this.email = ref;
                                }}
                                value={email}
                                autoCapitalize={'none'}
                                backgroundColor={appColors.grey2}
                                borderColor={appColors.grey2}
                                inputColor={appColors.grey4}
                                fontFamily={'GTEestiDisplay-Medium'}
                                onChangeText={(email) => this.setState({ email, showInputError: false })}
                                style={{ width: '100%'}}/>
                        </View>
            
                        <Text style={[styles.inputTitle, {marginTop: 30}]}>Password</Text>

                        <View style={this.getInputStyle()}>

                            <CustomInput
                                hint={'● ● ● ● ● ● ● ●'}
                                ref={(ref) => {
                                    this.password = ref;
                                }}
                                backgroundColor={appColors.grey2}
                                borderColor={appColors.grey2}
                                inputColor={appColors.grey4}
                                fontFamily={'GTEestiDisplay-Medium'}
                                value={password}
                                onChangeText={(password) => this.setState({ password, showInputError: false})}
                                isDataHidden={true}
                                hideInputWithoutReveal={true}
                                style={{ width: '100%'}}/>

                        </View>

                        <Text style={this.getInvalidInputTextStyle()}>{'Incorrect email or password'}</Text>

                        <View style={styles.tosContainer}>
                                
                            <Text style={{fontFamily: 'GTEestiDisplay-Medium', color: 'gray'}}>
                                    <Text
                                        onPress={() => this.onTosPressed()}
                                        style={styles.clickableText}>{'Forgot Password'}</Text>
                            </Text>

                        </View>

                        <CustomButton
                            style={{marginTop: 30, height: 50 , shadowColor: "#0072ff",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 3.84,
                            elevation: 5}}
                            shouldHaveGradient={true}
                            titleFontSize={20}
                            onPress={() => this.onLoginPressed()}
                            title={'Log In'}
                            isLoading={isLoading} />

                        <CustomButton
                            title='Cancel'
                            titleFontSize={24}
                            fontFamily={'GTEestiDisplay-Medium'}
                            textColor={'gray'}
                            style={{paddingTop: 20}}
                            onPress={() => this.props.navigation.goBack(null)}/>

                    </View>

                </TouchableWithoutFeedback>

            </View>

         </KeyboardAwareScrollView>
        )
    }

    getInvalidInputTextStyle = () => {
        const {
            showInputError
        } = this.state;

        return {
            color: appColors.error,
            opacity: showInputError ? 1 : 0,
            marginTop: 10,
            fontSize: 12,
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }

    getInputStyle = () => {
        const {
            showInputError
        } = this.state;

        return {
            backgroundColor: 'white',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: showInputError ? appColors.error : appColors.grey2,
            marginTop: 15,
            flexDirection: 'row',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }

    locationService = async () => {

        const permissions = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION 
        
        try{

            const result = await checkPermission(permissions)

            if(result === true){
                const result = getLocation()
                console.log(result)
                this.props.navigation.navigate('MainRoute')
            }else{

                const result = await requestPermission(permissions)

                if(result === true){
                    this.props.navigation.navigate('MainRoute')
                }else{
                    this.props.navigation.navigate('Location')
                }
            }
        }catch(error){
            console.log(error)
        }

    }

    onLoginPressed = async () => {
        try {

            const data = {
                email: this.state.email,
                password: this.state.password,
            };

            this.setState({isLoading: true})

            Profile.setUserCredentials(data)

            const result = await API.LOGIN().doLogin(data);

                if (result.status.code === 200) {
                    this.setState({
                        showInputError: false,
                        showEmailInputError: false,
                        showPasswordInputError: false,
                        isLoading: false
                    }, async () => {
                        API.LOGIN_SUCCESS(result.body);
                        this.locationService()
                    })
                    
                }else{
                    this.setState({
                        showInputError: true,
                        showEmailInputError: true,
                        showPasswordInputError: true,
                        isLoading: false
                    })
                }
        } catch (error) {
            this.setState({
                showInputError: true,
                showEmailInputError: true,
                showPasswordInputError: true,
                isLoading: false
            })
        }
    }
}

export default LoginContainer;