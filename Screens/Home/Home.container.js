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
import Modal from "react-native-modal";
import Calendar from "react-native-calendar-range-picker";
import TagsView from '../../Components/Tag/TagView';
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
              <View style={{paddingBottom: 75, paddingTop: 5}}>
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
          </Modal>
          <Modal isVisible={isLocationModalVisible}>
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 50, borderRadius: 16 }}>
              <Text>Hello!</Text>

              <Button title="Hide modal 2" onPress={() => this.setState({isLocationModalVisible: false})} />
            </View>
          </Modal>
          <Modal isVisible={isTagsModalVisible}>
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 50, borderRadius: 32 }}>
                <TagsView
                all={tags}
                selected={selected}
                isExclusive={false}
                onPress = {this.onPress}/>
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
          <View style={[styles.modalRow, {height: 150}]}>
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
              <TouchableOpacity onPress={() => this.setState({isDateModalVisible: true})} style={styles.view}/>
              <TouchableOpacity onPress={() => this.setState({isLocationModalVisible: true})} style={styles.view}/>
              <TouchableOpacity onPress={() => this.setState({isTagsModalVisible: true})} style={styles.view}/>
            </ScrollView>
          </View>
        </View>
  )
}


};

export default HomeContainer;