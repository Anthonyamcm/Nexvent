import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DETAILS_KEY = '@user_details';

let userDetails = undefined;

function setFastUserDetails(data) {
    userDetails = data;
}

async function getUserDetails() {
    try {
        const jsonValue = await AsyncStorage.getItem(USER_DETAILS_KEY);
        return jsonValue != null ? jsonValue : null;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function setUserDetails(value) {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(USER_DETAILS_KEY, jsonValue)

        this.setFastUserDetails(value);

        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function deleteUserDetails() {
    try {
        await AsyncStorage.removeItem(USER_DETAILS_KEY);
        return true;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export {
    getUserDetails,
    setUserDetails,
    deleteUserDetails,
    userDetails,
    setFastUserDetails,
};