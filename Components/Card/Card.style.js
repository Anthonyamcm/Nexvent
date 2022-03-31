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
      	paddingBottom: 15,
      	color: 'white',
      	fontSize: 32,
		fontFamily: 'GTEestiDisplay-Medium'
	},
	locationContainer: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		paddingBottom: 15,
		
	},
	Location: {
		color: 'white',
		fontFamily: 'GTEestiDisplay-Medium',
		fontSize: 18,
	},
	tagContainer: {
		flexDirection: 'row',
		paddingBottom: 20,
		alignItems: 'center'
	},
	tag: {
		color: 'white',
		fontFamily: 'GTEestiDisplay-Medium',
		paddingHorizontal: 10,
		paddingVertical: 10,
		fontSize: 14

	},
	image: {
		width: 25,
		height: 25,
		borderColor: 'white',
		borderWidth: 2,
        borderRadius: 25/2,
        marginRight: -15,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
          },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
})

export default styles