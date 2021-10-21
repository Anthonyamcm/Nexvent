import React from "react";
import { View,
    Text,
    StatusBar,
    Image,
    Linking,
    TouchableOpacity,
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
    SafeAreaView } from "react-native";
import CustomHeader from "../../../Components/Header/Header"
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../../Components/Input/Input";
import CheckBox from '@react-native-community/checkbox';
import CustomButton from "../../../Components/Button/Button";
import { Dimensions } from 'react-native';
import styles from './Registration.style'

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

class RegistrationContainer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: '',
            email: '',
            password: '',
            stepProgress: 1,
            isTosChecked: false,
            country: {
                callingCode: 44,
                cca2: 'GB'
            },
            isCountryPickerVisible: false,

            codeLetter1: '',
            codeLetter2: '',
            codeLetter3: '',
            codeLetter4: '',
            codeLetter5: '',
            codeLetter6: '',

            fadeInOpacity: new Animated.Value(0),
            codeTickFadeInOpacity: new Animated.Value(0),

            userData: null,
            otp: '',
            token: '',

            showInvalidPhoneError: false,
            showTosError: false,
            showInputError: false,

            showOTPError: false
        }
    }

    startBackgroundFadeAnimation = () => {
        this.setState({ fadeInOpacity: new Animated.Value(0) }, () => {
            Animated.timing(this.state.fadeInOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    }

    startCodeTickAnimation = () => {
        this.setState({ codeTickFadeInOpacity: new Animated.Value(0) }, () => {
            Animated.timing(this.state.codeTickFadeInOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    }

    renderContent = () => {
        const {
            stepProgress,
            isTosChecked,
            country,
            isCountryPickerVisible,
            email,
            password,
            phoneNumber,
            codeLetter1,
            codeLetter2,
            codeLetter3,
            codeLetter4,
            codeLetter5,
            codeLetter6,
            showOTPError
        } = this.state;

        switch (stepProgress) {
            case 2 : 
                return(
                    <TouchableWithoutFeedback>
                    <Animated.View style={{ opacity: this.state.fadeInOpacity }}>
                        <View>
                        <Text style={styles.title}>{'Password'}</Text>
                        <View style={this.getInputStyle()}>
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
                        <Text style={this.getInvalidInputTextStyle()}>{'Please enter a valid password'}</Text>
                    
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
                                onPress={() => this.onPasswordContinuePressed()}
                                title={'continue'} />
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                )
                case 3 : 
                return(
                    <TouchableWithoutFeedback>
                    <Animated.View style={{ opacity: this.state.fadeInOpacity }}>
                        <View>
                        <Text style={styles.title}>{'Mobile Number'}</Text>
                            <View style={this.getInputStyle()}>
                                <TouchableOpacity
                                    onPress={() => this.onCountryPickerPressed()}
                                    style={styles.flagContainer}>
                                    <FlagButton
                                        countryCode={country.cca2}
                                        withCallingCodeButton={false}
                                        withEmoji={true}
                                        withFlagButton={true}
                                        onPress={() => this.onCountryPickerPressed()} />

                                    <Text style={{ fontFamily: 'GTEestiDisplay-Medium' }}>+ {country.callingCode}</Text>

                                    <MaterialCommunityIcons
                                        name='menu-down'
                                        size={20}
                                        color='black'
                                        style={{ padding: 2 }} />
                                </TouchableOpacity>

                                <View
                                    style={{ width: 1, height: '100%', backgroundColor: 'lightgray' }} />

                                <CustomInput
                                    hint='0000-000000'
                                    ref={(ref) => {
                                        this.password = ref;
                                    }}
                                    value={phoneNumber}
                                    backgroundColor='white'
                                    borderColor='white'
                                    fontFamily={'GTEestiDisplay-Medium'}
                                    onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                    keyboardType='number-pad'
                                    style={{ width: '100%'}} />
                            </View>

                            <Text style={this.getInvalidInputTextStyle()}>{'Invalid phone number'}</Text>

                        
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
                                onPress={() => this.onNumberContinuePressed()}
                                title={'continue'} />


                            {/* very ugly hack but it works......
                    otherwise it shows choose country title and no way to get rid of it */}
                            <View style={{ position: 'absolute', bottom: -10000 }}>
                                <CountryPicker
                                    fontFamily={'GTEestiDisplay-Medium'}
                                    withCallingCode={true}
                                    preferredCountries={['UK']}
                                    withEmoji={true}
                                    withFilter={true}
                                    withAlphaFilter={true}
                                    withFlagButton
                                    visible={isCountryPickerVisible}
                                    onClose={() => this.setState({ isCountryPickerVisible: false })}
                                    onSelect={country =>
                                        this.setState({ country: country })
                                    }
                                />
                            </View>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                )
            case 4 :
                return (
                    <TouchableWithoutFeedback>
                        <Animated.View style={{ opacity: this.state.fadeInOpacity }}>
                            <Text style={styles.title}>{'Verification Code'}</Text>

                            <View style={styles.codeInputContainer}>
                                <View style={styles.codeInput}>
                                    <CustomInput
                                        ref={(ref) => {
                                            this.codeInput1 = ref;
                                        }}
                                        value={codeLetter1}
                                        borderWidth={1}
                                        borderColor={showOTPError ? '#dc2020' : '#868686'}
                                        style={this.getOTPStyle()}
                                        hint='*'
                                        onChangeText={(val) => {
                                            this.setState({
                                                codeLetter1: val
                                            }, () => {
                                                this.checkUserCode();
                                            });

                                            if (val !== '')
                                                this.codeInput2.focus();
                                        }}
                                        keyboardType='number-pad'
                                        textAlign='center'
                                        maxLength={1} />

                                    <CustomInput
                                        ref={(ref) => {
                                            this.codeInput2 = ref;
                                        }}
                                        value={codeLetter2}
                                        borderWidth={1}
                                        borderColor={showOTPError ? '#dc2020' : '#868686'}
                                        style={this.getOTPStyle()}
                                        hint='*'
                                        textAlign='center'
                                        onChangeText={(val) => {
                                            this.setState({
                                                codeLetter2: val
                                            }, () => {
                                                this.checkUserCode();
                                            });

                                            if (val !== '')
                                                this.codeInput3.focus()
                                        }}
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === 'Backspace' && codeLetter2 === '') {
                                                this.codeInput1.focus()
                                            }
                                        }} />

                                    <CustomInput
                                        ref={(ref) => {
                                            this.codeInput3 = ref;
                                        }}
                                        value={codeLetter3}
                                        borderWidth={1}
                                        borderColor={showOTPError ? '#dc2020' : '#868686'}
                                        style={this.getOTPStyle()}
                                        hint='*'
                                        textAlign='center'
                                        onChangeText={(val) => {
                                            this.setState({
                                                codeLetter3: val
                                            }, () => {
                                                this.checkUserCode();
                                            });

                                            if (val !== '')
                                                this.codeInput4.focus()
                                        }}
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === 'Backspace' && codeLetter3 === '') {
                                                this.codeInput2.focus()
                                            }
                                        }} />

                                    <CustomInput
                                        ref={(ref) => {
                                            this.codeInput4 = ref;
                                        }}
                                        value={codeLetter4}
                                        borderWidth={1}
                                        borderColor={showOTPError ? '#dc2020' : '#868686'}
                                        style={this.getOTPStyle()}
                                        hint='*'
                                        textAlign='center'
                                        onChangeText={(val) => {
                                            this.setState({
                                                codeLetter4: val
                                            }, () => {
                                                this.checkUserCode();
                                            });

                                            if (val !== '')
                                                this.codeInput5.focus()
                                        }}
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === 'Backspace' && codeLetter4 === '') {
                                                this.codeInput3.focus()
                                            }
                                        }} />

                                    <CustomInput
                                        ref={(ref) => {
                                            this.codeInput5 = ref;
                                        }}
                                        value={codeLetter5}
                                        borderWidth={1}
                                        borderColor={showOTPError ? '#dc2020' : '#868686'}
                                        style={this.getOTPStyle()}
                                        hint='*'
                                        textAlign='center'
                                        onChangeText={(val) => {
                                            this.setState({
                                                codeLetter5: val
                                            }, () => {
                                                this.checkUserCode();
                                            });

                                            if (val !== '')
                                                this.codeInput6.focus()
                                        }}
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === 'Backspace' && codeLetter5 === '') {
                                                this.codeInput4.focus()
                                            }
                                        }} />

                                    <CustomInput
                                        ref={(ref) => {
                                            this.codeInput6 = ref;
                                        }}
                                        value={codeLetter6}
                                        borderWidth={1}
                                        borderColor={showOTPError ? '#dc2020' : '#868686'}
                                        style={this.getOTPStyle()}
                                        hint='*'
                                        textAlign='center'
                                        onChangeText={(val) => {
                                            this.setState({
                                                codeLetter6: val
                                            }, () => {
                                                this.checkUserCode();
                                            });
                                        }}
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        onKeyPress={({ nativeEvent }) => {
                                            if (nativeEvent.key === 'Backspace' && codeLetter6 === '') {
                                                this.codeInput5.focus()
                                            }
                                        }} />
                                </View>

                                <Animated.View style={{ opacity: this.state.codeTickFadeInOpacity }}>
                                    <MaterialCommunityIcons
                                        name='check'
                                        size={25}
                                        color={'green'}
                                        style={{ marginStart: 5 }} />
                                </Animated.View>
                            </View>

                            <Text style={this.getInvalidCodeTextStyle()}>{'Invalid code'}</Text>

                            <Text style={styles.clickableText} onPress={() => this.onDidntReceiveTextPressed()}>{'Did not recieve code ?'}</Text>

                        </Animated.View>
                    </TouchableWithoutFeedback>
                )

            case 5 : 
                 
                return (
                    <TouchableWithoutFeedback>
                    <Animated.View style={{ opacity: this.state.fadeInOpacity }}>
                        <View>
                        <IonIcons 
                        name='location-outline'
                        size={84}
                        style={styles.pinIcon}/>
                        <Text style={{flex: 1 , fontFamily:'GTEestiDisplay-Medium',textAlign:'center', padding: 20, fontSize: 20}}>{'You will need to enable to location in order to use Nexvent'}</Text>
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
                                onPress={() => this.onEnabledPressed()}
                                title={'Enable location'} />
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                )

            default:
                // Welcome step
                return (
                    <TouchableWithoutFeedback>
                        <Animated.View>
                            <View>
                            <Text style={styles.title}>{'Email'}</Text>
                            <View style={this.getInputStyle()}>
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
                                    onPress={() => this.onWelcomeContinuePressed()}
                                    title={'continue'} />

                                <View style={styles.tosContainer}>
                                <CheckBox
                                    boxType="square"
                                    value={isTosChecked}
                                    onChange={() => this.setState({ isTosChecked: !isTosChecked })}
                                    style={this.getTosCheckboxStyle()}
                                    tintColor={this.state.showTosError ? '#dc2020' : '#66686D'}
                                    tintColors={{ true: '#66686D', false: this.state.showTosError ? '#dc2020' : '#66686D' }} />

                                <Text style={{ marginStart: 15, fontFamily: 'GTEestiDisplay-Medium' }}>{'Please accept our '}
                                    <Text
                                        onPress={() => this.onTosPressed()}
                                        style={styles.clickableText}>{'Terms of Use'}</Text>
                                </Text>
                            </View>

                            <Text style={this.getTosErrorStyle()}>{'Please accept the Terms of use in order to continue.'}</Text>
                            </View>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                );
        }
    }

    render(){
        return(
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />

                <View style={[styles.mainContainer, { marginTop: 15, marginBottom: 10 }]}>

                <CustomHeader
                title={'Register'}
                onBackPressed={() => this.onBackPressed()} />

                    {/* Step progress */}
                    <View style={styles.stepContainer}>
                        <View style={this.getStepStyle(1)} />

                        <View style={this.getStepStyle(2)} />

                        <View style={this.getStepStyle(3)} />

                        <View style={this.getStepStyle(4)} />

                        <View style={this.getStepStyle(5)} />

                    </View>

                    {/* the main content */}
                    {this.renderContent()}
                </View>
            </KeyboardAwareScrollView>
        )
    }

    onCountryPickerPressed = () => {
        this.setState({
            isCountryPickerVisible: true
        });
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

    getStepStyle = (index) => {
        const {
            stepProgress
        } = this.state;

        if (stepProgress > index) return styles.stepPassed;
        if (stepProgress == index) return styles.stepActive;
        return styles.stepInactive;
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


    getInputStyle = () => {
        const {
            showInputError
        } = this.state;

        return {
            backgroundColor: 'white',
            borderRadius: 6,
            borderWidth: 1,
            borderColor: showInputError ? '#dc2020' : '#D6DDDD',
            marginTop: height * 0.025,
            flexDirection: 'row',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }

    getOTPStyle = () => {
        return {
            width: 35,
            height: 45,
            color: 'black',
            fontFamily: 'GTEestiDisplay-Medium'
        }
    }

    getInvalidCodeTextStyle = () => {
        return {
            color: '#dc2020',
            opacity: this.state.showOTPError ? 1 : 0,
            marginBottom: 15,
            fontSize: 12,
            fontFamily: 'GTEestiDisplay-Medium'
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
    onWelcomeContinuePressed = () => {
        const {
            stepProgress,
            isTosChecked,
            email
        } = this.state;
    
        if (email.length === 0) {
            this.setState({
                showInputError: true
            })
            return;
        } else {
            this.setState({
                showInputError: false
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
            this.setState({
                stepProgress: stepProgress + 1
            });
            this.startBackgroundFadeAnimation();
        }
    }

    onPasswordContinuePressed = () => {
        const {
            stepProgress,
            password
        } = this.state;
    
        if (password.length === 0) {
            this.setState({
                showInputError: true
            })
            return;
        } else {
            this.setState({
                showInputError: false
            })
        }
    
        if(password.length > 0){
            this.setState({
                stepProgress: stepProgress + 1
            });
            this.startBackgroundFadeAnimation();
        }
    }

    onNumberContinuePressed = () => {
        const {
            stepProgress,
            phoneNumber
        } = this.state;
    
        if (phoneNumber.length === 0) {
            this.setState({
                showInputError: true
            })
            return;
        } else {
            this.setState({
                showInputError: false
            })
        }
    
        if(phoneNumber.length > 0){
            this.setState({
                stepProgress: stepProgress + 1
            });
            this.startBackgroundFadeAnimation();
        }
    }
    
    onEnabledPressed = () => {
        this.props.navigation.navigate('MainRoute');
    }

    onBackPressed = () => {
        const {
            stepProgress,
        } = this.state;

        if(stepProgress == 1){
            this.props.navigation.goBack(null)
        } else {
            this.setState({
                stepProgress: stepProgress - 1
            })
            this.startBackgroundFadeAnimation();
        }
    }

    checkUserCode = async () => {
        const {
            codeLetter1,
            codeLetter2,
            codeLetter3,
            codeLetter4,
            codeLetter5,
            codeLetter6,
            stepProgress
        } = this.state;

        const code = codeLetter1 + codeLetter2 + codeLetter3 + codeLetter4 + codeLetter5 + codeLetter6;

        // only proceed if the user has entered all the characters
        if (code.length === 6) {
            this.startCodeTickAnimation();
            Keyboard.dismiss();
            this.setState({
                stepProgress : stepProgress + 1
            });
            this.startBackgroundFadeAnimation();
        }
    }

    resetCode = () => {
        this.setState({
            codeLetter1: '',
            codeLetter2: '',
            codeLetter3: '',
            codeLetter4: '',
            codeLetter5: '',
            codeLetter6: '',
            showOTPError: false
        }, () => {
            this.codeInput1.focus()
        });
    }

    onDidntReceiveTextPressed = () => {
        updateState(didNotReceiveCodeModal, 230);
        openBottomSheet();
    }

}



export default RegistrationContainer;