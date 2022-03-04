import React, { Component } from "react";
import { View, ImageBackground, Dimensions, Text, TouchableOpacity, ScrollView, Image, Share} from "react-native";
import { SharedElement } from 'react-navigation-shared-element';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './EventDetails.style'
import CustomButton from "../../Components/Button/Button";
import LinearGradient from "react-native-linear-gradient";
import * as appColors from '../../Components/colors/appColor'

const DIMENSION_HEIGHT = Dimensions.get("window").height;


class EventDetailsContainer extends Component {
    

    render(){

        const data = this.props.route.params.data;

        return(
            <View style={styles.container}>
                
                <SharedElement id={`item.photo`}>
                    <ImageBackground 
                        source={require('../../Images/image01.jpg')} 
                        style={{ flex: 1,
                        width: null,
                        height: DIMENSION_HEIGHT / 2,
                        }}
                    />
                </SharedElement>

                <View style={styles.top}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="ellipsis-horizontal" size={36} color={"white"}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Icon name="md-close-circle-outline" size={36} color={"white"}/>
                    </TouchableOpacity>
                </View>   

                <View style={styles.info}>

                    <ScrollView 
                        ref={(scrollView) => { this.scrollView = scrollView; }}
                        horizontal={false}>

                        <Text style={styles.title}>{data.title}</Text>

                        <View style={styles.row}>
                            <Icon name="md-location-outline" size={22} color={appColors.grey4}/>
                            <Text style={styles.rowText}>{data.address}</Text>
                        </View>

                        <View style={styles.row}>
                            <Icon name="md-calendar-sharp" size={22} color={appColors.grey4}/>
                            <Text style={styles.rowText}>{Moment(data.date).format('DD MMMM YYYY')}</Text>
                        </View> 

                        <View style={styles.row}>
                            <Icon name="md-time-outline" size={22} color={appColors.grey4}/>
                            <Text style={styles.rowText}>{`${data.times[0]} - ${data.times[1]}`}</Text>
                        </View> 

                        <View style={[styles.row, {flexWrap: 'nowrap', paddingTop: 15}]}>
                            <ScrollView 
                                ref={(scrollView) => { this.scrollView = scrollView; }}
                                //pagingEnabled={true}
                                horizontal= {true}
                                decelerationRate={0}
                                showsHorizontalScrollIndicator={false}
                                >
                            {data.tags.map((tag, index) => 
                            <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#00c6ff','#0072ff']} style={styles.gradient}>
                                <View style={styles.tag}>
                                    <Text style={styles.text}>{tag}</Text>
                                </View>
                            </LinearGradient>
                            )}
                            </ScrollView>
                        </View>

                        <View style={[styles.row, {paddingTop: 15}]}>
                            <Text style={styles.headers}>{'Description'}</Text>
                        </View>  

                        <View style={styles.row}>
                            <Text style={[styles.rowText, { paddingHorizontal: 0}]}>{data.description}</Text>
                        </View>

                        <View style={[styles.row, {paddingTop: 25}]}>
                            <Text style={styles.headers}>{'Host'}</Text>
                        </View>

                        <View style={[styles.row, {flex: 1}]}>
                            <Image
                                source={require('../../Images/image01.jpg')}
                                style={styles.image}/>
                        </View>
                    
                    </ScrollView>

                </View>

                <View style={[styles.footer]}>

                    <TouchableOpacity style={styles.shareButton}>
                        <Icon name='md-share-outline' size={32}/>
                    </TouchableOpacity>

                    <CustomButton
                        title='Save'
                        shouldHaveGradient={true}
                        titleFontSize={24}
                        style={{shadowColor: "#0072ff",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 3.84,
                                elevation: 5,
                                width: 150,
                                position: 'absolute',
                                right: 50,
                                bottom: 15
                                }}/>
                </View>

            </View>
        )
    }

}

export default EventDetailsContainer