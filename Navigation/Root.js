import React from "react";
import {View,StyleSheet, TouchableOpacity} from 'react-native';

import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import AuthRoute from "./AuthRoute";
import MainRoute from "./MainRoute";

import BottomSheet from 'reanimated-bottom-sheet';



const fall = new Animated.Value(1);

function updateState(RenderContent, snapPoint) {
    const bottomSheetWrapper = () => {
        return (
            <View style={styles.bottomSheetContainer}>
                <View style={styles.bottomSheetThumb} />
                <RenderContent />
            </View>
        );
    }

    this.setState({
        renderContent: bottomSheetWrapper,
        snapPoint: snapPoint
    })
}

function openBottomSheet() {
    this.setState({ isBottomSheetOpen: true });
    bottomSheet.current.snapTo(1);
}

function closeBottomSheet() {
    if (!this.state.shouldAllowClose) return;

    this.setState({ isBottomSheetOpen: false });
    bottomSheet.current.snapTo(0);
}

function toggleBottomSheetClosable(shouldAllowClose) {
    this.setState({
        shouldAllowClose: shouldAllowClose
    });

    if (shouldAllowClose) {
        this.setState({ isBottomSheetOpen: false });
        bottomSheet.current.snapTo(0);
    }
}

class Root extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            renderContent: undefined,
            isBottomSheetOpen: false,
            snapPoint: 300,
            shouldAllowClose: true
        }
        updateState = updateState.bind(this);

        openBottomSheet = openBottomSheet.bind(this);
        closeBottomSheet = closeBottomSheet.bind(this)
        toggleBottomSheetClosable = toggleBottomSheetClosable.bind(this);
    }
    
    render() {

        const Stack = createStackNavigator();

        bottomSheet = React.createRef();

        return(
            <View style={{flex: 1}}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName='AuthRoute' screenOptions={{headerShown: false}}>
                        <Stack.Screen name='AuthRoute' component={AuthRoute}/>
                        <Stack.Screen name='MainRoute' component={MainRoute} options={{ gestureEnabled: false}}/>
                    </Stack.Navigator>
                </NavigationContainer>

                {this.renderShadow()}

                <BottomSheet
                    ref={bottomSheet}
                    callbackNode={fall}
                    snapPoints={[0, this.state.snapPoint]}
                    enabledBottomInitialAnimation={true}
                    borderRadius={30}
                    renderContent={this.state.renderContent}
                    enabledInnerScrolling={true} />

            </View>
        )
    }

    renderShadow = () => {
        const animatedShadowOpacity = Animated.interpolateNode(fall, {
            inputRange: [0, 1],
            outputRange: [0.30, 0],
        })

        return (
            <Animated.View
                pointerEvents={this.state.isBottomSheetOpen ? 'auto' : 'none'}
                style={[
                    styles.shadowContainer,
                    { opacity: animatedShadowOpacity },
                ]}
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={() => closeBottomSheet()} />
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    // Shadow
    shadowContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
    },

    bottomSheetContainer: {
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 30,
        alignItems: 'center'
    },

    bottomSheetThumb: {
        height: 4,
        width: 35,
        borderRadius: 10,
        backgroundColor: '#D2D2D6',
        marginTop: 15
    }
});

export{
    Root,
    openBottomSheet,
    closeBottomSheet,
    updateState,
    toggleBottomSheetClosable,
}