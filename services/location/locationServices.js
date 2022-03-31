import Geolocation from 'react-native-geolocation-service';

export function getLocation() {

    Geolocation.getCurrentPosition(
        (position) => {
            console.log(position)
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { 
            enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 
        }
    )

}