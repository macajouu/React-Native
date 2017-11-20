import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {GameEdit} from "../model/GameEdit";

export class DetailScreen extends React.Component
{
    constructor(props)
    {
        super(props);

        this.navParams = this.props.navigation.state.params;
    }

    render()
    {

        return(

            <GameEdit updateGame={this.navParams.updateGame} index={this.navParams.index} name={this.navParams.game.name} releaseYear={this.navParams.game.releaseYear} producer={this.navParams.game.producer} />
        );
    }
}

