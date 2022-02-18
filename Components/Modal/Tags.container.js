import React from 'react';
import { View, Text, ScrollView} from 'react-native';
import TagsView from '../Tag/TagView';
import CustomButton from '../Button/Button';
import styles from './Modal.style';

class TagsContainer extends React.Component{
   
    render(){

        const options = ["Festival", "Performance", "Drag", "Show", "Fair"]

        return(
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 50, borderRadius: 32 }}>

                <View style={styles.modalHeader}>
                    <Text style={styles.modalText}>{'Tags'}</Text>
                </View>

                <ScrollView style={{paddingVertical: 75}}>
                    <TagsView
                        all={options}
                        selected={this.props.tags}
                        isExclusive={false}
                        onPress={this.props.onPress}/>
                </ScrollView>

                <View style={styles.modalFooter}>
                    <CustomButton
                        title='Save'
                        shouldHaveGradient={true}
                        titleFontSize={24}
                        isLoading={this.props.isSaving}
                        onPress={this.props.save}
                        style={{shadowColor: "#0072ff",
                                shadowOffset: {
                                width: 0,
                                height: 2,
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 3.84,
                                elevation: 5,
                                position: 'absolute',
                                bottom: 15,
                                alignSelf: 'center'
                                }}/>
                </View>
            </View>
        )
    }
}

export default TagsContainer