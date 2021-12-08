import { StyleSheet , Dimensions} from "react-native";

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
    containerHome: { 
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    top: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
    tagContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: 150,
        height: DIMENSION_HEIGHT - 175
    },
    text: {
        fontFamily: 'GTEestiDisplay-Medium',
        fontSize: 26
    }
})

export default styles