import React from "react";
import { StyleSheet , Dimensions} from "react-native";

const styles = StyleSheet.create({
    location: {
		padding: 10,
		borderRadius: 8,
		width: 125,
		shadowOpacity: 0.1,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 }
	},
	locationText: {
		fontFamily: 'GTEestiDisplay-Regular',
		fontSize: 20,
	},
})

export default styles