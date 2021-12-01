import React from 'react';
import { View} from 'react-native';
import CardStack from '../../Components/Card/CardStack';
import Card from '../../Components/Card/Card';
import CardItem from '../../Components/Card/CardItem';
import styles from './Home.style';
import Tags from '../../Components/Tags/Tags';
import Location from '../../Components/Location/Location';
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


  getTransactionsByFilter = async () => {

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
  this.getTransactionsByFilter();
}
  

  render(){

    const { 
      data,
      isLoading
    } = this.state

      return (
          <View style={styles.containerHome}>
            <View style={styles.top}>
            <Location/>
            <Tags/>
            </View>
            {!isLoading && (
              <CardStack loop={true} verticalSwipe={false} renderNoMoreCards={() => null} ref={swiper => (this.swiper = swiper)}>
              {data.map((card, index) => (
                <Card key={index}><CardItem image={require('../../Images/image01.jpg')} name={card.title} description={card.description}/></Card>
                ))}
              </CardStack>
            )}
          </View>
      );
  }
};

export default HomeContainer;