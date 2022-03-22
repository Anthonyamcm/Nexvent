import React from "react";
import { View, Text, TouchableWithoutFeedback} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from "../../../Components/Input/Input";
import styles from "./Login.style";
import CustomButton from "../../../Components/Button/Button";
import { Platform } from "react-native";
import { PERMISSIONS, request, check } from "react-native-permissions";
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

                        <View style={this.getEmailInputStyle()}>
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
                                onChangeText={(email) => this.setState({ email })}
                                style={{ width: '100%'}}/>
                        </View>
            
                        <Text style={[styles.inputTitle, {marginTop: 30}]}>Password</Text>

                        <View style={this.getPasswordInputStyle()}>

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
                                onChangeText={(password) => this.setState({ password })}
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
        return {
            color: '#dc2020',
            opacity: this.state.showInputError ? 1 : 0,
            marginTop: 10,
            fontSize: 12,
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }

    getEmailInputStyle = () => {
        const {
            showEmailInputError
        } = this.state;

        return {
            backgroundColor: 'white',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: showEmailInputError ? '#dc2020' : appColors.grey2,
            marginTop: 15,
            flexDirection: 'row',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }

    getPasswordInputStyle = () => {
        const {
            showPasswordInputError
        } = this.state;

        return {
            backgroundColor: 'white',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: showPasswordInputError ? '#dc2020' : appColors.grey2,
            marginTop: 15,
            flexDirection: 'row',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: 'GTEestiDisplay-Medium'
        }
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
                        request(
                            Platform.select({
                            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                            })
                        ).then(res => {
                            if (res === 'granted') {
                            Geolocation.getCurrentPosition(
                                (position) => {
                                this.saveLocation(position)
                                this.props.navigation.navigate('MainRoute');
                            },
                            (error) => {
                                console.log(error.code, error.message);
                            },
                            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
                            } else {
                            console.log("Location is not enabled");
                            }
                        });
                    }else{
                        this.props.navigation.navigate('MainRoute');
                    }
                })
            } catch (error) {
                console.log("location set error:", error);
            }
    }

    saveLocation = async (position) => {
        try{

            const jsonValue = {
                name: "Current Location",
                country: "Using current location",
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
      
            await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(jsonValue))
      
            } catch(error){
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
                        this.checkLocation()
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