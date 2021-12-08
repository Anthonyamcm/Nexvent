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
        marginVertical: 5,

    },
    container: {paddingHorizontal: 32},
    view: {
        marginTop: 5,
        backgroundColor: 'white',
        width: width - 195,
        marginVertical: 10,
        marginRight: 20,
        height: 75,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 5,
    }
});

export default styles