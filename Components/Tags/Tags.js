import React , {Component}from 'react';
import styles from './Tags.style';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

class Tags extends Component {
  render() {
  return (
    <TouchableOpacity style={styles.tags} onPress={() => {this.props.navigation.navigate('Tags')}}>
      <Text style={styles.tagsText}>
        <Icon name="md-pricetags-outline" size={24}/> Tags</Text>
    </TouchableOpacity>
    );
  }
};

export default Tags;