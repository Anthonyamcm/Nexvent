import React from "react";
import { StyleSheet , Dimensions} from "react-native";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
    card: {
		borderRadius: 32,
      	width: DIMENSION_WIDTH - 40,
      	height: DIMENSION_HEIGHT - 200,
      	paddingVertical: 20,
      	margin: 10,
      	shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowColor: 'black',
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'flex-end',
		shadowOffset: { height: 0, width: 0 }
	},
	footer: {
		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'flex-end',
		justifyContent: 'flex-end',
		width: '100%',
		paddingHorizontal: 20,
    	borderBottomLeftRadius: 32,
		borderBottomRightRadius: 32,
		fontWeight: 700,
	},
	title: {
		paddingTop: 15,
      	paddingBottom: 10,
      	color: 'white',
      	fontSize: 30,
		fontFamily: 'GTEestiDisplay-Medium'
	},
	locationContainer: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		paddingBottom: 10,
		
	},
	Location: {
		color: 'white',
		fontFamily: 'GTEestiDisplay-Medium',
		fontSize: 20,
	},
	tagContainer: {
		flexDirection: 'row',
		paddingBottom: 15,
	},
	tag: {
		color: 'white',
		fontFamily: 'GTEestiDisplay-Medium',
		borderColor: 'white',
		borderRadius: 18,
		borderWidth: 2,
		borderColor: 'white',
		paddingHorizontal: 10,
		paddingVertical: 7.5,
		marginVertical: 2.5,
		marginRight: 10

	}
})

export default styles