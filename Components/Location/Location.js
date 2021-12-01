import React from 'react';
import styles from './Location.style';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'



const Location = () => {
  return (
    <TouchableOpacity style={styles.location}>
      <Text style={styles.locationText}>
        <Icon name="md-filter" size={24}/> Filters</Text>
    </TouchableOpacity>
  );
};

export default Location;