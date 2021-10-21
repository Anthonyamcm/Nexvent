import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform
} from 'react-native';

import PropTypes from 'prop-types';

import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';


class CustomInput extends React.Component {
    constructor(props) {
        super(props);

        // borderColor used to set the border of the input - grey for normal, red for error, green good
        this.state = {
            borderColor: this.props.borderColor,
            isInputCensored: this.props.isDataHidden,
            inputColor: this.props.inputColor,
            value: this.props.value,
            isEditable: this.props.isEditable
        };
    }

    componentDidMount() {
        if (this.props.ref != null) {
            this.props.ref(this)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            borderColor: nextProps.borderColor,
            value: nextProps.value,
            isEditable: nextProps.isEditable
        });
    }

    render() {
        return (
            <View style={this.props.style}>
                <Text style={this.getTitleStyle()}>{this.props.title}</Text>
                <View style={this.inputContainerStyle()}>
                    <Text style={this.getCurrencySymbolStyle()}>{this.props.currencySymbol}</Text>
                    <TextInput ref={input => this.textInput = input}
                        onChange={this.props.onChange}
                        autoCapitalize={this.props.autoCapitalize}
                        editable={this.state.isEditable}
                        keyboardType={this.props.keyboardType}
                        onKeyPress={this.props.onKeyPress}
                        secureTextEntry={this.state.isInputCensored}
                        placeholder={this.props.hint}
                        value={this.state.value}
                        maxLength={this.props.maxLength}
                        style={this.getInputStyle()}
                        onChangeText={this.props.onChangeText}
                        onChange={e => this.handleInputChange(e)}
                        multiline={this.props.multiline || (Platform.OS === 'ios' && this.props.textAlignVertical === 'top')} />

                    {!this.props.hideInputWithoutReveal && (<View style={[styles.privacyIcon, this.props.isDataHidden ? {} : { display: 'none' }]}>
                        <MaterialCommunityIcons name={this.state.isInputCensored ? 'eye' : 'eye-slash'}
                            size={25}
                            onPress={() => this.toggleCensor()}
                            color={'gray'} />
                    </View>)}
                </View>
            </View>
        );
    }

    focus() {
        this.textInput.focus()
    }

    getCurrencySymbolStyle = () => {
        return {
            position: 'absolute',
            color: (this.props.isEditable || Platform.OS == 'ios') ? 'black' : '#BCBDBD',
            zIndex: 9999,
            alignSelf: 'center',
            marginStart: 8
        }
    }

    getTitleStyle = () => {
        return {
            fontFamily: this.props.fontFamily,
            marginStart: 5,
            fontWeight: this.props.titleFontWeight,
            display: (this.props.title === undefined || this.props.title === null) ? 'none' : 'flex',
            color: this.props.titleColor
        }
    }

    getInputStyle = () => {
        return {
            fontFamily: this.props.fontFamily,
            flex: 1,
            backgroundColor: this.props.backgroundColor,
            height: this.props.inputHeight,
            padding: this.props.inputPadding,
            textAlignVertical: this.props.textAlignVertical,
            textAlign: this.props.textAlign,
            paddingStart: this.props.currencySymbol === '' ? this.props.inputPadding : 18,
            color: this.state.inputColor
        }
    }

    setValid(isValid, message) {
        const color = isValid ? inputValid : inputInvalid;
        this.setState({
            borderColor: color,
            value: message,
            isEditable: false,
            inputColor: !isValid ? inputInvalid : 'black'
        }, () => {
            setTimeout(() => {
                this.setState({
                    borderColor: this.props.borderColor,
                    value: '',
                    isEditable: true,
                    inputColor: 'black'
                });
            }, 2000);
        });
    }

    handleInputChange(e) {
        this.setState({
          value: e.target.value
        });
      }

    // toggle between hiding/showing the data in the input field
    toggleCensor() {
        let isInputCensored = !this.state.isInputCensored;

        this.setState({
            isInputCensored: isInputCensored,
        });
    }

    inputContainerStyle = function () {
        return {
            borderWidth: this.props.borderWidth,
            borderColor: this.state.borderColor,
            marginTop: (this.props.title === undefined || this.props.title === null) ? 0 : 5,
            flexDirection: 'row',
            borderRadius: 6,
            overflow: 'hidden',
        };
    };
}

const styles = StyleSheet.create({
    privacyIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingEnd: 5,
        backgroundColor: 'white'
    },
});

CustomInput.defaultProps = {
    inputHeight: 40,
    inputPadding: 5,
    textAlignVertical: 'center',
    multiline: false,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1.5,
    textAlign: 'left',
    hideInputWithoutReveal: false,
    fontFamily: 'GTEestiDisplay-Medium',
    currencySymbol: '',
    inputColor: '#000000',
    titleFontWeight: 'bold',
    titleColor: '#000000',
};

CustomInput.propTypes = {
    title: PropTypes.string,
    hint: PropTypes.string,
    value: PropTypes.string,
    isEditable: PropTypes.string,
    isDataHidden: PropTypes.bool,
    borderWidth: PropTypes.number,

    // 'none' | 'sentences' | 'words' | 'characters'
    autoCapitalize: PropTypes.string,

    // 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad'
    keyboardType: PropTypes.string,
    onKeyPress: PropTypes.func,
    onChangeText: PropTypes.func,

    inputHeight: PropTypes.number,
    inputPadding: PropTypes.number,

    // top bottom center
    textAlignVertical: PropTypes.string,
    textAlign: PropTypes.string,

    multiline: PropTypes.bool,

    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,

    hideInputWithoutReveal: PropTypes.bool,

    fontFamily: PropTypes.string,

    // 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' 
    titleFontWeight: PropTypes.string,
    titleColor: PropTypes.string,

    currencySymbol: PropTypes.string
};

export default CustomInput;