import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

class Tag extends React.Component {

    render(){
        const styles = this.tagStyles()
        return(
            <TouchableOpacity style={styles.touchable} onPress={this.props.onPress}>
              {this.props.gradientOn ? (
              <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['#00c6ff','#0072ff']} style={styles.gradient}>
                <View style={styles.view}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
              </LinearGradient>
              ) : (
                <View style={styles.view}>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
              )}
                
            </TouchableOpacity>
        )
    }


    tagStyles() {
        return StyleSheet.create({
          view: {
            flexDirection: 'row',
            borderRadius: 23,
            backgroundColor: this.props.gradientOn ? '': '#eee',
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
          },
          gradient: {
            borderRadius: 23,
          }
        })
      }
}

export default Tag