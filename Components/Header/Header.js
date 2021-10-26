import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar
} from "react-native";

import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icons from "react-native-vector-icons/Ionicons";


class CustomHeader extends React.Component {
    render() {
        return (
            <View style={[styles.container]}>
                <TouchableOpacity
                    fontFamily='GTEestiDisplay-Medium'
                    style={styles.back}
                    onPress={() => this.props.onBackPressed()}
                    hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>

               {this.props.isModal &&(
                   <Icons
                   name='close'
                   size={35}
                   color={'black'} />
               )}
               {!this.props.isModal && (
                <Icons
                    name='md-chevron-back-outline'
                    size={35}
                    color={'black'} />
               )}
                </TouchableOpacity>

                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    title: {
        position: 'absolute',
        left: 50,
        right: 50,
        alignSelf: 'center',
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'GTEestiDisplay-Regular'
    },

    container: {
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
    },

    back: {
        height: 60,
        width: 60,
        paddingStart: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

CustomHeader.propTypes = {
    onBackPressed: PropTypes.func,
    title: PropTypes.string,
    isModal: PropTypes.bool
};

export default CustomHeader;