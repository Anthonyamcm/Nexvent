import { StyleSheet, Dimensions } from "react-native";
import * as appColors from '../../Components/colors/appColor'

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
    headers:{
        fontSize: 20,
        color: 'black',
        fontFamily: 'GTEestiDisplay-Medium',
    },
    info:{
        display: 'flex',
		flexDirection: 'column',
		alignSelf: 'center',
		width: DIMENSION_WIDTH - 40,
        height: DIMENSION_HEIGHT,
        backgroundColor: 'white',
        borderRadius: 16,
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
        fontSize: 15,
        fontFamily: 'GTEestiDisplay-Medium',
        paddingHorizontal: 10,
        color: appColors.grey4,
        flexWrap: 'wrap'
    },
    tag: {
		fontFamily: 'GTEestiDisplay-Medium',
		flexDirection: 'row',
        borderRadius: 23,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
	},
    text: {
        fontSize: 16,
        paddingVertical: 4,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'GTEestiDisplay-Medium'
    },
    gradient: {
        borderRadius: 23,
        marginRight: 10,
        shadowColor: "#0072ff",
        shadowOffset: {
            width: 0,
            height: 1,
          },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    image: {
        width: 60,
        height: 60,
        borderRadius:8
    },
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 40,
        left: 50,
        right: 0,
    },
    button: {
        backgroundColor: 'white', 
        borderRadius: 32, 
        padding: 10,
        marginRight: 15,
        shadowOpacity: 0.2,
		shadowRadius: 5,
		shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 }
    }
})

export default styles