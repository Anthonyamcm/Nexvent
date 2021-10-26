import React from "react";
import { View, Text, Dimensions , TouchableWithoutFeedback} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from "../../../Components/Input/Input";
import styles from "./Login.style";
import CustomHeader from "../../../Components/Header/Header"
import CustomButton from "../../../Components/Button/Button";

const { height } = Dimensions.get('window');

class LoginContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            userData: null,
            showNameInputError: false,
            showEmailInputError: false,
            showPasswordInputError: false,
        }
    }


    render(){

        const {
            email,
            password,
        } = this.state;

        return(
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={[styles.mainContainer, { marginTop: 15, marginBottom: 10 }]}>

                <CustomHeader
                onBackPressed={() => this.props.navigation.goBack(null)} />
                
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
                            backgroundColor='white'
                            borderColor='white'
                            fontFamily={'GTEestiDisplay-Medium'}
                            onChangeText={(email) => this.setState({ email })}
                            style={{ width: '100%'}}
                            />
                            </View>
            
                            <Text style={[styles.inputTitle, {marginTop: 30}]}>Password</Text>
                            <View style={this.getPasswordInputStyle()}>
                            <CustomInput
                        hint={'● ● ● ● ● ● ● ●'}
                        ref={(ref) => {
                            this.password = ref;
                        }}
                        backgroundColor='white'
                        borderColor='white'
                        fontFamily={'GTEestiDisplay-Medium'}
                        value={password}
                        onChangeText={(password) => this.setState({ password })}
                        isDataHidden={true}
                        hideInputWithoutReveal={false}
                        style={{ width: '100%'}}
                        />
                            </View>
                            <Text style={this.getInvalidInputTextStyle()}>{'Password and email do not match'}</Text>

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
                                    onPress={() => this.onRegistrationPressed()}
                                    title={'Log In'} />
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
            borderColor: showEmailInputError ? '#dc2020' : '#D6DDDD',
            marginTop: height * 0,
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
            borderColor: showPasswordInputError ? '#dc2020' : '#D6DDDD',
            marginTop: height * 0,
            flexDirection: 'row',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }
}

export default LoginContainer;