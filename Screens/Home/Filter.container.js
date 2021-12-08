import React from "react";
import { View, SafeAreaView, Text} from 'react-native';
import CustomHeader from "../../Components/Header/Header";
import CustomButton from "../../Components/Button/Button";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TagsView from "../../Components/Tag/TagView";
import styles from './Filter.style'


class FilterContainer extends React.Component{
    constructor(props){
        super(props)
    
        this.state = {
          selected: []
        }
    }

    addOrRemove = (array, item) => {
        const exists = array.includes(item)
      if (exists) {
          return array.filter((c) => { return c !== item })
        } else {
          const result = array
          result.push(item)
          return result
        }
    }

    onPress = (tag) => {

        let {selected} = this.state
    
        selected = this.addOrRemove(selected, tag)
    
        this.setState({
          selected
        })

     }

    render(){
        const {selected} = this.state
        const tags = ['Swift', 'Kotlin', 'C#', 'Haskell', 'Java']
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>

                <CustomHeader
                    title={'Search Filters'}
                    onBackPressed={() => this.props.navigation.goBack(null)}/>

                <View style={styles.container}>
                    <View style={{height: '15%'}}>
                        <Text style={styles.text}>{'Location'}</Text>
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
                        <Text style={styles.text}>{'Dates'}</Text>
                        
                    <View style={styles.row}>
                        <Text style={styles.text}>{'Tags'}</Text>
                        <TagsView
                            all={tags}
                            selected={selected}
                            isExclusive={false}
                            onPress = {this.onPress}/>
                    </View>
                    <View style={styles.bottom}>
                        <CustomButton
                            title='Apply'
                            shouldHaveGradient={true}
                            titleFontSize={24}
                            onPress={() => this.props.navigation.goBack(null)}
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
                </View>
            </SafeAreaView>
        )
    }
}

export default FilterContainer