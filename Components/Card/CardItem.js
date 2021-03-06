import React from 'react';
import styles from './Card.style';
import { Text, View, ImageBackground, Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
            height: DIMENSION_HEIGHT - 240,
            }}
            imageStyle={{ borderRadius: 32}}  
        />
      </SharedElement>

      <View style={{flex:1}}>

      </View>
          
        <View style={styles.footer}>

          <Text style={styles.title}>{name}</Text>
           
          <View style={styles.locationContainer}>
            <Text style={styles.Location}>{location}</Text>
          </View>

          <View style={styles.tagContainer}>
            {tags.slice(0, 4).map((tag, index) => 
              <Image resizeMode='contain' source={require('../../Images/profile.webp')} style={styles.image}/>
            )}
            <Text style={{fontFamily: 'GTEestiDisplay-Medium', fontSize: 12, paddingHorizontal: 30, color: 'white'}}>{ 'Sophie, Brandon + ' + tags.length + " More"}</Text>
          </View>

        </View>
    
    </View>
  );
};

export default CardItem;