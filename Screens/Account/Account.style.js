import { StyleSheet , Dimensions} from "react-native";
import * as appColors from '../../Components/colors/appColor'

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
    containerHome: { 
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    column: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
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
    },
    button: {
        justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: 'lightgray',
        paddingVertical: 15,
    },
    buttonText: {
        flex: 1, 
        fontFamily: 'GTEestiDisplay-Medium', 
        paddingHorizontal: 25, 
        fontSize: 18, 
        justifyContent:  'center', 
        color: appColors.grey4 
    }
})

export default styles