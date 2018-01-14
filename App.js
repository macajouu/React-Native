import React from 'react';
import {LoginScreen} from "./screens/LoginScreen";
import {MainScreen} from "./screens/MainScreen";
import {DetailScreen} from "./screens/DetailScreen";
import {StackNavigator} from "react-navigation";
import {StatusBar, View} from "react-native";
import firebase from 'firebase';

export default class App extends React.Component
{
    componentWillMount()
    {
        const config = {
            apiKey: "AIzaSyDsiaskBBcYt6swj9hwVV42qD65PGou3cw",
            authDomain: "firegames-31b1e.firebaseapp.com",
            databaseURL: "https://firegames-31b1e.firebaseio.com",
            projectId: "firegames-31b1e",
            storageBucket: "firegames-31b1e.appspot.com",
            messagingSenderId: "897362325353"
        };

        firebase.initializeApp(config);
    }

    render() {

        return (

                <SimpleStack style={{paddingTop: StatusBar.currentHeight}}></SimpleStack>
        );
    }
}

const SimpleStack = StackNavigator({
    Login: {
        screen: LoginScreen
    },
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
