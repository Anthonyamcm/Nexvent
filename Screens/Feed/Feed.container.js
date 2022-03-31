import React from 'react'
import { View, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import CardStack from '../../Components/Card/CardStack';
import Card from '../../Components/Card/Card';
import CardItem from '../../Components/Card/CardItem';
import styles from './Feed.style'
import * as appColors from '../../Components/colors/appColor'
import * as API from '../../Api/Api';

class FeedContainer extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            data: [],
            isLoading: false
        }
    }

    getEventsByFilter = async () => {

        let bodyData = {
            coordinates: [-4.251433, 55.860916],
            distance: 50,
            tags: ['Show'],
            dates: {startDate: '2022-03-30T23:00:00Z', endDate: '2022-04-05T23:00:00Z'}
        }

        this.setState({isLoading: true})

        try{

            const result = await API.USER().getEvents(bodyData)

            if(result.code === 200){
                this.setState({
                    data: result.event,
                    isLoading: false
                })
            } else {
                this.setState({isLoading: false})
            }

        } catch(error) {
            console.log(error)
            this.setState({isLoading: false})
        }

    }

    componentDidMount(){
        this.getEventsByFilter()
    }

    render(){

        const {
            data,
            isLoading
        } = this.state

        return(
            <SafeAreaView style={{flex:1, backgroundColor: appColors.grey1}}>

                <View style={styles.container}>

                    <View style={{flexDirection: "row",justifyContent: "space-between",alignItems: "center",paddingHorizontal: 15}}>

                        <View style={{justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row'}}>
                            <Image resizeMode='contain' source={require('../../Images/nexvent-logo.png')} style={{maxHeight: 40, maxWidth:40, alignSelf: 'flex-start'}}/>
                            <Text style={{fontFamily: 'GTEestiDisplay-Medium', fontSize: 24, paddingHorizontal: 10}}>{'Nexvent'}</Text>
                        </View>

                        <TouchableOpacity>
                            <Icon name={'md-filter'} size={32}/>
                        </TouchableOpacity>

                    </View>

                    {!isLoading && (
                    <CardStack loop={true} verticalSwipe={false} renderNoMoreCards={() => null} ref={swiper => (this.swiper = swiper)}>
                        {data.map((data,index) => (
                            <Card key={index}>
                                <CardItem
                                    image={require('../../Images/image01.jpg')}
                                    name={data.title}
                                    location={data.address}
                                    tags={data.tags}/>
                            </Card>
                        ))}
                    </CardStack>
                    )}
                    
                </View>

            </SafeAreaView>
        )

    }

}

export default FeedContainer