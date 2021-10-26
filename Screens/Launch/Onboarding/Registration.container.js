import React from "react";
import { 
    View,
    Text,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";
import CustomHeader from "../../../Components/Header/Header"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from "../../../Components/Input/Input";
import CheckBox from '@react-native-community/checkbox';
import CustomButton from "../../../Components/Button/Button";
import styles from './Registration.style'

const { height } = Dimensions.get('window');

class RegistrationContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            userData: null,
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
        } = this.state;

        return(
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={[styles.mainContainer, { marginTop: 15, marginBottom: 10 }]}>

                <CustomHeader
                onBackPressed={() => this.props.navigation.goBack(null)} />
                
                <TouchableWithoutFeedback>
                            <View>
                            <Text style={styles.title}>{'Create Account'}</Text>
                            <Text style={[styles.inputTitle, {marginTop: 30}]}>Name</Text>
                            <View style={this.getNameInputStyle()}>
                            <CustomInput
                            hint={'Joe'}
                            ref={(ref) => {
                                this.name = ref;
                            }}
                            value={name}
                            backgroundColor='white'
                            borderColor='white'
                            fontFamily={'GTEestiDisplay-Medium'}
                            onChangeText={(name) => this.setState({ name })}
                            style={{ width: '100%'}}
                            />
                            </View>
                            <Text style={this.getInvalidInputTextStyle()}>{'Please enter a valid name'}</Text>

                            <Text style={[styles.inputTitle, {marginTop: 10}]}>Email</Text>
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
                            <Text style={this.getInvalidInputTextStyle()}>{'Please enter a valid email'}</Text>

                            <Text style={[styles.inputTitle, {marginTop: 10}]}>Password</Text>
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
                            <Text style={this.getInvalidInputTextStyle()}>{'Password must be 8 characters long'}</Text>

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
                                    onPress={() => this.onRegistrationPressed()}
                                    title={'Register'} />

                                
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

    getInvalidInputTextStyle = () => {
        return {
            color: '#dc2020',
            opacity: this.state.showInputError ? 1 : 0,
            marginTop: 10,
            fontSize: 12,
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }


    getNameInputStyle = () => {
        const {
            showNameInputError
        } = this.state;

        return {
            backgroundColor: 'white',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: showNameInputError ? '#dc2020' : '#D6DDDD',
            marginTop: height * 0,
            flexDirection: 'row',
            textAlign: 'center',
            overflow: 'hidden',
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

    getTosErrorStyle = () => {
        return {
            color: '#dc2020',
            opacity: this.state.showTosError ? 1 : 0,
            marginTop: 10,
            fontSize: 12,
            fontFamily: 'GTEestiDisplay-Regular'
        }
    }

    onRegistrationPressed = () => {
        const {
            stepProgress,
            isTosChecked,
            email,
            name,
            password
        } = this.state;
    
        
        if (name.length === 0) {
            this.setState({
                showNameInputError: true
            })
            return;
        } else {
            this.setState({
                showNameInputError: false
            })
        }

        if (email.length === 0) {
            this.setState({
                showEmailInputError: true
            })
            return;
        } else {
            this.setState({
                showEmailInputError: false
            })
        }

        if (password.length === 0) {
            this.setState({
                showPasswordInputError: true
            })
            return;
        } else {
            this.setState({
                showPasswordInputError: false
            })
        }
    
        if (!isTosChecked) {
            this.setState({
                showTosError: true
            });
            return;
        } else {
            this.setState({
                showTosError: false
            })
        }

        if(email.length > 0 && isTosChecked){
            this.props.navigation.navigate('Location')
        }
    }
}



export default RegistrationContainer;