import React from 'react';
import { View,SafeAreaView, Image, Text, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import CardStack from '../../Components/Card/CardStack';
import Card from '../../Components/Card/Card';
import CardItem from '../../Components/Card/CardItem';
import CustomButton from '../../Components/Button/Button';
import styles from './Home.style';
import * as API from '../../Api/Api';
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import { openBottomSheet, closeBottomSheet, updateState } from '../../Navigation/Root';
import moment from 'moment';
import CalendarContainer from '../../Components/Modal/Calendar.container';
import LocationContainer from '../../Components/Modal/Location.container';
import TagsContainer from '../../Components/Modal/Tags.container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MultiSlider from '../../Components/Slider/MultiSlider';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import * as appColors from '../../Components/colors/appColor'

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
        isTagsModalVisible: false,
        distance: 1
    }
  }


  getEventsByFilter = async () => {

    const {
        tags,
        dates,
        location,
        distance
    } = this.state;

    this.setState({
      isLoading: true
    })

    console.log(dates.endDate)

    let bodydata = {
      tags: tags,
      dates: {startDate: moment.utc(moment(dates.startDate)).format(), endDate: dates.endDate != null ?  moment.utc(moment(dates.endDate)).format() : null},
      coordinates: [location.lng, location.lat],
      distance: distance
    }

    console.log(bodydata)

    try {
        const result = await API.USER().getEvents(bodydata)
        console.log(result)
        if (result.code === 200) {
            this.setState({
                data: result.event,
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

  console.log(name)
    this.setState({
      location: {name: name.structured_formatting.main_text, country: name.structured_formatting.secondary_text , lat: details.lat, lng: details.lng}
    })

}

changeDates = (date) => {

  this.setState({
    dates: date
  })

}


////////////// Modal Logic ////////////////////////////////


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
          country: location.country,
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
          location: {name: location.name, country: location.country, lat: location.lat, lng: location.lng},
          tags: tags.tags
      })

      this.getEventsByFilter()
  }
  catch(error){
      console.log(error)
  }
}


/////////// Modal Logic ////////////////////////////






/////////// Sheet Logic //////////////////////////


closeSheet = () => {
  this.getEventsByFilter();
  closeBottomSheet();
}


/////////// Sheet Logic //////////////////////////

componentDidMount() {
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

      return (
        <SafeAreaView style={{flex:1, backgroundColor: appColors.grey1}}>

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
                              location={data.address} 
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

  const [sliderOneChanging, setSliderOneChanging] = React.useState(false);

  const [sliderOneValue, setSliderOneValue] = React.useState([5]);

  const sliderOneValuesChangeStart = () => setSliderOneChanging(true);

  const sliderOneValuesChange = values => setSliderOneValue(values);

  const sliderOneValuesChangeFinish = () => setSliderOneChanging(false);


  const {
    location,
    dates,
    tags
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
                onPress={() => this.closeSheet()}
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
          <View style={[styles.modalRow,{paddingHorizontal: 32}]}>
            <Text style={{fontFamily: 'GTEestiDisplay-Medium', fontSize: 16, paddingVertical: 0, color: appColors.grey4}}>{'Maximum Distance'}</Text>
            <Text style={{fontFamily: 'GTEestiDisplay-Medium', fontSize: 16, paddingVertical: 0, color: appColors.grey4}}>{sliderOneValue + ' mi'}</Text>
          </View>
          <View style={[styles.modalRow, {paddingHorizontal: 32}]}>
            <MultiSlider
              values={sliderOneValue}
              sliderLength={330}
              onValuesChangeStart={sliderOneValuesChangeStart}
              onValuesChange={sliderOneValuesChange}
              onValuesChangeFinish={sliderOneValuesChangeFinish, this.setState({distance: sliderOneValue[0]})}
              min={1}
              max={50}
              trackStyle={{
                height: 5,
                backgroundColor: appColors.grey3
              }}
              smoothSnapping={true}
            />
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
                <View style={styles.row}>
                  <View style={{flexDirection: 'column', flex: 1}}>
                  <MaskedView
                      style={{ height: 17 }}
                      maskElement={<Text style={[styles.text, {fontSize: 17}]}>{moment(dates.startDate).format('MMM DD')}</Text>}
                      >
                    <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[appColors.lightBlue, appColors.darkBlue]} style={{ flex: 1 }}/>
                  </MaskedView>
                    <Text style={[styles.text, {color: appColors.grey4}]}>{moment(dates.startDate).format('YYYY')}</Text>
                  </View>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <Icon 
                      name={'caret-forward'}
                      size={22}
                      style={{alignSelf: 'center', color: appColors.grey3}}/>
                  </View>
                  <View style={{flexDirection: 'column', flex: 1}}>
                  {dates.endDate != null && (
                  <View>
                    <MaskedView
                      style={{ height: 17 }}
                      maskElement={<Text style={[styles.text, {fontSize: 17}]}>{moment(dates.endDate).format('MMM DD')}</Text>}
                      >
                    <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[appColors.lightBlue, appColors.darkBlue]} style={{ flex: 1 }}/>
                  </MaskedView>
                    <Text style={[styles.text, {color: appColors.grey4}]}>{moment(dates.endDate).format('YYYY')}</Text>
                  </View>
                  )}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({isLocationModalVisible: true})} style={styles.view}>
              <View style={styles.row}>
                <View style={{flexDirection: 'column', flex: 1}}>
                  <MaskedView
                      style={{ height: 20 }}
                      maskElement={<Text style={[styles.text, {fontSize: 17}]}>{location.name}</Text>}
                      >
                    <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[appColors.lightBlue, appColors.darkBlue]} style={{ flex: 1 }}/>
                  </MaskedView>
                    <Text style={[styles.text, {color: appColors.grey4}]}>{location.country}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({isTagsModalVisible: true})} style={styles.view}>
                <View style={styles.row}>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <MaskedView
                        style={{ height: 20 }}
                        maskElement={<Text style={[styles.text, {fontSize: 17}]}>{'Tags'}</Text>}
                        >
                      <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={[appColors.lightBlue, appColors.darkBlue]} style={{ flex: 1 }}/>
                    </MaskedView>
                      <Text style={[styles.text, {color: appColors.grey4}]} numberOfLines={1}>{tags.map(tag => tag).join(", ")}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
  )
}


};

export default HomeContainer;