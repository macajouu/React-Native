import React from 'react';
import {Button, FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ListItem} from "./ListItem";

export class List extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClickedItem = this.handleClickedItem.bind(this);
        this.handleChangedObject = this.handleChangedObject.bind(this);


        this.state = {array: [
                        {key: 'g0', game:  {name: 'hoi4', releaseYear: '2016', producer: 'paradox'}},
                        {key: 'g1', game:  {name: 'eu4', releaseYear: '2015', producer: 'paradox'}},
                        {key: 'g2', game:  {name: 'AC - Origins', releaseYear: '2017', producer: 'Ubisoft'}},
                        {key: 'g3', game:  {name: 'Fifa17', releaseYear: '2016', producer: 'EA Sports'}}
                        ]};

    }

    handleClickedItem(index)
    {
        let game = this.state.array[index].game;

        // pass the callback func!
        this.props.navigator('Details', {index: index, game: game, updateGame: this.handleChangedObject});
    }

    handleChangedObject(index, newObject)
    {
        let newArray = this.state.array;
        newArray[index].game = newObject.game;

        this.setState({array: newArray});

        //console.log("NewObject: " +  this.state.array[index].game.name);
    }

    render()
    {
        return (
            <FlatList
                data={this.state.array}
                extraData={this.state}
                renderItem={ ({item, index}) => <ListItem gameKey={index} game={item.game} clickedItem={this.handleClickedItem}/> }
            />
        );
    }
}
