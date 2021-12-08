import React from "react";
import { StyleSheet , Dimensions} from "react-native";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
    containerCardItem: {
		borderRadius: 12,
      	width: DIMENSION_WIDTH - 40,
      	height: DIMENSION_HEIGHT - 220,
      	paddingTop: 10,
      	margin: 10,
      	shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 }
	},
	footerCardItem: {
		position: 'absolute',
    	height: 100,
    	left: 0, 
    	bottom: 0, 
    	width: DIMENSION_WIDTH - 40,
    	backgroundColor: 'rgba(0, 0, 0, 0.05)',
    	borderRadius: 12,
	},
	titleCardItem: {
		paddingTop: 15,
      	paddingBottom: 7,
      	color: 'white',
      	fontSize: 30,
      	paddingLeft: 20,
		fontFamily: 'GTEestiDisplay-Medium'
	},
	descriptionCardItem: {
		fontSize: 20,
		color: 'white',
		paddingLeft: 20,
		fontFamily: 'GTEestiDisplay-Medium'
	}
})

export default styles