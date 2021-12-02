import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import CustomButton from '../../Components/Button/Button';
import CustomHeader from '../../Components/Header/Header';
import TagsView from '../../Components/Tag/TagView';
import * as Profile from '../../Components/Profile/Profile'
import * as API from '../../Api/Api'

const tags = ['Swift', 'Kotlin', 'C#', 'Haskell', 'Java']


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

    return (
      <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
        <View style={styles.mainContainer}>
          
          <CustomHeader
                  title={'Tags'}
                  onBackPressed={() => this.props.navigation.goBack(null)} />

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

const styles = StyleSheet.create({
  mainContainer: {
      marginVertical: 0,
      marginHorizontal: 0,
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
    fontSize: 16,
    fontFamily: 'GTEestiDisplay-Medium'
  },
  tagGroup: {
    marginTop: 15,
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
    paddingVertical: 12,
    borderRadius: 18
  },
  textStyle: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottom:{
    bottom:0,
    paddingHorizontal: 30
},
mainContainer: {
  backgroundColor: 'white',
  flex: 1,
},
});

export default TagsContainer;