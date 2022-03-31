import React from 'react';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedContainer from '../Screens/Feed/Feed.container';
import AccountContainer from '../Screens/Account/Account.container';
import LikesContainer from '../Screens/Likes/Likes.container'
import * as appColors from '../Components/colors/appColor'

const MainRoute = () => {

  const Tabs = AnimatedTabBarNavigator();

  return(
      <Tabs.Navigator
      initialRouteName='Discover'
      tabBarOptions={{
        activeBackgroundColor: appColors.grey2,
        activeTintColor: appColors.grey4,
        inactiveTintColor: "#222222",
        
      }}
      appearance={{
        shadow: false,
        floating: true,
        dotSize: 'small',
        tabBarBackground: appColors.grey1
      }}
    >
        <Tabs.Screen
          name="Account"
          component={AccountContainer}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                    name="md-person-outline"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
                    focused={focused}
                    color={color}
                />
            )
          }}
        />
        <Tabs.Screen
          name="Discover"
          component={FeedContainer}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                    name="md-map-outline"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
                    focused={focused}
                    color={color}
                />
            )
          }}
        />
        <Tabs.Screen
          name="Likes"
          component={LikesContainer}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                    name="md-heart-outline"
                    size={size ? size : 24}
                    color={focused ? color : "#222222"}
                    focused={focused}
                    color={color}
                />
            )
          }}
        />
    </Tabs.Navigator>
  )

}

export default MainRoute