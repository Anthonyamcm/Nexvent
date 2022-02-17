import React from 'react';
import { View,SafeAreaView, Image, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
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
import { openBottomSheet, closeBottomSheet, updateState } from '../../Navigation/Root';
import moment from 'moment';
import CalendarContainer from '../../Components/Modal/Calendar.container';
import LocationContainer from '../../Components/Modal/Location.container';
import TagsContainer from '../../Components/Modal/Tags.container';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const DATES_KEY = '@dates_key'
const LOCATION_KEY = '@location_key'
const TAGS_KEY = '@tags_key'


class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        tags: [],
        dates: {startDate: null, endDate: null},
        location: {},
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
  let {tags} = this.state

  tags = this.addOrRemove(tags, tag)

  this.setState({
    tags
    })
  }

changeLocation = (name, details) => {

    this.setState({
      location: {name: name.description, lat: details.lat, lng: details.lng}
    })

}

changeDates = (date) => {

  this.setState({
    dates: date
  })

}

  updateUserTags = async () => {

    const userDetails = Profile.userDetails;

    this.setState({
      isSaving: true
    })

      try {
        const result = await API.USER().updateTags(userDetails.id, this.state.selected)
        if(result.code === 200){
          this.setState({
            isSaving: false,
            isTagsModalVisible: false
          }, () => {
            updateState(this.filtersRenderContent, 350)
          })
        } else {
          
        }

      } catch (error) {}

}

close = () => {

  const {
    isDateModalVisible,
    isLocationModalVisible,
    isTagsModalVisible
  } = this.state

  if(isDateModalVisible === true){
    this.setState({
      isDateModalVisible: false
    })
  }
  if(isLocationModalVisible === true){
    this.setState({
      isLocationModalVisible: false
    })
  }
  if(isTagsModalVisible === true){
    this.setState({
      isTagsModalVisible: false
    })
  }
}



updateUserLocation = async () => {

  const userDetails = Profile.userDetails;

  this.setState({
    isSaving: true
  })

    try {
      const result = await API.USER().updateLocation(userDetails.id, this.state.location)
      if(result.code === 200){
        this.setState({
          isSaving: false,
          isLocationModalVisible: false
        },() => {
          updateState(this.filtersRenderContent, 350)
        })
      } else {
        
      }

    } catch (error) {}

}

Filters = async () => {
    try{

        let dates = await AsyncStorage.getItem(DATES_KEY);
        dates = JSON.parse(dates)

        let location = await AsyncStorage.getItem(LOCATION_KEY);
        location = JSON.parse(location)

        let tags = await AsyncStorage.getItem(TAGS_KEY);
        tags = JSON.parse(tags)

        this.setState({
            dates: {startDate: dates.startDate, endDate: dates.endDate},
            location: {name: location.name, lat: location.lat, lng: location.lng},
            tags: tags.tags
        })
    }
    catch(error){
        console.log(error)
    }
}

save = async () => {

  const { 
      dates,
      location,
      tags,
      isDateModalVisible,
      isLocationModalVisible,
      isTagsModalVisible
  } = this.state

  if(isDateModalVisible){

    try{
      const jsonValue ={
          startDate: dates.startDate,
          endDate: dates.endDate
      }

      await AsyncStorage.setItem(DATES_KEY, JSON.stringify(jsonValue))

      updateState(this.filtersRenderContent, 350);

      this.close()

      } catch(error){
          console.log(error)
      }
  }

  if(isLocationModalVisible){

    try{
      const jsonValue = {
          name: location.name,
          lat: location.lat,
          lng: location.lng
      }

      await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(jsonValue))

      updateState(this.filtersRenderContent, 350);

      this.close()

      } catch(error){
          console.log(error)
      }

  }

  if(isTagsModalVisible){

    try{
      const jsonValue = {
        tags: tags
      }

      await AsyncStorage.setItem(TAGS_KEY, JSON.stringify(jsonValue))


      updateState(this.filtersRenderContent, 350);

      this.close()

      } catch(error){
          console.log(error)
      }

  }

  
}

componentDidMount() {
  this.getEventsByFilter();
  this.Filters();
}
  render(){

    const { 
      data,
      isLoading,
      isSaving,
      dates,
      tags,
      isDateModalVisible,
      isLocationModalVisible,
      isTagsModalVisible
    } = this.state

    console.log(tags)
    
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

              {data.map((data, index) => (
                <Card key={index}>
                  <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('EventDetails', {data: data})}>
                    <CardItem image={require('../../Images/image01.jpg')} 
                              name={data.title} 
                              location={data.location.name} 
                              tags={data.tags}/>
                  </TouchableOpacity>
                </Card>
                ))}

              </CardStack>
            )}

          </View>

          <Modal isVisible={isDateModalVisible}>
              <CalendarContainer 
                startDate={dates.startDate}
                endDate={dates.endDate}
                save={this.save}
                onChange={this.changeDates}
                isSaving={isSaving}/>
          </Modal>

          <Modal isVisible={isLocationModalVisible}>
              <LocationContainer
                onChange={this.changeLocation}
                save={this.save}
                isSaving={isSaving}/>
          </Modal>

          <Modal isVisible={isTagsModalVisible}>
              <TagsContainer
                tags={tags}
                onPress={this.onPress}
                save={this.save}
                isSaving={isSaving}/>
          </Modal>

        </SafeAreaView>
      );
  }


onFiltersPressed = () => {
    updateState(this.filtersRenderContent, 350);
    openBottomSheet();
}


filtersRenderContent = () => {

  const {
    location,
    dates
  } = this.state

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
          <View style={[styles.modalRow, {height: 110}]}>
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
                <View style={[styles.row, {paddingTop: 10}]}>
                  <AntIcon
                    name="calendar"
                    size={22}
                    />
                  <Text style={styles.text}>{' Date(s)'}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>{ dates.endDate === null ? moment(dates.startDate).format('DD MMM YYYY') : moment(dates.startDate).format('DD MMM YYYY') + ' - ' + moment(dates.endDate).format('DD MMM YYYY') }</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({isLocationModalVisible: true})} style={styles.view}>
              <View style={[styles.row, {paddingTop: 10}]}>
                  <Icon
                    name="md-location-outline"
                    size={22}
                    />
                  <Text style={styles.text}>{' Location'}</Text>
              </View>
              <View style={styles.row}>
                    <Text style={styles.text}>{location.name}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({isTagsModalVisible: true})} style={styles.view}>
              <View style={[styles.row, {paddingTop: 10}]}>
                  <Icon
                    name="md-pricetags-outline"
                    size={22}
                    />
                  <Text style={styles.text}>{' Tags'}</Text>
              </View>
              <View style={styles.row}>
                    <Text style={styles.text} numberOfLines={1}>{'Drag, Show, Placeholder'}</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
  )
}


};

export default HomeContainer;