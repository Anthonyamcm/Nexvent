import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1,
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
    subTitle:{
        marginVertical: 30,
        fontSize: 14,
        fontFamily: 'GTEestiDisplay-Regular'
    },
    tagGroup: {
        marginTop: 0,
        marginHorizontal: 0,
      },
      customTags: {
        marginVertical: 30,
      },
      tagStyle: {
        marginTop: 4,
        marginHorizontal: 0,
        backgroundColor: '#eee',
        borderWidth: 0,
        marginRight: 12,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 18
      },
      textStyle: {
        color: '#666',
        fontSize: 14,
        fontWeight: 'bold',
      },
})

export default styles