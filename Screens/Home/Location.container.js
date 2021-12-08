import React from 'react';
import { View , SafeAreaView} from 'react-native';
import CustomButton from '../../Components/Button/Button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import CustomHeader from '../../Components/Header/Header';
import styles from './Location.styles'


class LocationContainer extends React.Component {

  render() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>

        <CustomHeader
            title={'Location'}
            onBackPressed={() => this.props.navigation.goBack(null)} />


        <View style={styles.container}>
          <View style={{height: '40%'}}>
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
                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
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
                                description: {fontFamily: 'GTEestiDisplay-Medium', fontSize: 15},
                                listView: {
                                    borderRadius: 6,
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
                                console.log(details.geometry.location)
                                }}
                            debounce={200}/>
              </View>
          </View>
          <View style={styles.bottom}>

              <CustomButton
                  title='Apply'
                  shouldHaveGradient={true}
                  titleFontSize={24}
                  style={{shadowColor: "#0072ff",
                          shadowOffset: {
                          width: 0,
                          height: 2,
                          },
                          shadowOpacity: 0.5,
                          shadowRadius: 3.84,
                          elevation: 5}}
                          />

          </View>
    </SafeAreaView>
  );
  }
};

export default LocationContainer;