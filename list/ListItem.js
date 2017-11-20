import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

export class ListItem extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress()
    {
        this.props.clickedItem(this.props.gameKey);
    }

    render()
    {
        //console.log("In List Item, name: " + this.props.game.name);

        return(

            <TouchableOpacity
                onPress={this.handlePress}
                style={{backgroundColor: 'darkgoldenrod'}}
            >
                <Text>Name: {this.props.game.name}, Release year: {this.props.game.releaseYear}, Producer: {this.props.game.producer}</Text>
            </TouchableOpacity>
        );
    }
}
