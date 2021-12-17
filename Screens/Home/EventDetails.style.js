import { StyleSheet, Dimensions } from "react-native";
import { color } from "react-native-reanimated";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex:1,
		flexDirection: 'column',
    },
    top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 50
	},
    info:{
        display: 'flex',
		flexDirection: 'column',
		alignSelf: 'center',
		width: DIMENSION_WIDTH - 40,
        height: DIMENSION_HEIGHT - 250,
        backgroundColor: 'white',
        borderRadius: 32,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowOpacity: 0.3,
		shadowRadius: 10,
		shadowColor: 'black',
		shadowOffset: { height: 0, width: 0 }
    },
    title: {
        fontFamily: 'GTEestiDisplay-Medium',
        fontSize: 26,
        paddingHorizontal: 5,
        paddingBottom: 10
    },
    row: {
        justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
        paddingVertical: 5,
        flexWrap: 'wrap',
    },
    rowText: {
        fontSize: 14,
        fontFamily: 'GTEestiDisplay-Medium',
        paddingHorizontal: 10,
        color: 'gray',
    },
    tag: {
		color: 'gray',
		fontFamily: 'GTEestiDisplay-Medium',
		borderColor: 'gray',
		borderRadius: 16,
		borderWidth: 2,
		borderColor: 'gray',
		paddingTop: 5,
		paddingRight: 7.5,
		paddingBottom: 5,
		paddingLeft: 7.5,
		marginHorizontal: 5,
		marginVertical: 2.5

	}

})

export default styles