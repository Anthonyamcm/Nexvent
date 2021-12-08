import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: { 
		flex:1,
		flexDirection: 'column',
        marginHorizontal: 20,
    },
    text: {
        fontFamily: 'GTEestiDisplay-Medium',
        fontSize: 18,
        paddingVertical: 10
    },
    row: {
        height: '33%',
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1.5
    },
    bottom:{
        bottom:0
    },
});

export default styles