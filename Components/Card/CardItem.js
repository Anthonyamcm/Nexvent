import React from 'react';
import styles from './Card.style';
import { Text, View, ImageBackground, Dimensions } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const CardItem = ({
  location,
  image,
  name,
  tags,
}) => {
  return (
    <View style={styles.card}>
    
      <SharedElement id={`item.photo`}>
        <ImageBackground 
            source={image} 
            style={{ flex: 1,
            width: null,
            height: DIMENSION_HEIGHT - 220,
            }}
            imageStyle={{ borderRadius: 32}}  
        />
      </SharedElement>
          
        <View style={styles.footer}>
           
          <Text style={styles.title}>{name}</Text>
           
          <View style={styles.locationContainer}>
            <Icon name="md-location-outline" size={32} color={'white'}/>
            <Text style={styles.Location}>{location}</Text>
          </View>

          <View style={styles.tagContainer}>
            {tags.map((tag, index) => 
            <Text key={index} style={styles.tag}>{tag.label}</Text>
            )}
          </View>

        </View>
    
    </View>
  );
};

export default CardItem;