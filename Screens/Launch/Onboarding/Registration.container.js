import React from "react";
import { 
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
import { checkPermission, requestPermission  } from "../../../Components/Permissions/Permissions";
import CustomInput from "../../../Components/Input/Input";
import CheckBox from '@react-native-community/checkbox';
import CustomButton from "../../../Components/Button/Button";
import styles from './Registration.style'
import * as Profile from '../../../Components/Profile/Profile'
import * as appColors from '../../../Components/colors/appColor'
import * as API from '../../../Api/Api';

class RegistrationContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            isLoading: false,
            showTosError: false,
            showNameInputError: false,
            showEmailInputError: false,
            showPasswordInputError: false,
        }
    }
    render()
    {
        const {
            isTosChecked,
            email,
            name,
            password,
            showPasswordInputError,
            showEmailInputError,
            showNameInputError,
            isLoading
        } = this.state;

        return(
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={styles.mainContainer}>
                
                <TouchableWithoutFeedback>

                    <View>

                        <Text style={styles.title}>{'Create Account'}</Text>

                        <Text style={[styles.inputTitle, {marginTop: 30}]}>Name</Text>

                        <View style={[styles.input, {borderColor: showNameInputError ? appColors.error : appColors.grey2,}]}>
                            <CustomInput
                            hint={'Joe'}
                            ref={(ref) => {
                                this.name = ref;
                            }}
                            value={name}
                            backgroundColor={appColors.grey2}
                            borderColor={appColors.grey2}
                            inputColor={appColors.grey4}
                            fontFamily={'GTEestiDisplay-Medium'}
                            onChangeText={(name) => this.setState({ name, showNameInputError: false })}
                            style={{ width: '100%'}}/>
                        </View>

                        <Text style={[styles.invalidInput, { opacity: showNameInputError ? 1 : 0}]}>{'Please enter a valid name'}</Text>

                        <Text style={[styles.inputTitle, {marginTop: 10}]}>Email</Text>

                        <View style={[styles.input, {borderColor: showEmailInputError ? appColors.error : appColors.grey2,}]}>
                            <CustomInput
                            hint={'Someone@email.com'}
                            ref={(ref) => {
                                this.email = ref;
                            }}
                            value={email}
                            inputColor={appColors.grey4}
                            backgroundColor={appColors.grey2}
                            borderColor={appColors.grey2}
                            fontFamily={'GTEestiDisplay-Medium'}
                            onChangeText={(email) => this.setState({ email, showEmailInputError: false })}
                            style={{ width: '100%'}}/>
                        </View>

                        <Text style={[styles.invalidInput, { opacity: showEmailInputError ? 1 : 0}]}>{'Please enter a valid email'}</Text>

                        <Text style={[styles.inputTitle, {marginTop: 10}]}>Password</Text>

                        <View style={[styles.input, {borderColor: showPasswordInputError ? appColors.error : appColors.grey2,}]}>
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
                                onChangeText={(password) => this.setState({ password, showPasswordInputError: false })}
                                isDataHidden={true}
                                hideInputWithoutReveal={true}
                                style={{ width: '100%'}}/>
                        </View>

                        <Text style={[styles.invalidInput, { opacity: showPasswordInputError ? 1 : 0}]}>{'Your password must be at least 8 characters long'}</Text>

                        <View style={styles.tosContainer}>
                            <CheckBox
                                boxType="square"
                                value={isTosChecked}
                                onChange={() => this.setState({ isTosChecked: !isTosChecked })}
                                style={this.getTosCheckboxStyle()}
                                tintColor={this.state.showTosError ? '#dc2020' : '#66686D'}
                                tintColors={{ true: 'gray', false: this.state.showTosError ? 'gray' : '#66686D' }} />

                            <Text style={{ marginStart: 15, fontFamily: 'GTEestiDisplay-Medium', color: 'gray' }}>{'Please accept our '}
                                <Text
                                    onPress={() => this.onTosPressed()}
                                    style={styles.clickableText}>{'Terms of Use'}</Text>
                                </Text>
                        </View>

                        <Text style={this.getTosErrorStyle()}>{'Please accept the Terms of use in order to continue.'}</Text>
                            
                        <CustomButton
                            title={'Register'} 
                            style={{marginTop: 20, height: 50 , shadowColor: "#0072ff",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 3.84,
                            elevation: 5}}
                            shouldHaveGradient={true}
                            titleFontSize={20}
                            isLoading={isLoading}
                            onPress={() => this.onRegistrationPressed()}/>

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

    getTosCheckboxStyle = () => {
        return {
            height: 20,
            width: 20,
            borderRadius: 5,
            margin: 0,
            padding: 0
        }
    }


    getTosErrorStyle = () => {
        return {
            color: '#dc2020',
            opacity: this.state.showTosError ? 1 : 0,
            marginTop: 10,
            fontSize: 12,
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }

    locationService = async () => {

        const permissions = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION 
        
        try{
            
            const result = await checkPermission(permissions)

            if(result === true){
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

    onRegistrationPressed = async () => {
        const {
            isTosChecked,
            email,
            name,
            password
        } = this.state;

        this.setState({isLoading: true})

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
 
        if (name.length < 3) {
            this.setState({showNameInputError: true, isLoading: false})
        } else {
            this.setState({showNameInputError: false})
        }

        if (reg.test(email) === false) {
            this.setState({showEmailInputError: true,isLoading: false})
        } else {
            this.setState({showEmailInputError: false})
        }

        if (password.length < 8) {
            this.setState({showPasswordInputError: true,isLoading: false})
        } else {
            this.setState({showPasswordInputError: false})
        }
    
        if (!isTosChecked) {
            this.setState({showTosError: true, isLoading: false});
        } else {
            this.setState({showTosError: false})
        }

        if(email.length > 0 && isTosChecked){

            try {

                const data = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                };

               
                Profile.setUserCredentials({email: this.state.email, password: this.state.password})

                const result = await API.REGISTER().doRegister(data)
                    if (result.status.code === 200) {
                        API.LOGIN_SUCCESS(result.body);
                        this.locationService()
                        this.setState({isLoading: false})
                }

            } catch (error) {
                console.log(error.response);
            }
        }
    }
}



export default RegistrationContainer;