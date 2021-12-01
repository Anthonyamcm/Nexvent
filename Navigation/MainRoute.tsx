import React, { useState, useRef } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeContainer from '../Screens/Home/Home.container';
import HomeSettings from '../Screens/Home/Settings.container';
import Likes from '../Screens/Likes/Likes.container';
import { openBottomSheet, updateState, closeBottomSheet } from "./Root";

StatusBar.setBarStyle('dark-content');

const MainRoute = props => {
  const ref = useRef();
  const [type, setType] = useState<'down' | 'up'>('down');

  const onClickButton = () => {
      props.navigation.navigate('Account')
  }

  const _renderIcon = (routeName: string, selectTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'ios-home-outline';
        break;
      case 'Likes':
        icon = 'apps-outline';
        break;
    }

    return (
      <Ionicons name={icon} size={23} color={routeName === selectTab ? 'black' : 'gray'} />
    );
  };

  return (
    <View style={styles.container}>
      <CurvedBottomBar.Navigator
        ref={ref}
        type={type}
        height={60}
        circleWidth={55}
        bgColor="white"
        borderTopLeftRight={true}
        strokeWidth={2}
        swipeEnabled={false}
        initialRouteName="Home"
        renderCircle={({ selectTab, navigate }) => (
          <TouchableOpacity
              style={[type === 'down' ? styles.btnCircle : styles.btnCircleUp]} onPress={onClickButton}
          >
              <Ionicons name="md-person-outline" size={23} />
          </TouchableOpacity>
      )}
        tabBar={({ routeName, selectTab, navigate }) => {
          return (
            <TouchableOpacity
              onPress={() => navigate(routeName)}
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              {_renderIcon(routeName, selectTab)}
            </TouchableOpacity>
          );
        }}>
        <CurvedBottomBar.Screen
          name="Home"
          position="left"
          component={() => <HomeContainer/>}
        />
        <CurvedBottomBar.Screen
          name="Likes"
          component={() => <Likes/>}
          position="right"
        />
      </CurvedBottomBar.Navigator>
    </View>
  );




};

export default MainRoute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 28
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: '#48CEF6'
  },
  img: {
    width: 30,
    height: 30,
  }
});