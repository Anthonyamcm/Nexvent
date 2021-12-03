import React from "react";
import { StyleSheet, Dimensions, Platform } from "react-native";
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

const styles = StyleSheet.create({
	containerHome: { 
		flex:1,
		flexDirection: 'column',
        marginHorizontal: 10,
    },
    top: {
		flexDirection: "row",
		justifyContent: 'flex-start',
		paddingHorizontal: 15
	},
});

export default styles