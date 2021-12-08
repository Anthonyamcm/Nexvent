import React from 'react';
import { View,SafeAreaView, Image, Text, TouchableOpacity, Dimensions, ScrollView, Button} from 'react-native';
import CardStack from '../../Components/Card/CardStack';
import Card from '../../Components/Card/Card';
import CardItem from '../../Components/Card/CardItem';
import CustomButton from '../../Components/Button/Button';
import styles from './Home.style';
import * as Profile from '../../Components/Profile/Profile'
import * as API from '../../Api/Api';
import Icon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import Calendar from "react-native-calendar-range-picker";
import TagsView from '../../Components/Tag/TagView';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { openBottomSheet, closeBottomSheet, updateState } from '../../Navigation/Root';

const { width } = Dimensions.get('window');

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        selected: [],
        startDate: '',
        endDate: '',
        isLoading: false,
        isSaving: false,
        isDateModalVisible: false,
        isLocationModalVisible: false,
        isTagsModalVisible: false
    }
  }


  getEventsByFilter = async () => {

    const {
        data
    } = this.state;

    this.setState({
      isLoading: true
    })

    try {
        const result = await API.USER().getEvents();
        if (result.code === 200) {
            let newData = data;
            if (data.length === 0) {
                newData = result.event;
            } else {
                result.result.forEach((item) => {
                    newData.push(item);
                });
            }
            this.setState({
                data: newData,
                isLoading: false
            });
        }
    } catch (error) {
        console.log(error);
        this.setState({
          isLoading: false
        })
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

  updateUserTags = async () => {

    const userDetails = Profile.userDetails;

    this.setState({
      isSaving: true
    })

      try {
        const data = {
          tags: this.state.selected
        }
        const result = await API.USER().updateTags(userDetails.id, data)

        if(result.code === 200){
          this.setState({
            isSaving: false,
            isTagsModalVisible: false
          })
        } else {
          // nothing yet
        }

      } catch (error) {}

  }

  getUserTags = async () => {

    const userDetails = Profile.userDetails;

    try{

      const result = await API.USER().getTags(userDetails.id)
      if(result.code === 200){
        this.setState({
          selected: result.user.tags
        })
      }else{
        // nothing yet
      }
    } catch (error) {}

  }


componentDidMount() {
  this.getEventsByFilter();
  this.getUserTags();
}

  

  render(){

    const { 
      data,
      isLoading,
      isSaving,
      startDate,
      endDate,
      selected,
      isDateModalVisible,
      isLocationModalVisible,
      isTagsModalVisible
    } = this.state

    const tags = ['Swift', 'Kotlin', 'Really long tag', 'Haskell', 'Java']

      return (
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
          <View style={styles.containerHome}>
            <View style={styles.top}>
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Image resizeMode='contain' source={require('../../Images/nexvent-logo.png')} style={{maxHeight: 40, maxWidth:40, alignSelf: 'flex-start'}}/>
                <Text style={{fontFamily: 'GTEestiDisplay-Medium', fontSize: 24}}> Nexvent </Text>
              </View>
              <TouchableOpacity onPress={() => this.onFiltersPressed()}>
                  <Icon name={'md-filter'} size={32}/>
              </TouchableOpacity>
            </View>           
            {!isLoading && (
              <CardStack loop={true} verticalSwipe={false} renderNoMoreCards={() => null} ref={swiper => (this.swiper = swiper)}>
              {data.map((card, index) => (
                <Card key={index}><CardItem image={require('../../Images/image01.jpg')} name={card.title} description={card.description}/></Card>
                ))}
              </CardStack>
            )}
          </View>
          <Modal isVisible={isDateModalVisible}>
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 50, borderRadius: 32 }}>
              <View style={styles.modalHeader}>
                <Text style={styles.text}>{'Calendar'}</Text>
              </View>
              <View style={{paddingVertical: 15}}>
              <Calendar
                disabledBeforeToday={true}
                startDate={startDate}
                endDate={endDate}
                onChange={({ startDate, endDate }) => this.setState({startDate,endDate})}
                isMonthFirst={true}
                style={{
                  monthNameText: {fontFamily: 'GTEestiDisplay-Medium'},
                  dayNameText: {fontFamily: 'GTEestiDisplay-Medium'},
                  dayText: {fontFamily: 'GTEestiDisplay-Medium'},
                  holidayColor: 'black',
                  selectedDayBackgroundColor: '#0072ff'
                }}
              />
            </View>
            <View style={styles.modalFooter}>
              <CustomButton
                  title='Save'
                  shouldHaveGradient={true}
                  titleFontSize={24}
                  onPress={() => this.setState({isDateModalVisible: false})}
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
          </Modal>
          <Modal isVisible={isLocationModalVisible}>
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 50, borderRadius: 32 }}>
            <View style={{paddingVertical: 15, height: 300}}>
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
                                    borderRadius: 32,
                                    paddingHorizontal:20,
                                    fontFamily: 'GTEestiDisplay-Medium',
                                    borderColor: 'lightgray',
                                    backgroundColor: 'white',
                                },
                                description: {fontFamily: 'GTEestiDisplay-Medium', fontSize: 15},
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
                                console.log(data, details.geometry.location)
                                }}
                            debounce={200}/>
              </View>
              <CustomButton
                  title='Save'
                  shouldHaveGradient={true}
                  titleFontSize={24}
                  onPress={() => this.setState({isLocationModalVisible: false})}
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
          </Modal>
          <Modal isVisible={isTagsModalVisible}>
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 50, borderRadius: 32 }}>
              <View style={styles.modalHeader}>
                  <Text style={styles.text}>{'Tags'}</Text>
              </View>
              <ScrollView style={{paddingVertical: 75}}>
                <TagsView
                all={tags}
                selected={selected}
                isExclusive={false}
                onPress = {this.onPress}/>
              </ScrollView>
              <View style={styles.modalFooter}>
                <CustomButton
                  title='Save'
                  shouldHaveGradient={true}
                  titleFontSize={24}
                  isLoading={isSaving}
                  onPress={() => this.updateUserTags()}
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
          </Modal>
        </SafeAreaView>
      );
  }


