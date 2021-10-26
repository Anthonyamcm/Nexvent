import React from "react";
import { SafeAreaView , View, Text} from "react-native";
import styles from './Tags.style'
import TagGroup, {Tag} from 'react-native-tag-group';
import CustomButton from "../../Components/Button/Button";

const tags = ['Music', 'Thearter', 'Ionic', 'Cordova', 'Weex', 'Taro', 'VasSonic', 'WeChat Mini Program'];

class TagsContainer extends React.Component {

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


    render(){
        return(
            <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
                <View style={styles.mainContainer}>
                    <View style={styles.top}>
                        <Text style={styles.title}>Find your friday feeling</Text>
                    </View>
                    <Text style={styles.subTitle}>By selecting your favourite tags you help us find events best suited to your taste</Text>
                    <View style={styles.customTags}>
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
                        title='Continue'
                        shouldHaveGradient={true}
                        titleFontSize={24}
                        style={{marginTop: 30, 
                                shadowColor: "#0072ff",
                                shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 3.84,
                            elevation: 5}}
                            onPress={() => this.props.navigation.navigate('Location')}/>
                </View>
            </SafeAreaView>
        )
    }
}

export default TagsContainer;