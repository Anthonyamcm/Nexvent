import React from "react";
import 'react-native-get-random-values';
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DETAILS_KEY = '@user_details';
const PASSWORD_SECRET = '@USER-PASSWORD';
const EMAIL_SECRET = '@USER-EMAIL';

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

async function getUserCredentials() {
    try {
        const emailCiphertext = await AsyncStorage.getItem(EMAIL_SECRET);
        const passwordCiphertext = await AsyncStorage.getItem(PASSWORD_SECRET);
        const emailBytes = CryptoJS.AES.decrypt(emailCiphertext, EMAIL_SECRET);
        const passwordBytes = CryptoJS.AES.decrypt(passwordCiphertext, PASSWORD_SECRET);

        const credentials = {
            password: passwordBytes.toString(CryptoJS.enc.Utf8),
            email: emailBytes.toString(CryptoJS.enc.Utf8),
        }

        return credentials;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function setUserCredentials(credentials) {
    // encrypt and save the users pin
    try {
        const emailCiphertext = CryptoJS.AES.encrypt(credentials.email, EMAIL_SECRET).toString();
        const passwordCiphertext = CryptoJS.AES.encrypt(credentials.password, PASSWORD_SECRET).toString();
        AsyncStorage.setItem(EMAIL_SECRET, emailCiphertext);
        AsyncStorage.setItem(PASSWORD_SECRET, passwordCiphertext);
    } catch (error) {
        console.log(error);
    }
}

export {
    getUserDetails,
    setUserDetails,
    deleteUserDetails,
    userDetails,
    setFastUserDetails,
    setUserCredentials,
    getUserCredentials
};