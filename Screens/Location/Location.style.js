import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    top: {
		paddingTop: 25,
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

    }
})

export default styles