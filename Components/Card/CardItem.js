import React from 'react';
import styles from './Card.style';
import { Text, View, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont();

const CardItem = ({
  location,
  image,
  name,
  tags
}) => {
  return (
    <View style={styles.Card}>
      {/* IMAGE */}
      <ImageBackground 
          source={image} 
          style={{ flex: 1,
          width: null,
          height: null,
          }}
          imageStyle={{ borderRadius: 32}}  
      >
          
        <View style={styles.CardFooter}>
            {/* NAME */}
          <Text style={styles.Title}>{name}</Text>
           
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
      </ImageBackground>
    </View>
  );
};

export default CardItem;