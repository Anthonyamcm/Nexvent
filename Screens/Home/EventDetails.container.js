import React, { Component } from "react";
import { View, ImageBackground, Dimensions, Text, TouchableOpacity} from "react-native";
import { SharedElement } from 'react-navigation-shared-element';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './EventDetails.style'

const DIMENSION_HEIGHT = Dimensions.get("window").height;

class EventDetailsContainer extends Component {
    constructor(props) {
        super(props);

        const data = this.props.route.params.data;
    }

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

                    <Text style={styles.title}>{data.title}</Text>

                    <View style={styles.row}>
                        <Icon name="md-location-outline" size={22} color={'gray'}/>
                        <Text style={styles.rowText}>{data.location.name}</Text>
                    </View>

                    <View style={styles.row}>
                        <Icon name="md-calendar-sharp" size={22} color={'gray'}/>
                        <Text style={styles.rowText}>{Moment(data.dates[0]).format('d MMMM yyyy')}</Text>
                    </View> 

                    <View style={styles.row}>
                        <Icon name="md-time-outline" size={22} color={'gray'}/>
                        <Text style={styles.rowText}>{`${data.times[0]} - ${data.times[1]}`}</Text>
                    </View> 

                    <View style={styles.row}>
                        {data.tags.map((tag, index) => 
                            <Text key={index} style={styles.tag}>{tag.label}</Text>
                        )}
                    </View>

                    <View style={[styles.row, {flex: 1}]}>
                        <Text style={styles.rowText}>{data.description}</Text>
                    </View>  

                </View>

            </View>
        )
    }

}

export default EventDetailsContainer