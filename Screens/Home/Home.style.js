import { StyleSheet , Dimensions} from "react-native";


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	containerHome: { 
		flex:1,
		flexDirection: 'column',
        marginHorizontal: 10,
    },
    top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
        paddingHorizontal: 15
	},
    bottom: {
        paddingTop: 15
    },
    modalContentContainer: {
        width: '100%',
        height: '100%',
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
        textAlignVertical: 'center',
        alignItems: 'center',
        marginVertical: 10,

    },
    container: {paddingHorizontal: 32},
    view: {
        marginTop: 5,
        backgroundColor: 'white',
        width: width - 195,
        marginVertical: 10,
        marginRight: 20,
        height: 90,
        borderRadius: 16,
        display: 'flex',
		flexDirection: 'column',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 5,
    },
    row: {
        justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
        paddingHorizontal: 15
    },
    modalHeader : {
        backgroundColor: 'white',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: "space-between",
        textAlignVertical: 'center',
        alignItems: 'center',
        height: 60,
        width: width - 40,
        top: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        fontFamily: 'GTEestiDisplay-Medium',
        fontSize: 26,
        paddingHorizontal: 20
    },
    modalFooter: {
        backgroundColor: 'white',
        position: 'absolute',
        height: 75,
        width: width - 40,
        bottom: 0,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        zIndex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tagsContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 0,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    text: {
        fontFamily: 'GTEestiDisplay-Medium',
        fontSize: 14,
        paddingVertical: 10,
    }
});

export default styles