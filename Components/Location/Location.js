import React from 'react';
import styles from './Location.style';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import LocationModal from '../../Screens/Modal/Location.container';
import { openBottomSheet, updateState, closeBottomSheet } from "../../Navigation/Root";

const onClickButton = () => {
    updateState(LocationModal, 325);
    openBottomSheet();
  }

const Location = () => {
  return (
    <TouchableOpacity style={styles.location} onPress={() => onClickButton()}>
      <Text style={styles.locationText}>
        <Icon name="md-filter" size={24}/> Filters</Text>
    </TouchableOpacity>
  );
};

export default Location;