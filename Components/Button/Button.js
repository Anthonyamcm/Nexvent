import React from 'react';
import {
    Text,
    Image,
    Platform,
    View,
    TouchableOpacity,
    Switch,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { TouchableOpacity as Pressable } from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

class CustomButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let useRipple = Platform.OS === 'android' && Platform.Version >= 21;
        let TouchableComponent = this.props.shouldShowSwitch ? View : useRipple ? Pressable : TouchableOpacity;

        let ImageView = (this.props.icon !== null && (typeof (this.props.icon) === 'string')) ?
            MaterialCommunityIcons : Image;

        return (
            <TouchableComponent
                onPress={() => this.props.onPress()}
                style={[this.getContainerTheme(), this.props.style]}
                android_ripple={{ color: this.props.pressColor }}
                disabled={this.props.isDisabled}
                activeOpacity={0.7}>
                {this.props.shouldHaveGradient && (
                <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={this.props.gradientColours} style={styles.gradient}>
                <ImageView
                    style={this.getIconStyle()}
                    source={this.props.icon}
                    name={this.props.icon}
                    color={this.props.iconColor}
                    size={this.props.iconSize} />

                <View style={this.getTextWrapperStyle()}>
                    <Text style={this.getTitleStyle()}>{this.props.title}</Text>
                    <Text style={this.getSubtitleStyle()}>{this.props.subtitle}</Text>
                </View>
                

                {this.props.shouldShowSwitch && (
                    <Switch
                        onValueChange={() => {
                            this.props.onSwitchValueChanged();
                        }}
                        value={this.props.isSwitchEnabled}
                        style={{ marginStart: 'auto' }}>
                    </Switch>
                )}
                </LinearGradient>
                )}
                {!this.props.shouldHaveGradient && (
                <View>
                <ImageView
                    style={this.getIconStyle()}
                    source={this.props.icon}
                    name={this.props.icon}
                    color={this.props.iconColor}
                    size={this.props.iconSize} />

                <View style={this.getTextWrapperStyle()}>
                    <Text style={this.getTitleStyle()}>{this.props.title}</Text>
                    <Text style={this.getSubtitleStyle()}>{this.props.subtitle}</Text>
                </View>
                

                {this.props.shouldShowSwitch && (
                    <Switch
                        onValueChange={() => {
                            this.props.onSwitchValueChanged();
                        }}
                        value={this.props.isSwitchEnabled}
                        style={{ marginStart: 'auto' }}>
                    </Switch>
                )}
                </View>
                )}
            </TouchableComponent>
        )
    };

    getTextWrapperStyle = function () {
        return {
            flexDirection: this.props.subtitle !== undefined ? 'column' : 'row',
            marginTop: 'auto',
            marginBottom: 'auto',
        }
    }

    getTitleStyle = function () {
        return {
            fontFamily: this.props.fontFamily,
            color: this.props.textColor,
            fontSize: this.props.titleFontSize,
            textDecorationLine: this.props.titleTextDecorationLine
        }
    }

    getSubtitleStyle = function () {
        return {
            fontFamily: this.props.fontFamily,
            display: this.props.subtitle === undefined ? 'none' : 'flex',
            color: this.props.subtitleColor,
            fontSize: this.props.subtitleFontSize,
            textAlign: 'center'
        }
    }

    getIconStyle = function () {
        return {
            width: this.props.iconSize,
            height: this.props.iconSize,
            resizeMode: 'contain',
            marginEnd: 15,
            marginTop: 'auto',
            marginBottom: 'auto',
            display: (this.props.icon === null || this.props.icon === undefined) ? 'none' : 'flex',
        };
    }

    getContainerTheme = function () {
        let position = this.props.position;
        let isShadow = this.props.isShadow;
        if (position === 'left' || position === 'start') position = 'flex-start';
        if (position === 'right' || position === 'end') position = 'flex-end';

        let edgePadding = (this.props.position !== 'center') ? 10 : 0;

        return {
            backgroundColor: 'transparent',
            paddingTop: 0,
            paddingBottom: 0,
            paddingStart: edgePadding,
            paddingEnd: edgePadding,
            flexDirection: 'row',
            borderRadius: 12,
            justifyContent: position,
        }
    }
}

CustomButton.defaultProps = {
    textColor: 'white',
    pressColor: 'blue',
    iconSize: 25,
    iconColor: 'white',
    position: 'center',
    titleFontSize: 18,
    subtitleFontSize: 14,
    isDisabled: false,
    titleTextDecorationLine: 'none',
    fontFamily: 'GTEestiDisplay-Medium',
    shouldShowSwitch: false,
    shouldHaveGradient: false,
    gradientColours: ['#00c6ff','#0072ff']
};

CustomButton.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.any,
    onPress: PropTypes.func,
    style: PropTypes.any,
    iconColor: PropTypes.string,
    iconSize: PropTypes.number,
    pressColor: PropTypes.string,
    textColor: PropTypes.string,
    subtitleColor: PropTypes.string,
    position: PropTypes.string,
    titleFontSize: PropTypes.number,
    subtitleFontSize: PropTypes.number,
    isDisabled: PropTypes.bool,
    titleTextDecorationLine: PropTypes.string,
    fontFamily: PropTypes.string,
    shouldShowSwitch: PropTypes.bool,
    onSwitchValueChanged: PropTypes.func,
    isSwitchEnabled: PropTypes.bool,
    shouldHaveGradient: PropTypes.bool,
    gradientColours: PropTypes.array
};

const styles = StyleSheet.create({
    gradient: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      paddingStart: 0,
      paddingEnd: 0,
      flexDirection: 'row',
      borderRadius: 16,
    }
  });

export default CustomButton;
