import React from 'react';
import {Text, TextInput, TouchableOpacity, View, Button, StyleSheet} from 'react-native';

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

    handleDelete()
    {
        this.props.clickedDelete(this.props.gameKey);
    }

    render()
    {

        return(
            <View style={styles.listItem}>
                <TouchableOpacity
                    onPress={this.handlePress}
                >
                    <Text>Name: {this.props.game.name}, Release year: {this.props.game.releaseYear}, Producer: {this.props.game.producer}</Text>
                </TouchableOpacity>

                <Button
                    title='Delete'
                    onPress={this.handleDelete.bind(this)}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        //alignItems: 'center',
        backgroundColor: 'darkgoldenrod',
        height: 70,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
});
