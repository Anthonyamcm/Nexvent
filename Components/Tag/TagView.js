import React from 'react'
import { View, StyleSheet } from 'react-native'
import Tag from './Tag'

class TagsView extends React.Component {
    
    makeTags = () => {
            return this.props.all.map((tag, i) => {
              const on = this.props.selected.includes(tag)
              const backgroundColor = on ? '#0072ff' : '#eee' 
              const textColor = on ? 'white'  : '#666' 
        return (
                <Tag
                  backgroundColor={backgroundColor}
                  textColor={textColor}
                  onPress={() => {
                    this.props.onPress(tag)
                  }}
                  key={i}
                  title={tag} />
              )
            })
          }
    
    render() {
        return (
          <View style={styles.container}>
            {this.makeTags()}
          </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    }
  })

export default TagsView