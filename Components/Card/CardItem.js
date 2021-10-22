import React from 'react';
import styles from './Card.style';
import { Text, View, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

const CardItem = ({
  description,
  image,
  name
}) => {
  // Custom styling
  const fullWidth = Dimensions.get('window').width;
  const fullHeight = Dimensions.get('window').height;

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <ImageBackground 
          source={image} 
          style={{ flex: 1,
          width: null,
          height: null,
          }}
          imageStyle={{ borderRadius: 12}}  
      >
          
        <View style={styles.footerCardItem}>
            {/* NAME */}
          <Text style={styles.titleCardItem}>{name}</Text>
            {/* DESCRIPTION */}
            {description && (
          <Text style={styles.descriptionCardItem}>{description}</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default CardItem;