import { StyleSheet , Dimensions} from "react-native";


const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
    }
})

export default styles