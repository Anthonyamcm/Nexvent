import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
    title: {
        fontSize: 24,
        fontFamily: 'GTEestiDisplay-Regular'
    },
    text: {
        fontSize: 20,
        fontFamily: 'GTEestiDisplay-Regular',
        paddingHorizontal: 20,
        marginTop: 100,
        textAlign: 'center'

    },
    bottom:{
        paddingHorizontal: 30,
        bottom:0
    }
})

export default styles