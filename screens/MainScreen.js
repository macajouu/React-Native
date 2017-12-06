import React from 'react';
import {View} from 'react-native';
import {List} from "../list/List";
import {StatusBar} from "react-native"

export class MainScreen extends React.Component
{
    static navigationOptions = {
        title: 'Home',
        headerStyle: {paddingTop: StatusBar.currentHeight}
    }

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(

            <List navigator={this.props.navigation.navigate}/>

        );
    }
}