onFiltersPressed = () => {
    updateState(this.filtersRenderContent, 350);
    openBottomSheet();
}


filtersRenderContent = () => {

  return(
    <View style={styles.modalContentContainer}>
        <View style={[styles.modalRow, { justifyContent: 'space-between', paddingHorizontal: 32 }]}>
            <Text style={{fontSize: 26, fontFamily: 'GTEestiDisplay-Medium'}}>{'Filters'}</Text>
              <CustomButton
                icon={'md-checkmark-sharp'}
                iconSize={32}
                shouldHaveGradient={true}
                titleFontSize={24}
                onPress={() => closeBottomSheet()}
                style={{width: 50,
                        shadowColor: "#0072ff",
                        shadowOffset:{
                              width: 0,
                              height: 2,
                              },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        elevation: 5}}/>
          </View>
          <View style={[styles.modalRow, {paddingHorizontal: 32}]}>
              <Text style={[styles.text, {color: 'lightgray'}]}>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'}</Text>
          </View>
          <View style={[styles.modalRow, {height: 100}]}>
          <ScrollView 
              ref={(scrollView) => { this.scrollView = scrollView; }}
              style={styles.container}
              //pagingEnabled={true}
              horizontal= {true}
              decelerationRate={0}
              showsHorizontalScrollIndicator={false}
              snapToInterval={width - 157.5}
              snapToAlignment={"center"}
              contentInset={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 50,
              }}>
              <TouchableOpacity onPress={() => this.setState({isDateModalVisible: true})} style={styles.view}>
                <View style={{paddingHorizontal: 15}}>
                  <AntIcon
                    name="calendar"
                    size={22}
                    style={{paddingTop: 10}}
                    />
                    <Text style={styles.text}>{'1 Dec 2021 - 2 Dec 2021'}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({isLocationModalVisible: true})} style={styles.view}>
              <View style={{paddingHorizontal: 15}}>
                  <Icon
                    name="md-location-outline"
                    size={22}
                    style={{paddingTop: 10}}
                    />
                    <Text style={styles.text}>{'Glasgow, Uk'}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({isTagsModalVisible: true})} style={styles.view}>
              <View style={{paddingHorizontal: 15}}>
                  <Icon
                    name="md-pricetags-outline"
                    size={22}
                    style={{paddingTop: 10}}
                    />
                    <Text style={styles.text}>{'Drag, Show, 18+, Bingo ...'}</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
  )
}


};

export default HomeContainer;