import React from 'react';
import {Button, FlatList, Text, TextInput, TouchableOpacity, View, AsyncStorage, StyleSheet} from 'react-native';
import {ListItem} from "./ListItem";
import {GameForm} from "../model/GameForm";

export class List extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClickedItem = this.handleClickedItem.bind(this);
        this.handleChangedObject = this.handleChangedObject.bind(this);


        // this.state = {listOfGames: [
        //     {key: 0, game:  {name: 'hoi4', releaseYear: '2016', producer: 'paradox'}},
        //     {key: 1, game:  {name: 'eu4', releaseYear: '2015', producer: 'paradox'}},
        //     {key: 2, game:  {name: 'AC - Origins', releaseYear: '2017', producer: 'Ubisoft'}},
        //     {key: 3, game:  {name: 'Fifa17', releaseYear: '2016', producer: 'EA Sports'}}
        //     ]};


        this.state = {listOfGames: []};

    }

    componentDidMount()
    {
        this.updateList();
    }

    async updateList()
    {
        try
        {
            let response = await AsyncStorage.getItem("listOfGames");

            let listOfGames = await JSON.parse(response) || [];

            //console.log("local: ", listOfGames);

            this.setState({listOfGames});

        }
        catch(error)
        {
            console.log(error);
        }
    }

    _getArrayMax(array)
    {
        let max = -1;

        for(let game of array)
        {
            if(game.key > max)
            {
                max = game.key;
            }
        }

        return max;
    }

    async handleAddGame(game)
    {


        let indexedGame = {key: this._getArrayMax(this.state.listOfGames) + 1, game: game};

        let listOfGames = [...this.state.listOfGames, indexedGame];

        //console.log("In ADD, game: ", JSON.stringify(indexedGame));

        // console.log("state: ", this.state.listOfGames)
        //console.log("local: ", listOfGames);

        await AsyncStorage.setItem("listOfGames", JSON.stringify(listOfGames));

        this.setState({listOfGames});
        //this.updateList();
    }


    async handleChangedObject(index, newObject)
    {
        let listOfGames = this.state.listOfGames;
        listOfGames[index].game = newObject.game;

        await AsyncStorage.setItem("listOfGames", JSON.stringify(listOfGames));

        this.setState({listOfGames});
        //this.updateList();

        //console.log("NewObject: " +  this.state.listOfGames[index].game.name);
    }


    async handleClickedDelete(index)
    {
        //console.log("Delete: ", index);

        let listOfGames = this.state.listOfGames;

        listOfGames.splice(index, 1);

        await AsyncStorage.setItem("listOfGames", JSON.stringify(listOfGames));

        //this.updateList();
        this.setState({listOfGames});
    }

    handleClickedItem(index)
    {
        let game = this.state.listOfGames[index].game;

        // pass the callback func!
        this.props.navigator('Details', {index: index, game: game, list: this.state.listOfGames, updateGame: this.handleChangedObject});
    }

    render()
    {
        return (

            <View style={styles.container}>

                <View style={{flex: 1}}>

                    <GameForm addGame={this.handleAddGame.bind(this)}/>
                </View>


                <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.listOfGames}
                        extraData={this.state}
                        renderItem={ ({item, index}) => <ListItem keyy={item.key} gameKey={index} game={item.game} clickedItem={this.handleClickedItem}
                                                                  clickedDelete={this.handleClickedDelete.bind(this)}/> }
                    />
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});
