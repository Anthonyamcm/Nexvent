import React from "react";
import { StyleSheet , Dimensions } from "react-native";

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    top: {
		paddingTop: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
    
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 200,
      },
      itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
      },
      itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
      }
})

export default styles