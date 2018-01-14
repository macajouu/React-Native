import React from 'react';
import {Button, FlatList, Text, TextInput, TouchableOpacity, View, AsyncStorage, StyleSheet} from 'react-native';
import {ListItem} from "./ListItem";
import {GameForm} from "../model/GameForm";
import firebase from 'firebase'

export class List extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClickedItem = this.handleClickedItem.bind(this);
        this.handleChangedGame = this.handleChangedGame.bind(this);

        this.state = {listOfGames: []};

    }

    componentDidMount()
    {
        this.getItems();
    }

    getItems()
    {
        firebase.database().ref(`/games`).on('value', (snapshot) => {
            let listOfGames = [];
            snapshot.forEach((child) => {
                listOfGames.push({
                    key: child.key,
                    game: child.val()
                });

                //console.log(child.val() + "\n");
            });
            this.setState({listOfGames});
        });
    }


    async handleAddGame(game)
    {
        await firebase.database().ref(`/games`).push(game);
    }


    async handleChangedGame(index, newObject)
    {
        await firebase.database().ref(`/games`).push(game);
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

    handleClickedItem(key)
    {
        let game = this.state.listOfGames[index].game;

        // pass the callback func!
        this.props.navigator('Details', {index: index, game: game, list: this.state.listOfGames, updateGame: this.handleChangedGame});
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
                        renderItem={ ({item, index}) => <ListItem gameKey={index} game={item.game} clickedItem={this.handleClickedItem}
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
