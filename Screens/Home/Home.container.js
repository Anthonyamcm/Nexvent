import React from 'react';
import { View,SafeAreaView, Image, Text} from 'react-native';
import CardStack from '../../Components/Card/CardStack';
import Card from '../../Components/Card/Card';
import CardItem from '../../Components/Card/CardItem';
import styles from './Home.style';
import * as API from '../../Api/Api';



class HomeContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        tags: [],
        isLoading: false
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

componentDidMount() {
  this.getEventsByFilter();
}
  

  render(){

    const { 
      data,
      isLoading
    } = this.state

      return (
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
          <View style={styles.containerHome}>
            <View style={styles.top}>
              <View style={{justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row'}}>
                <Image resizeMode='contain' source={require('../../Images/nexvent-logo.png')} style={{maxHeight: 40, maxWidth:40, alignSelf: 'flex-start'}}/>
                <Text style={{fontFamily: 'GTEestiDisplay-Medium', fontSize: 24}}> Nexvent </Text>
              </View>
            </View>           
            {!isLoading && (
              <CardStack loop={true} verticalSwipe={false} renderNoMoreCards={() => null} ref={swiper => (this.swiper = swiper)}>
              {data.map((card, index) => (
                <Card key={index}><CardItem image={require('../../Images/image01.jpg')} name={card.title} description={card.description}/></Card>
                ))}
              </CardStack>
            )}
          </View>
        </SafeAreaView>
      );
  }
};

export default HomeContainer;