import React from 'react';
import styles from './Tags.style';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { openBottomSheet, updateState, closeBottomSheet } from "../../Navigation/Root";
import TagsModal from '../../Screens/Modal/Tags.container';

const onClickButton = () => {
    updateState(TagsModal, 395);
    openBottomSheet();
  }

const Tags = () => {
  return (
    <TouchableOpacity style={styles.tags} onPress={() => onClickButton()}>
      <Text style={styles.tagsText}>
        <Icon name="md-pricetags-outline" size={24}/> Tags</Text>
    </TouchableOpacity>
  );
};

export default Tags;