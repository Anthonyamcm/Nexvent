import React from 'react';
import { View, SafeAreaView } from 'react-native';
import CustomButton from '../../Components/Button/Button';
import CustomHeader from '../../Components/Header/Header';
import TagsView from '../../Components/Tag/TagView';
import * as Profile from '../../Components/Profile/Profile'
import * as API from '../../Api/Api'
import styles from './Tags.style'

class TagsContainer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selected: [],
      isSaving: false
    }

  }

addOrRemove = (array, item) => {
    const exists = array.includes(item)
  if (exists) {
      return array.filter((c) => { return c !== item })
    } else {
      const result = array
      result.push(item)
      return result
    }
  }

onPress = (tag) => {
    let {selected} = this.state

    selected = this.addOrRemove(selected, tag)

    this.setState({
      selected
      })
    }

  updateUserTags = async () => {

    const userDetails = Profile.userDetails;

    this.setState({
      isSaving: true
    })

      try {
        const data = {
          tags: this.state.selected
        }
        const result = await API.USER().updateTags(userDetails.id, data)

        if(result.code === 200){
          this.setState({
            isSaving: false
          })
          this.props.navigation.goBack(null)
        } else {
          // nothing yet
        }

      } catch (error) {}

  }

  getUserTags = async () => {

    const userDetails = Profile.userDetails;

    try{

      const result = await API.USER().getTags(userDetails.id)
      if(result.code === 200){
        this.setState({
          selected: result.user.tags
        })
      }else{
        // nothing yet
      }
    } catch (error) {}

  }

  componentDidMount(){
    this.getUserTags()
  }

  

  render() {

    const {
          selected,
          isSaving
        } = this.state

    const tags = ['Swift', 'Kotlin', 'Really long tag', 'Haskell', 'Java']

    return (
      <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>

        <CustomHeader
            title={'Tags'}
            onBackPressed={() => this.props.navigation.goBack(null)} />


        <View style={styles.container}>
          
          <TagsView
            all={tags}
            selected={selected}
            isExclusive={false}
            onPress = {this.onPress}/>

          <View style={styles.bottom}>

              <CustomButton
                  title='Apply'
                  shouldHaveGradient={true}
                  titleFontSize={24}
                  isLoading={isSaving}
                  onPress={() => this.updateUserTags()}
                  style={{shadowColor: "#0072ff",
                          shadowOffset: {
                          width: 0,
                          height: 2,
                          },
                          shadowOpacity: 0.5,
                          shadowRadius: 3.84,
                          elevation: 5}}
                          />

          </View>
      </View>
    </SafeAreaView>
    );
  }
};


export default TagsContainer;