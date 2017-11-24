import React from 'react';
import {MainScreen} from "./screens/MainScreen";
import {DetailScreen} from "./screens/DetailScreen";
import {StackNavigator} from "react-navigation";
import {StatusBar, View} from "react-native";

export default class App extends React.Component {
    render() {

        return (

            //<View >
                <SimpleStack style={{paddingTop: StatusBar.currentHeight}}></SimpleStack>
            //</View>
        );
    }
}

const SimpleStack = StackNavigator({
    Main: {
        screen: MainScreen
    },
    Details: {
        screen: DetailScreen,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.game.name.toUpperCase()}`,
        }),
    },
});
