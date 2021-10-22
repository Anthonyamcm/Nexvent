import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import CardStack from '../../Components/Card/CardStack';
import Card from '../../Components/Card/Card';
import CardItem from '../../Components/Card/CardItem';
import styles from './Home.style';
import Icon from 'react-native-vector-icons/Ionicons';
import Tags from '../../Components/Tags/Tags';
import Location from '../../Components/Location/Location';

const fullWidth = Dimensions.get('window').width;

const Home = () => {
  return (
      <View style={styles.containerHome}>
        <View style={styles.top}>
        <Location/>
        <Tags/>
        </View>
        <CardStack
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}
          style={{backgroundColor: "white"}}
        >
          <Card>
              <CardItem
                image={require('../../Images/image01.jpg')}
                name={'Test Data'}
                description={'Test Description'}
              />
            </Card>
        </CardStack>
      </View>
  );
};

export default Home;