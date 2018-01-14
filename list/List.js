import React from 'react';
import {Button, FlatList, Text, TextInput, TouchableOpacity, View, AsyncStorage, StyleSheet} from 'react-native';
import {ListItem} from "./ListItem";
import {GameForm} from "../model/GameForm";
import firebase from 'firebase'
import {Spinner} from "../utils/Spinner";

export class List extends React.Component
{
    constructor(props)
    {
        super(props);

        this.handleClickedItem = this.handleClickedItem.bind(this);
        this.handleChangedGame = this.handleChangedGame.bind(this);

        this.currentUser = firebase.auth().currentUser.uid;
        this.viewOnly = true;

        this.state = {listOfGames: [], loading: true};

    }

    componentWillMount()
    {
        firebase.database().ref(`/users/${this.currentUser}/viewOnly`)
            .on('value', (snapshot) => {
                this.viewOnly = JSON.stringify(snapshot) == "true" ? true : false;
                this.setState({loading: false});
            });
    }
    
    componentDidMount()
    {
        console.log("Current user: " + this.currentUser);
        this.getItems();
    }

    getItems()
    {
        firebase.database().ref(`/users/${this.currentUser}/games`).on('value', (snapshot) => {
            let listOfGames = [];

            snapshot.forEach((child) => {
                listOfGames.push({
                    key: child.key,
                    game: child.val()
                });
            });
            this.setState({listOfGames});
        });
    }


    async handleAddGame(game)
    {
        await firebase.database().ref(`/users/${this.currentUser}`).child("games").push(game);
    }


    async handleChangedGame(key, game)
    {
        await firebase.database().ref(`/users/${this.currentUser}/games/${key}`).set(game);
    }


    async handleClickedDelete(key)
    {
        await firebase.database().ref(`/users/${this.currentUser}/games/${key}`).remove();
    }

    handleClickedItem(key, game)
    {
        // pass the callback func!
        this.props.navigator('Details', {gameKey: key, game: game, list: this.state.listOfGames, updateGame: this.handleChangedGame});
    }

    render()
    {

        if (this.state.loading) {
            return <Spinner size='large' />;
        }

        return (

            <View style={styles.container}>

                <View style={{flex: 1}}>

                    <GameForm addGame={this.handleAddGame.bind(this)} viewOnly={this.viewOnly}/>
                </View>

                <View style={{flex: 1}}>
                    <FlatList
                        data={this.state.listOfGames}
                        extraData={this.state}
                        renderItem={ ({item}) => <ListItem gameKey={item.key} game={item.game} clickedItem={this.handleClickedItem}
                                                           viewOnly={this.viewOnly} clickedDelete={this.handleClickedDelete.bind(this)}/> }
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