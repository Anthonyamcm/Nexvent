import axios from 'axios';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Profile from '../Components/Profile/Profile';

const deviceId = DeviceInfo.getUniqueId();
const deviceModel = Platform.OS;
const deviceOS = DeviceInfo.getSystemVersion();

const {API_URL} = Config;

let headers = {};
headers = {
	'session-id': deviceId,
	platform: deviceModel,
	os: deviceOS,
};

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
        'Accept': 'application/json'
	},
});

const instanceMultiFormData = axios.create({
	baseURL: API_URL,
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instanceMultiFormData.defaults.headers.common['Content-Type'] = 'multipart/form-data';

instance.interceptors.response.use(
	(response) =>
		// eslint-disable-line
		response.data,
	(error) =>
		// eslint-disable-line
		Promise.reject(error),
);

instanceMultiFormData.interceptors.response.use(
	(response) =>
		// eslint-disable-line
		response.data,
	(error) =>
		// eslint-disable-line
		Promise.reject(error),
);

const LOGIN_SUCCESS = async (authData, callback = null) => {
	//if (authData) {
	instance.defaults.headers.common.Authorization = `BEARER ${authData.token}`;
	instanceMultiFormData.defaults.headers.common.Authorization = `BEARER ${authData.token}`;

	let oldJsonValue = authData;
	Profile.setUserDetails(
		oldJsonValue
	);
};

const LOGIN = () => ({
	doLogin: (objectData) =>
		instance.post('/users/authenticate', objectData, { headers }),
});

const REGISTER = () => ({
	doRegister: (objectData) =>
		instance.post('/users/register', objectData, { headers }),
});

const USER = () => ({
	getEvents: (objectData) => 
		instance.post('/events/result', objectData, {headers})
})

const getToken = () => {
	return instance.defaults.headers.common.Authorization;
}

export {
	LOGIN,
	LOGIN_SUCCESS,
	REGISTER,
	USER,
	getToken
};