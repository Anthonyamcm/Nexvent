import React from 'react';
import { View, Text} from 'react-native';
import CustomButton from '../Button/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from './Modal.style';

class LocationContainer extends React.Component{
    render(){
        return(
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 50, borderRadius: 32 }}>

                <View style={styles.modalHeader}>
                    <Text style={styles.modalText}>{'Location'}</Text>
                </View>

                <View style={{paddingVertical: 70, height: 420}}>
                    <GooglePlacesAutocomplete
                        placeholder='Search '
                        returnKeyType={'search'}
                        enablePoweredByContainer={false}
                        query={{
                            key: 'AIzaSyDB3m9IgLnTqEBC-GxuHeuAHjSkyyJZwKw',
                            language: 'en',
                            types: '(cities)'
                            }}
                            fetchDetails={true}
                            filterReverseGeocodingByTypes={['political', 'administrative_area_level_1']}
                            styles={{
                                textInput: {
                                    height: 47.5,
                                    fontSize: 16,
                                    borderWidth: 1.5,
                                    paddingVertical: 0,
                                    borderRadius: 8,
                                    paddingHorizontal:20,
                                    fontFamily: 'GTEestiDisplay-Medium',
                                    borderColor: 'lightgray',
                                    backgroundColor: 'white',
                                },
                                description: {
                                    fontFamily: 'GTEestiDisplay-Medium', 
                                    fontSize: 15
                                },
                                listView: {
                                    borderRadius: 8,
                                    borderWidth: 1.5,
                                    borderColor: 'lightgray',
                                    height: 'auto'
                                },
                                row: {
                                    backgroundColor: '#FFFFFF',
                                    height: 44,
                                    flexDirection: 'row',
                                },
                            }}
                            onPress={(data, details = null) => {
                                    this.props.onChange(data, details.geometry.location)
                            }}
                            debounce={200}/>
                </View>

                <View style={styles.modalFooter}>

                    <CustomButton
                        title='Save'
                        shouldHaveGradient={true}
                        titleFontSize={24}
                        isLoading={this.props.isSaving}
                        onPress={this.props.save}
                        style={{shadowColor: "#0072ff",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 3.84,
                                elevation: 5,
                                position: 'absolute',
                                bottom: 15,
                                alignSelf: 'center'
                                }}/>

                </View>
                
            </View>
        )
    }
}

export default LocationContainer