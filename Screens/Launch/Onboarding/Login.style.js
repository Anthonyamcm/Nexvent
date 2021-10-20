import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        height: '100%',
    },
    top: {
		paddingTop: 25,
		marginHorizontal: 25,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        padding: 5,
    }
})

export default styles