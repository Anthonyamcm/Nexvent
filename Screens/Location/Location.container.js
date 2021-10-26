import React from "react";
import { SafeAreaView , View, Text} from "react-native";
import styles from "./Location.style";
import Icon from 'react-native-vector-icons/Ionicons'
import CustomButton from "../../Components/Button/Button";

class LocationContainer extends React.Component{
    render(){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={styles.mainContainer}>
                    <View style={styles.top}>
                    <Text style={styles.title}>Enable Location</Text>
                    </View>
                    <View style={{marginVertical: 100, alignItems: 'center'}}>
                        <Icon name={'location-outline'} size={64} color={'gray'}/>
                        <Text style={styles.text}>You'll need to enable your location in order to use Nexvent</Text>
                        <CustomButton
                                    style={{marginTop: 50, height: 50 , shadowColor: "#0072ff",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 3.84,
                                    elevation: 5}}
                                    shouldHaveGradient={true}
                                    titleFontSize={20}
                                    onPress={() => {this.props.navigation.navigate('MainRoute')}}
                                    title={'Enable'} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default LocationContainer;

