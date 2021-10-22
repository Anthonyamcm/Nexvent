import React from "react";
import { StyleSheet , Dimensions} from "react-native";

const styles = StyleSheet.create({
    tags: {
		padding: 10,
		borderRadius: 8,
		width: 100,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 }
	},
	tagsText: {
		fontFamily: 'GTEestiDisplay-Regular',
		fontSize: 20,
	},
})

export default styles