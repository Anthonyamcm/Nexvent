import React from "react";
import { StyleSheet , Dimensions} from "react-native";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
    Card: {
		borderRadius: 32,
      	width: DIMENSION_WIDTH - 40,
      	height: DIMENSION_HEIGHT - 220,
      	paddingTop: 10,
      	margin: 10,
      	shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowColor: 'black',
		display: 'flex',
		shadowOffset: { height: 0, width: 0 }
	},
	CardFooter: {
		display: 'flex',
		flexDirection: 'column',
		alignSelf: 'flex-end',
		flex: 1,
		justifyContent: 'flex-end',
		width: '100%',
		paddingHorizontal: 20,
    	backgroundColor: 'rgba(0, 0, 0, 0.05)',
    	borderRadius: 32,
		fontWeight: 700,
	},
	Title: {
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
		display: "flex",
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
		paddingTop: 7.5,
		paddingRight: 10,
		paddingBottom: 7.5,
		paddingLeft: 7.5,
		marginHorizontal: 5

	}
})

export default styles