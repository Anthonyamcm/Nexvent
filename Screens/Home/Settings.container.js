import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../Components/Button/Button';
import { closeBottomSheet } from '../../Navigation/Root';
import CustomInput from '../../Components/Input/Input'
import TagGroup, {Tag} from 'react-native-tag-group';

const tags = ['Flutter', 'React Native', 'Ionic', 'Cordova', 'Weex', 'Taro', 'VasSonic', 'WeChat Mini Program'];


class HomeSettings extends React.Component {
  

  componentDidMount() {
    this.customTagGroup.select(0);
  }

  onTagPress = (selected, selectedIndex) => {
    // For safety, check params before using them.
    if (!this.state.singleChoiceMode && Array.isArray(selected)) {
      this.console(`selected tags = [${selected.join(', ')}]`);
    } else {
      this.console(`selected tag (value, index) = (${selected}, ${selectedIndex})`);
    }
  }

  render() {
  return (
    <View style={styles.mainContainer}>
    
      <CustomInput
        hint='Enter location....'
        title='Area/Loction'
        style={{width: 350, marginTop: 10}}
        borderWidth={1}
        borderColor={'#D6DDDD'}/>
      <View style={styles.sideBySide}>
      <CustomInput
        hint='DD/MM/YYYY'
        title='Start Date'
        style={{width: 170}}
        borderWidth={1}
        borderColor={'#D6DDDD'}/>
        <CustomInput
        hint='DD/MM/YYYY'
        title='End Date'
        style={{width: 170, marginLeft: 10}}
        borderWidth={1}
        borderColor={'#D6DDDD'}/>
      </View>
      <View style={styles.customTags}>
        <Text style={styles.title}>{'Tags'}</Text>
        <TagGroup ref={ref => this.customTagGroup = ref}
                  style={styles.tagGroup}
                  source={tags}
                  tagStyle={styles.tagStyle}
                  activeTagStyle={{
                    backgroundColor: '#0072ff',
                  }}
                  textStyle={styles.textStyle}
                  activeTextStyle={{
                    color: 'white',
                  }}/>
      </View>
      <CustomButton
         title='Apply'
         shouldHaveGradient={true}
         titleFontSize={24}
         fontFamilt={'GTEestiDisplay-Medium'}
         style={{width: 350,paddingTop: 0, 
          shadowColor: "#0072ff",
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 5}}
         onPress={() => closeBottomSheet()}/>
    </View>
  );
        }
};

const styles = StyleSheet.create({
  mainContainer: {
      marginVertical: 20,
      marginHorizontal: 30,
      justifyContent: 'space-between',
      paddingBottom: 50,
  },
  content: {
    height: 200,
    width: 350,
    marginBottom: 10,
    borderColor: 'gray',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  top: {
		paddingBottom: 10,
		marginHorizontal: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
  sideBySide :{
    flexDirection: 'row',
    marginTop: 30
  },
  title: {
    marginHorizontal: 0,
    fontSize: 16,
    fontFamily: 'GTEestiDisplay-Medium'
  },
  tagGroup: {
    marginTop: 0,
    marginHorizontal: 0,
  },
  customTags: {
    marginVertical: 30,
  },
  tagStyle: {
    marginTop: 4,
    marginHorizontal: 0,
    backgroundColor: '#eee',
    borderWidth: 0,
    marginRight: 12,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  textStyle: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeSettings;