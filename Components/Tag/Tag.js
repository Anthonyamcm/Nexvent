import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native'

class Tag extends React.Component {

    render(){
        const styles = this.tagStyles()
        return(
            <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
                <View style={styles.view}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    tagStyles() {
        return StyleSheet.create({
          view: {
            flexDirection: 'row',
            borderRadius: 23,
            backgroundColor: this.props.backgroundColor,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 16,
            paddingRight: 16
          },
          touchable: {
            marginLeft: 4,
            marginRight: 4,
            marginBottom: 8
          },
          text: {
            fontSize: 18,
            textAlign: 'center',
            color: this.props.textColor,
            fontFamily: 'GTEestiDisplay-Medium'
          }
        })
      }
}

export default Tag